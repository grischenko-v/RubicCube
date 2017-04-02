
      window.addEventListener('load', init, false);
      
      var scene, camera, HEIGHT, WIDTH, renderer, container;

      function createScene(){
        HEIGHT = 800;//window.innerHeight;
        WIDTH = 600;//window.innerWidth;
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera( 75, WIDTH/HEIGHT, 0.1, 1000 );
        camera.position.z = 10; 
        renderer = new THREE.WebGLRenderer( {alpha: true});
        renderer.setSize( WIDTH, HEIGHT );  
        renderer.setClearColor( 0xaaaaaa, 1 );

        container = document.getElementById('world');
        container.appendChild( renderer.domElement );        
         window.addEventListener('resize', handleWindowResize, false);
     }

     function handleWindowResize() {  
       HEIGHT = 800;
       WIDTH =  600;
       renderer.setSize(WIDTH, HEIGHT);
       camera.aspect = WIDTH / HEIGHT;
       camera.updateProjectionMatrix();
     }
 
  
     var Cube = function(pos1, pos2, pos3 ){   

       var color1 = 0xF59529;//orange 
       var color2 = 0xE92020;//red
       var color3 = 0xF8F812;//yellow
       var color4 = 0xffffff;//white
       var color5 = 0x3A9014;//green
       var color6 = 0x131ADD;//blue
       var color7 = 0x000000;//black
       
       var color ;

      var geom = new THREE.CubeGeometry( 1, 1, 1 ); 
      for ( var i = 0; i < geom.faces.length; i = i + 2 ) {
          /*switch(Math.random() * 10){
               case 0:color = color1; break;
               case 1:color = color2;  break;
               case 2:color = color3;  break;
               case 3:color = color4;  break;
               case 4:color = color5;  break;
               case 5:color = color6;  break;
           }*/
           color =  Math.random() * 0xffffff;
           geom.faces[ i ].color.setHex( color);
           geom.faces[ i + 1 ].color.setHex( color);

      }
      var m = new THREE.Mesh(geom, mat);
      var mat = new THREE.MeshBasicMaterial( { color: 0xffffff, vertexColors: THREE.FaceColors } );
      this.mesh =  new THREE.Mesh(geom, mat);
     }
     
     var rubicCube;
     function createCube(){
        rubicCube = new addRubicCub();
        scene.add(rubicCube.mesh);
        var axes = new THREE.AxisHelper( 20 );
        scene.add( axes ); 
    }        
  var group;

  var rout = false;

    function init(event){
     createScene();  
     createCube();    
         
     console.log(rubicCube);        
     
     console.log("fdgfsg");
     console.log(group);     
     loop();
     //add listener for rotation
     control.addEventListener('mousemove', handleMouseMove, false);   

     r3.addEventListener('click', 

     function(event){
        group = new THREE.Object3D();


      console.log("opbj by name");
      console.log(scene.getObjectByName('-1-1-1'));

       var nameMass1 = ['-1-1-1', '-1-10', '-1-11', '0-1-1', '0-10', '0-11', '1-1-1', '1-10', '1-11' ]


       for(let num = 0; num < nameMass1.length; num++){
        THREE.SceneUtils.attach(scene.getObjectByName(nameMass1[num]),  scene, group);
       } 
     
        scene.add( group );      
        console.log(scene);  
        console.log(group);       
        rout = true;     
        }
      , false); 
     }


    var cube = []; 
    function addRubicCub(){
       this.mesh = new THREE.Object3D();

       var positionX = 0;
       var positionY = 0;
       var positionZ = 0;
       
       var geom = new THREE.BoxGeometry(3, 3, 3);      

       geom.center();       

       var mat = new THREE.MeshPhongMaterial({color:0xffffff,   });

      var cubNum = 9;
      var n = 0;
      for(var i = -1; i < 2; i++){
        for(var j = -1; j < 2; j++){
          for (var k = -1; k < 2; k++) { 
            cube[n] = new Cube(i,j,k); 
            cube[n].mesh.position.x = j;         
            cube[n].mesh.position.y = i;
            cube[n].mesh.position.z = k; 
            cube[n].mesh.name = "" + i + j + k ; 
            this.mesh.add(cube[n].mesh);         
            n++;   
          }
        }
      }
    }

  var currentRoutValue;
  var routValue = 0;
  function rotateGroup(aGroup, axis){
   // currentRoutValue = aGroup.rotation.x;
    if(routValue  <  Math.PI/2  && rout === true){
      routValue +=0.01;
      switch (axis){
          case 'x': aGroup.rotation.x = currentRoutValue + routValue; break;
          case 'y': aGroup.rotation.y = currentRoutValue + routValue;  break; 
           default: console.log("rotateGroup wrong axis  value!"); break;
      }
    }
    else if(rout === true) {
      rout = false;
      routValue =  0;   
      
      var temp;
      var tempRotation = group.rotation.x;



      for(var j = 0; j < 1; j++){
               // temp=group.children.pop();
               
             //  temp.rotation.x = tempRotation;   
               //temp.position.x =-2;                  
          //   rubicCube.mesh.add(group);
      }
       
       THREE.SceneUtils.attach(group,  scene,  rubicCube.mesh);
       

      //console.log(tempRotation);


      console.log(rubicCube);
     scene.remove (group);

     console.log("opbj by name");
      console.log(scene.getObjectByName('-1-1-1'));
    //  console.log(scene.children[0].children[0]);
      //  console.log(scene);
      // group = null;
     // 
      //if(aGroup.rotation.x  >  2*Math.PI   || aGroup.rotation.x  <  -2*Math.PI ) aGroup.rotation.x = 0; 
      // currentRoutValue = aGroup.rotation.x ;      
    }
  }

   function loop(){  
     //if( typeof group !== 'null')
         rotateGroup(group, 'x'); 
       

      currentRoutValue = scene.children[0].rotation.x;
    
      updateCube();
      renderer.render(scene, camera); 
      requestAnimationFrame(loop);  
   }

   function updateCube(){     
      rubicCube.mesh.rotation.x = -mousePos.y;
     // rubicCube.mesh.rotation.y = -mousePos.x;
   };

    var mousePos = {x:0, y:0};
    function handleMouseMove(event) {     
        var tx =  + (event.clientX / WIDTH)*14;    
        var ty =  + (event.clientY / HEIGHT)*10;
        mousePos = {x:tx, y:ty};         
    }