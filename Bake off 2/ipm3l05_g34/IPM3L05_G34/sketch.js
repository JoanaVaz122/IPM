// Bakeoff #2 -- Seleção em Interfaces Densas
// IPM 2022-23, Período 3
// Entrega: até dia 31 de Março às 23h59 através do Fenix
// Bake-off: durante os laboratórios da semana de 10 de Abril

// p5.js reference: https://p5js.org/reference/

// mapping by starting letter
const indexs = [
  [36, 56, 74, 66, 75, 42, 68, 41, 49, 14],
  [46, 33, 19, 26, 80, 37, 72, 65, 1, 29],
  [54, 34, 28, 21, 52, 58, 79],//Bas
  
  [63, 2, 43, 11, 67, 12, 40, 57, 30, 77, 3], //Bes
  
  [71, 73, 48, 70, 62, 22, 78, 13, 32], // Bi
  
  [38, 25, 53,   55,   69,   50, 4, 15, 5], // bh, bL, Bn, Bo
  
    [31, 44, 16, 64, 61,    76, 20, 51,    60, 6, 17,    27,    7], //BRA, BRE, BRI, BRN, BRU

  [35, 10, 39, 8, 9, 59, 45, 23, 18, 47,      24], // Bu, By
  
]


// Database (CHANGE THESE!)
const GROUP_NUMBER        = 34;      // Add your group number here as an integer (e.g., 2, 3)
const RECORD_TO_FIREBASE  = true;  // Set to 'true' to record user results to Firebase

// Pixel density and setup variables (DO NOT CHANGE!)
let PPI, PPCM;
const NUM_OF_TRIALS       = 12;      // The numbers of trials (i.e., target selections) to be completed
let continue_button;
let legendas;                       // The item list from the "legendas" CSV

// Metrics (DO NOT CHANGE!)
let testStartTime, testEndTime;     // time between the start and end of one attempt (8 trials)
let hits 			      = 0;      // number of successful selections
let misses 			      = 0;      // number of missed selections (used to calculate accuracy)
let database;                       // Firebase DB  

// Study control parameters (DO NOT CHANGE!)
let draw_targets          = false;  // used to control what to show in draw()
let trials;                         // contains the order of targets that activate in the test
let current_trial         = 0;      // the current trial number (indexes into trials array above)
let attempt               = 0;      // users complete each test twice to account for practice (attemps 0 and 1)

// Target list and layout variables
let targets               = [];
const GRID_ROWS           = 8;      // We divide our 80 targets in a 8x10 grid
const GRID_COLUMNS        = 10;     // We divide our 80 targets in a 8x10 grid

// Ensures important data is loaded before the program starts
function preload()
{
  legendas = loadTable('legendas.csv', 'csv', 'header');
}


function startWarning() {
  textFont("Arial", 30);
  textStyle(BOLD);
  fill(color(255, 255, 255));
  textAlign(CENTER);
  text("Como jogar?", width / 2, 185);

  textFont("Arial", 23)
  fill(color(255, 0, 0));
  text("LEIAM COM ATENÇÃO!", 350, 225)
  
  textStyle(NORMAL);
  textFont("Arial", 14);
  fill(color(255, 255, 255));
  text(" 1º : Os alvos estão dispostos alfabeticamente.", 350, 290);

  text("2º : Os Ba's, Be's, etc, estão subdivididos por cores.", 350, 310);
  
  text("3º : Dentro de cada alvo, estão as primeiras letras da palavra.", 350, 330);
  text("--------------------------------------------------------------------------------------------------------------------------", 350, 360);
  
  text("Nota: Não é necessário começar assim que se clica em \"START\".\nAnalisa primeiro a interface para ser mais fácil realizar o jogo. \nO tempo só começa a contar assim que clicares em um dos alvos com o nome de uma cidade. \nBoa sorte!", 350, 400);
}




