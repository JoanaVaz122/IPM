// Target class (position and width)
class Target {
  constructor(x, y, w, l, id, color)
    {
      this.x      = x;
      this.y      = y;
      this.width  = w;
      this.label  = l;
      this.id     = id;
      this.color     = color;
      
       //Primeira linha dos Bas
        if (this.id==36 || this.id==56 || this.id==74 || this.id==66 || this.id==68 || this.id == 75 || this.id == 42 || this.id == 41 || this.id == 49 || this.id == 14) {
          this.x=x+windowWidth/40+windowWidth/8.5
        }
      
      //Segunda linha dos Bas
        if (this.id==46 || this.id==33 || this.id==19 || this.id==26 || this.id==80 || this.id == 37 || this.id == 72 || this.id == 65 || this.id == 1 || this.id == 29) {
          this.x=x+windowWidth/40+windowWidth/8.5
        }
      
      //Terceira linha dos Bas
        if (this.id==54 || this.id==34 || this.id==28 || this.id==21 || this.id==52 || this.id == 58 || this.id == 79) {
          this.x=x+windowWidth/40+windowWidth/4.5
        }
      
      
      
      //linha dos Bes
        if (this.id==63 || this.id==2 || this.id==43 || this.id==11 || this.id==67 || this.id == 12 || this.id == 40 || this.id == 57 || this.id == 30 || this.id == 77 || this.id == 3) {
          this.x=x+windowWidth/40+windowWidth/10.5
        }
      
      
        // linha dos Bis
        if (this.id==71 || this.id == 73 || this.id == 48 || this.id == 70 || this.id == 62 || this.id == 22 || this.id == 78 || this.id == 13 || this.id == 32 ) {
          this.x=x+windowWidth/40+windowWidth/5.7
        }
      
      
      
      // linha dos Bhs, BLs, Bns e Bos
        if (this.id==38 || this.id== 25 || this.id== 53 ) {
          this.x=x+windowWidth/40+windowWidth/14.0
        }
        if (this.id==55) {
            this.x=x+windowWidth/40+windowWidth/9.0
          }
        if (this.id==69 ) {
            this.x=x+windowWidth/40+windowWidth/7.5
          }
        if (this.id==50 || this.id== 4 || this.id== 15 ||this.id == 5 ) {
            this.x=x+windowWidth/40+windowWidth/5.5
          }
      
      
  
      
      
       // linha dos Bras, Bres, Bris, Brns, Brus
        if (this.id== 31 || this.id == 44 || this.id == 16 || this.id == 64 || this.id == 61) {
          this.x=x+windowWidth/40+windowWidth/22.0
        }
      
      
        if (this.id== 76 || this.id == 20 || this.id == 51 ) {
          this.x=x+windowWidth/40+windowWidth/16.5
        }
      
        if (this.id== 60 || this.id == 6 || this.id == 17 ) {
          this.x=x+windowWidth/40+windowWidth/14.5
        }
      
        if (this.id== 27 || this.id == 7) {
          this.x=x+windowWidth/40+windowWidth/12.5
        }
       
      
        //Bus e Bys
        if (this.id==35 || this.id == 10 || this.id == 39 || this.id == 8 || this.id == 9 || this.id == 59 || this.id == 45 || this.id == 23 || this.id == 18 || this.id == 47 ) {
          this.x=x+windowWidth/40+windowWidth/10.0
        }
      
        if (this.id== 24) {
          this.x=x+windowWidth/40+windowWidth/9
        }  
      
      
    }
      
      
    // Checks if a mouse click took place
    // within the target
    clicked(mouse_x, mouse_y)
    {
      return dist(this.x, this.y, mouse_x, mouse_y) < this.width / 2;
    }
         
        
  
    // Draws the target (i.e., a square)
    // and its label
    draw() {
      fill(this.color);
      rectMode(CENTER); // Set rectangle mode to center
      let cornerRadius = 0; // Define o raio dos cantos
      rect(this.x, this.y - 20, this.width, this.width, cornerRadius)
      
      // Draw label
      textFont("Arial", 15);
      fill(color(255, 255, 255));
      textAlign(CENTER);
      
      let words=this.label.split(" ");
      if (words.length==1) {
        text(this.label, this.x, this.y);
      }
      if (words.length==2) {
          text(words[0], this.x, this.y);
          text(words[1], this.x, this.y+15);
    }
  
  
      // Draw target label based on ID
      let targetLabel = '';
      switch (this.id) {
        case 36:
          targetLabel = "Bac";
          break;
        case 56:
          targetLabel = "Bad";
          break;
        case 74:
          targetLabel = "Bafou";
          break;
        case 66:
        case 75:
        case 42:
          targetLabel = "Bag";   
          break;
        case 68:
          targetLabel = "Bagh";
          break;
        case 41:
          targetLabel = "Bahaw";
          break;
        case 49:
          targetLabel = "Bah B";
          break;
        case 26:
          targetLabel = "Banj";
          break;
        case 14:
          targetLabel = "Bak";
          break;
        case 46:
          targetLabel = "Balik";
          break;
        case 33:
          targetLabel = "Bam";
          break;
        case 19:
          targetLabel = "Band";
          break;
        case 80:
        case 37:
          targetLabel = "Bao";
          break;
        case 72:
          targetLabel = "Barak";
          break;
        case 65:
          targetLabel = "Baran";
          break;
        case 1:
          targetLabel = "Barc";
          break;
        case 29:
        case 54:
          targetLabel = "Bar";
          break;
        case 34:
          targetLabel = "Barq";
          break;
        case 28:
          targetLabel = "Barr";
          break;
        case 21:
          targetLabel = "Bat R";
          break;
        case 52:
          targetLabel = "Bat";
          break;
        case 58:
        case 79:
          targetLabel = "Bay";
          break;
        case 63:
        case 2:
        case 43:
        case 11:
        case 67:
        case 12:
        case 40:
        case 57:
        case 30:
        case 77:
        case 3:
          targetLabel = "Be";
          break;
        case 38:
        case 25:
        case 53:
          targetLabel = "Bh";
          break;
        case 71:
        case 73:
        case 48:
        case 70:
        case 62:
        case 22:
        case 78:
        case 13:
        case 32:
          targetLabel = "Bi";
          break;
        case 55:
          targetLabel = "BL";
          break;
        case 50:
        case 4:
        case 15:
        case 5:
          targetLabel = "Bo";
          break;
        case 31:
        case 44:
        case 16:
        case 64:
        case 61:
          targetLabel = "Bra";
          break;
        case 76:
        case 20:
        case 51:
          targetLabel = "Bre";
          break;
        case 60:
        case 6:
        case 17:
          targetLabel = "Bri";
          break;
        case 27:
          targetLabel = "Brn";
          break;
        case 7:
          targetLabel = "Bru";
          break;
        case 35:
        case 10:
        case 39:
        case 8:
        case 59:
        case 45:
        case 23:
        case 18:
        case 47:
        case 9:
          targetLabel = "Bu";
          break;
        case 24:
          targetLabel = "By";
          break;
        case 69:
          targetLabel = "Bn";
          break;
        default:
          targetLabel = "";
          break;
      }
  
   // Draw target label if it's not empty
      if (targetLabel !== "") {
        if(targetLabel[1] == 'a') {
        textFont("Arial", 28);
        textStyle(BOLD);
        fill(color(255, 255, 255));
        text(targetLabel, this.x, this.y - 20);
        }
        else {
        textFont("Arial", 33);
        textStyle(BOLD);
        fill(color(255, 255, 255));
        text(targetLabel, this.x, this.y - 20);
        }
      }
      
  
    }
  }

