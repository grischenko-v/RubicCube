
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
 
  
     var Cube = function(){            
       var geom = new THREE.CubeGeometry( 1, 1, 1 ); 
      for ( var i = 0; i < geom.faces.length; i = i + 2 ) {
           var color =  Math.random() * 0xffffff;
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
     //console.log(cube);       
     console.log(rubicCube);        
     // rubicCube.mesh.add(group);
     // scene.remove (group);
     //group = {};      
     console.log("fdgfsg");
     console.log(group);     
     loop();
     //add listener for rotation
     control.addEventListener('mousemove', handleMouseMove, false);   

     r3.addEventListener('click', 

     function(event){
        group = new THREE.Object3D();
        group.add(
                scene.children[0].children[0],
                scene.children[0].children[1],
                scene.children[0].children[2],
                scene.children[0].children[9],
                scene.children[0].children[10],
                scene.children[0].children[11],
                scene.children[0].children[18],
                scene.children[0].children[19],
                scene.children[0].children[20]
             );


        group.rotation.x = scene.children[0].rotation.x;
        group.rotation.y = scene.children[0].rotation.y;
        group.rotation.z = scene.children[0].rotation.z;
      
        console.log(group.rotation.x);  
        console.log(group.rotation.y);  
        console.log(group.rotation.z);  

        scene.add( group );
        rout = true;
       //  console.log('ratation ' + rout);
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
            cube[n] = new Cube(); 
            cube[n].mesh.position.x = j;         
            cube[n].mesh.position.y = i;
            cube[n].mesh.position.z = k; 
            cube[n].mesh.name = "name" + i + j + k + " number: " + n; 
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
        


        
      rubicCube.mesh.add(group.children.pop());
      rubicCube.mesh.add(group.children.pop());
      rubicCube.mesh.add(group.children.pop());
      rubicCube.mesh.add(group.children.pop());
      rubicCube.mesh.add(group.children.pop());
      rubicCube.mesh.add(group.children.pop());
      rubicCube.mesh.add(group.children.pop());
      rubicCube.mesh.add(group.children.pop());
      rubicCube.mesh.add(group.children.pop());
      console.log(group);
      console.log(rubicCube);
      scene.remove ( group    );

          console.log(scene.children[0].children[0]);
      //  console.log(scene);
    // group = null;
      console.log( );
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