// Runs once at the start
function setup()
{
  createCanvas(700, 500);    // window size in px before we go into fullScreen()
  frameRate(60);             // frame rate (DO NOT CHANGE!)
  
  randomizeTrials();         // randomize the trial order at the start of execution
  drawUserIDScreen();        // draws the user start-up screen (student ID and display size)
  startWarning();
}

// Runs every frame and redraws the screen
function draw()
{
  if (draw_targets && attempt < 2)
  {     
    // The user is interacting with the 6x3 target grid
    background(color(0,0,0));        // sets background to black
    
    // Print trial count at the top left-corner of the canvas
    textFont("Arial", 16);
    fill(color(255,255,255));
    textAlign(LEFT);
    text("Trial " + (current_trial + 1) + " of " + trials.length, 50, 20);
        
    // Draw all targets
	for (var i = 0; i < legendas.getRowCount(); i++) targets[i].draw();
    
     // Draw the target label to be selected in the current trial
fill(color(0,0,0));
rect(0, height - 40, width, 40);      // draws a black rectangle behind the trial label for optimal contrast
 
textFont("Arial", 20); 
fill(color(255,255,255)); 
textAlign(CENTER); 
text(legendas.getString(trials[current_trial],1), width/2, height - 20);
  }
}

// Print and save results at the end of 54 trials
function printAndSavePerformance()
{
  // DO NOT CHANGE THESE! 
  let accuracy			= parseFloat(hits * 100) / parseFloat(hits + misses);
  let test_time         = (testEndTime - testStartTime) / 1000;
  let time_per_target   = nf((test_time) / parseFloat(hits + misses), 0, 3);
  let penalty           = constrain((((parseFloat(95) - (parseFloat(hits * 100) / parseFloat(hits + misses))) * 0.2)), 0, 100);
  let target_w_penalty	= nf(((test_time) / parseFloat(hits + misses) + penalty), 0, 3);
  let timestamp         = day() + "/" + month() + "/" + year() + "  " + hour() + ":" + minute() + ":" + second();
  
  textFont("Arial", 18);
  background(color(0,0,0));   // clears screen
  fill(color(255,255,255));   // set text fill color to white
  textAlign(LEFT);
  text(timestamp, 10, 20);    // display time on screen (top-left corner)
  
  textAlign(CENTER);
  text("Attempt " + (attempt + 1) + " out of 2 completed!", width/2, 60); 
  text("Hits: " + hits, width/2, 100);
  text("Misses: " + misses, width/2, 120);
  text("Accuracy: " + accuracy + "%", width/2, 140);
  text("Total time taken: " + test_time + "s", width/2, 160);
  text("Average time per target: " + time_per_target + "s", width/2, 180);
  text("Average time for each target (+ penalty): " + target_w_penalty + "s", width/2, 220);

  // Saves results (DO NOT CHANGE!)
  let attempt_data = 
  {
        project_from:       GROUP_NUMBER,
        assessed_by:        student_ID,
        test_completed_by:  timestamp,
        attempt:            attempt,
        hits:               hits,
        misses:             misses,
        accuracy:           accuracy,
        attempt_duration:   test_time,
        time_per_target:    time_per_target,
        target_w_penalty:   target_w_penalty,
  }
  
  // Send data to DB (DO NOT CHANGE!)
  if (RECORD_TO_FIREBASE)
  {
    // Access the Firebase DB
    if (attempt === 0)
    {
      firebase.initializeApp(firebaseConfig);
      database = firebase.database();
    }
    
    // Add user performance results
    let db_ref = database.ref('G' + GROUP_NUMBER);
    db_ref.push(attempt_data);
  }
}

