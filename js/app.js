function init(){
    console.log("Document chargé !");

    var mousedownID = -1;  //Global ID of mouse down interval
    var degrease;
    var count = 0;
    var vitesse = 10;
    var loaded = false;

    var bar = document.querySelector("#bar");

    function mousedown(event) {
        if(mousedownID==-1) { //Prevent multimple loops!
            clearInterval(degrease);
            mousedownID = setInterval(whilemousedown, vitesse /*execute every 100ms*/);
            
        }
    }
    
    function mouseup(event) {    
        if(mousedownID!=-1) {  //Only stop if exists   
            if(loaded){
                return;
            }     
            clearInterval(mousedownID);
            mousedownID=-1;
            degrease = setInterval(whileMouseUp, vitesse); 
            
        }
    }

    function whileMouseUp() {
        count -= 1; 
        bar.style.width = count + "%";   
        arcMove();    
        console.log(count);
        if(count < 1){
            console.log("Stop");
            clearInterval(degrease);
        }
    }

    function whilemousedown() { 
        count += 1; 
        bar.style.width = count + "%";
        arcMove();
        if(count > 100){
            console.log("Loaded");
            loaded = true;
            clearInterval(degrease);
            clearInterval(mousedownID);
            return;            
        }
        console.log(count);
    }

    //Assign events
    document.addEventListener("mousedown", mousedown);
    document.addEventListener("mouseup", mouseup);
    //Also clear the interval when user leaves the window with mouse
    //document.addEventListener("mouseout", mouseup);







    var can = document.getElementById('canvas'),
      spanProcent = document.getElementById('procent'),
       c = can.getContext('2d');
 
  var posX = can.width / 2,
      posY = can.height / 2,
      fps = 1000 / 200,
      procent = 0,
      oneProcent = 360 / 100,
      result = oneProcent * count;
      console.log("result : " + result);
  
  c.lineCap = 'round';
  //arcMove();
  
  function arcMove(){
    var deegres = 0;
      deegres = count * oneProcent;
      c.clearRect( 0, 0, can.width, can.height );
      procent = deegres / oneProcent;

      spanProcent.innerHTML = procent.toFixed();

      c.beginPath();
      c.arc( posX, posY, 70, (Math.PI/180) * 270, (Math.PI/180) * (270 + 360) );
      c.strokeStyle = '#b1b1b1';
      c.lineWidth = '10';
      c.stroke();

      c.beginPath();
      c.strokeStyle = '#3949AB';
      c.lineWidth = '10';
      c.arc( posX, posY, 70, (Math.PI/180) * 270, (Math.PI/180) * (270 + deegres) );
      c.stroke();

    
  }

    

}