 
var cubeControl = (function(){
    var _enableMove = false;
    var whiteIds =  ['ws1', 'ws2', 'ws3', 'ws4', 'ws5', 'ws6', 'ws7', 'ws8', 'ws9'];
    var redIds =    ['rs1', 'rs2', 'rs3', 'rs4', 'rs5', 'rs6', 'rs7', 'rs8', 'rs9'];
    var orangeIds = ['os1', 'os2', 'os3', 'os4', 'os5', 'os6', 'os7', 'os8', 'os9'];
    var yellowIds = ['ys1', 'ys2', 'ys3', 'ys4', 'ys5', 'ys6', 'ys7', 'ys8', 'ys9'];
    var greenIds =  ['gs1', 'gs2', 'gs3', 'gs4', 'gs5', 'gs6', 'gs7', 'gs8', 'gs9'];
    var blueIds =   ['bs1', 'bs2', 'bs3', 'bs4', 'bs5', 'bs6', 'bs7', 'bs8', 'bs9'];


  return {

     mouseCoords: function (e) {  
              if(_enableMove){
               x = e.pageX; 
               y = e.pageY; 
               document.getElementById("coords").innerHTML = "X : " + x + ", Y : " + y;   
               cube = document.getElementById("cube");   
               cube.style.transform = ' rotateY('+(x*3).toString()+'deg) rotateX('+(y*4).toString()+'deg) ';
               }
            },//mouseCoords  

     enableMove: function (){
               var controller;
               controller = document.getElementById("controller"); 
               if(_enableMove) controller.innerHTML = "Click here and rotate!";
               else controller.innerHTML = "Click to stop!";
               _enableMove = !_enableMove;
             },//enableMove

     randGrid: function (){
               var field, fieldName, sideName;
               var color;
               var w_count, r_count, o_count, y_count, g_count, b_count;
           
               for(var j = 0; j < 6; j++) {
                 switch(j){
                   case 0: sideName = 'ws'; break;
                   case 1: sideName = 'rs'; break;
                   case 2: sideName = 'os'; break;
                   case 3: sideName = 'ys'; break;
                   case 4: sideName = 'gs'; break;
                   case 5: sideName = 'bs'; break;
                 } for(var i = 1; i < 10; i++){
                     fieldName = "" + sideName + i;
      
                     field = document.getElementById(fieldName); 
                     switch(Math.round(Math.random() * 6 )){
                       case 0:color = 'white';  w_count++;  break;
                       case 1:color = 'red';    r_count++;  break;
                       case 2:color = 'orange'; o_count++;  break;
                       case 3:color = 'yellow'; y_count++;  break;
                       case 4:color = 'green';  g_count++;  break;
                      case 5:color = 'blue';   b_count++;   break;
                      }
                    field.style.background = color;     
                 }
               }
               w_count = 0;
               r_count = 0;
               o_count = 0;
               y_count = 0;
               g_count = 0;
               b_count = 0;
            },//randGrid

     compile: function (){
             var field, fieldName, sideName;
             var color;
             var w_count, r_count, o_count, y_count, g_count, b_count;

             for(var j = 0; j < 6; j++) {
               switch(j){
                 case 0: sideName = 'ws'; break;
                 case 1: sideName = 'rs'; break;
                 case 2: sideName = 'os'; break;
                 case 3: sideName = 'ys'; break;
                 case 4: sideName = 'gs'; break;
                 case 5: sideName = 'bs'; break;
               }
               for(var i = 1; i < 10; i++){
                  fieldName = "" + sideName + i;               
                  field = document.getElementById(fieldName); 
                  switch(j ){
                     case 0:color = 'white';  break;
                     case 1:color = 'red';    break;
                     case 2:color = 'orange'; break;
                     case 3:color = 'yellow'; break;
                     case 4:color = 'green';  break;
                     case 5:color = 'blue';   break;
                   }
                  field.style.background = color;     
               }
            }
        }// 
    };//return
 }
)();

//html control
compile.onclick = cubeControl.compile;
rand.onclick = cubeControl.randGrid;
controller.onmousemove = cubeControl.mouseCoords;
controller.onclick = cubeControl.enableMove;