// Mouse button was pressed - lets test to see if hit was in the correct target
function mousePressed() 
{
  // Only look for mouse releases during the actual test
  // (i.e., during target selections)
  if (draw_targets)
  {
    for (var i = 0; i < legendas.getRowCount(); i++)
    {
      // Check if the user clicked over one of the targets
      if (targets[i].clicked(mouseX, mouseY)) 
      {
        // Checks if it was the correct target
        if (targets[i].id === trials[current_trial] + 1) hits++;
        else misses++;
        
        current_trial++;              // Move on to the next trial/target
        break;
      }
    }
    
    // Check if the user has completed all trials
    if (current_trial === NUM_OF_TRIALS)
    {
      testEndTime = millis();
      draw_targets = false;          // Stop showing targets and the user performance results
      printAndSavePerformance();     // Print the user's results on-screen and send these to the DB
      attempt++;                      
      
      // If there's an attempt to go create a button to start this
      if (attempt < 2)
      {
        continue_button = createButton('START 2ND ATTEMPT');
        continue_button.mouseReleased(continueTest);
        continue_button.position(width/2 - continue_button.size().width/2, height/2 - continue_button.size().height/2);
      }
    }
    // Check if this was the first selection in an attempt
    else if (current_trial === 1) testStartTime = millis(); 
  }
}

// Evoked after the user starts its second (and last) attempt
function continueTest()
{
  // Re-randomize the trial order
  randomizeTrials();
  
  // Resets performance variables
  hits = 0;
  misses = 0;
  
  current_trial = 0;
  continue_button.remove();
  
  // Shows the targets again
  draw_targets = true; 
}

// Creates and positions the UI targets
function createTargets(target_size, horizontal_gap, vertical_gap)
{
  // Define the margins between targets by dividing the white space 
  // for the number of targets minus one
  

  indexs.forEach((linha, index) => {
    const rows = indexs.length //Numero de indexs = linhas
    const cols = linha.length //numero de colunas por row
    
   
    
    h_margin = (horizontal_gap / (GRID_COLUMNS + 50 -1)) - 5;
    v_margin = vertical_gap / (GRID_ROWS - 1);// default to 1 when value is zero
    
    
    // Set targets in a 8 x 10 grid
      for (var i = 0; i < cols; i++) {
        let target_x =(h_margin + target_size) * i + target_size/2; 

         // give it some margin from the left border
        let target_y = (v_margin + target_size) * index + target_size/2; 
        let legendas_index = indexs[index][i] - 1;
        let target_label = legendas.getString(legendas_index, 1);
        let target_id = legendas.getNum(legendas_index, 0); 
        
        let lettercolors= {
          
        "Bacolod": color(192, 157,15),
        "Badajoz": color(192, 157,15), 
        "Bafoussam": color(192, 157,15),
        "Bagé": color(220, 150,15),
        "Bago": color(220, 150,15),
        "Baguio": color(220, 150,15),
        "Baghdad": color(220, 150,15),
        "Bahawalpur": color(192, 157,15), 
        "Bahía Blanca": color(192, 157,15), 
        "Banjul": color(192, 157,15),
        "Baku": color(192, 157,15), 
        "Balikpapan": color(192, 157,15), 
        "Bamako": color(192, 157,15), 
        "Bandung": color(192, 157,15),  
        "Baoding": color(192, 157,15), 
        "Baotou": color(192, 157,15), 
        "Barakaldo": color(150, 157,15), 
        "Baranagar": color(150, 157,15), 
        "Barcelona": color(150, 157,15), 
        "Bari": color(150, 157,15), 
        "Baroda": color(150, 157,15),
        "Barquisimeto": color(150, 157,15), 
        "Barranquilla": color(150, 157,15), 
        "Baton Rouge": color(192, 157,15), 
        "Batumi": color(192, 157,15), 
        "Bayamo": color(192, 157,15), 
        "Bayreuth": color(192, 157,15), 
    
        "Béchar": color(255, 119, 0), 
        "Beijing": color(255, 119, 0), 
        "Beira": color(255, 119, 0), 
        "Beirut": color(255, 119, 0), 
        "Belém": color(255, 119, 0), 
        "Belgrade": color(255, 119, 0), 
        "Benevento": color(255, 119, 0), 
        "Benešov": color(255, 119, 0),
        "Benghazi": color(255, 119, 0),
        "Beppu": color(255, 119, 0), 
        "Berlin": color(255, 119, 0),
    
        "Bhilai": color(178, 34, 34), 
        "Bhopal": color(178, 34, 34), 
        "Bhubaneswar": color(178, 34, 34), 
    
        "Bial Podlaska": color(199, 21, 133), 
        "Białogard": color(199, 21, 133), 
        "Białystok": color(199, 21, 133),
        "Bikaner": color(199, 21, 133),
        "Bilaspur": color(199, 21, 133),
        "Bilbao": color(199, 21, 133),
        "Birendranagar": color(199, 21, 133),
        "Birmingham": color(199, 21, 133),
        "Bishkek": color(199, 21, 133), 
    
        "Bloemfontein": color(148, 0, 211),
    
        "Bne Brak": color(147, 112, 219),
    
        "Bochum": color(0, 71, 171),
        "Bogotá": color(0, 71, 171),
        "Bologna": color(0, 71, 171),
        "Boston": color(0, 71, 171), 
    
        "Bradford": color(0, 127, 255),
        "Braga": color(0, 127, 255), 
        "Bratislava": color(0, 127, 255), 
        "Braunschweig": color(0, 127, 255), 
        "Brașov": color(0, 127, 255),
    
        "Breda": color(32, 178, 170), 
        "Bremen": color(32, 178, 170), 
        "Brest": color(32, 178, 170),
    
        "Brindisi": color(154, 205, 50),
        "Brisbane": color(154, 205, 50),
        "Bristol": color(154, 205, 50), 
    
        "Brno": color(0, 100, 0), 
    
        "Brussels": color(128, 128, 0), 
    
        "Bucaramanga": color(109, 53, 26),
        "Bucharest": color(109, 53, 26),
        "București": color(109, 53, 26), 
        "Budapest": color(109, 53, 26), 
        "Buenos Aires":color(109, 53, 26), 
        "Burbank": color(109, 53, 26),
        "Burnaby": color(109, 53, 26),
        "Bursa": color(109, 53, 26), 
        "Busan": color(109, 53, 26), 
        "Butuan": color(109, 53, 26),
    
        "Bydgoszcz": color(205, 133, 63),
      }
      
      let target_color = lettercolors[target_label];  
      let target = new Target(target_x, target_y + 40, target_size, target_label, target_id, target_color);
        targets.push(target);
        
      }  
    }
  )
}

