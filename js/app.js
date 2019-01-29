function init(){    

    var loaded = false;
    var mousedownID = -1;  //Global ID of mouse down interval
    var degrease;
    var count = 0;
    var vitesse = 10;

    var element = document.querySelector("#empreinte");

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
        if(count < 1){
            console.log("Stop");
            clearInterval(degrease);
        }
        bar.style.width = count + "%";   
        arcMove();  
    }


    function load(){
        var loader = document.querySelector("#loader");

        loader.style.display = "none";
    }

    function whilemousedown() { 
        count += 1; 
        if(count > 100){
            console.log("Loaded");
            loaded = true;            
            clearInterval(degrease);
            clearInterval(mousedownID);
            alert("à vous de faire la suite :-)");
            console.log("Document chargé !");
            load();
            return;            
        }
        bar.style.width = count + "%";
        arcMove();
    }

    //Assign events
    element.addEventListener("mousedown", mousedown);
    element.addEventListener("touchstart", mousedown);
    element.addEventListener("mouseup", mouseup);
    element.addEventListener("touchend", mouseup);
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
  
  c.lineCap = 'round';
  //arcMove();
  
  function arcMove(){
    var deegres = 0;
      deegres = count * oneProcent;
      c.clearRect( 0, 0, can.width, can.height );
      procent = deegres / oneProcent;
    
    var tailleCercle = 70;  
    var borderCercle = 5;
    var color = "#006DF0";

    var progressCircle = (Math.PI/180) * (270 + deegres);

    var pointEncrage = (Math.PI/180) * 270;

    if (progressCircle < 5){
        color = "transparent";
    }

    if(procent >= 100){
        procent = 100;
        color = "green";
    }

    spanProcent.innerHTML = procent.toFixed() + "%";
    if(procent <= 0){
        spanProcent.innerHTML = "";
    }

      /*c.beginPath();
      c.arc( posX, posY, 70, (Math.PI/180) * 270, (Math.PI/180) * (270 + 360) );
      c.strokeStyle = '#b1b1b1';
      c.lineWidth = '10';
      c.stroke();*/

      c.beginPath();
      c.strokeStyle = color;
      c.lineWidth = borderCercle;
      c.arc( posX, posY, tailleCercle, pointEncrage, progressCircle );
      c.stroke();      

  }
    

}

init();