// Is invoked when the canvas is resized (e.g., when we go fullscreen)
function windowResized() 
{    
  if (fullscreen())
  {
    // DO NOT CHANGE THESE!
    resizeCanvas(windowWidth, windowHeight);
    let display        = new Display({ diagonal: display_size }, window.screen);
    PPI                = display.ppi;                      // calculates pixels per inch
    PPCM               = PPI / 2.54;                       // calculates pixels per cm

    // Make your decisions in 'cm', so that targets have the same size for all participants
    // Below we find out out white space we can have between 2 cm targets
    let screen_width   = display.width * 2.54;             // screen width
    let screen_height  = display.height * 2.54;            // screen height
    let target_size = 2;                                // sets the target size (will be converted to cm when passed to createTargets)
           
        
        let horizontal_gap = screen_width - target_size * GRID_COLUMNS;// empty space in cm across the x-axis (based on 10 targets per row)
        let vertical_gap   = screen_height - target_size * GRID_ROWS;  // empty space in cm across the y-axis (based on 8 targets per column)

        
        
        
        
    // Creates and positions the UI targets according to the white space defined above (in cm!)
    // 80 represent some margins around the display (e.g., for text)
    createTargets(target_size * PPCM, horizontal_gap * PPCM - 80, vertical_gap * PPCM - 80);

    // Starts drawing targets immediately after we go fullscreen
    draw_targets = true;
    }
  }