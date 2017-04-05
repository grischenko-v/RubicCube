
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
  scene.updateMatrixWorld(true);
}

function addLight(){
  var light = new THREE.AmbientLight(); // soft white light scene.add( light );
  scene.add(light);
}

function selfRandom(min, max)
{
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function handleWindowResize() {
  HEIGHT = 800;
  WIDTH = 600;
  renderer.setSize(WIDTH, HEIGHT);
  camera.aspect = WIDTH / HEIGHT;
  camera.updateProjectionMatrix();
}

var Cube = function(pos1, pos2, pos3 ){
  var color1 = 0xF59529;//orange
  var color2 = 0xE92020;//red
  var color3 = 0xF8F820;//yellow
  var color4 = 0xffffff;//white
  var color5 = 0x3A9014;//green
  var color6 = 0x3cbbfa;//blue
  var color7 = 0x000000;//black
  var color ;
  geom = new THREE.CubeGeometry( 1, 1, 1 );
  for ( var i = 0; i < geom.faces.length; i = i + 2 ) {
    if(pos1 === 1 && i === 0)color = color1;
    else if(pos1 === -1 && i === 2 )color = color2;
    else if(pos2 ===  1 && i === 4 )color = color3;
    else if(pos2 === -1 && i === 6 )color = color4;
    else if(pos3 ===  1 && i === 8 )color = color5;
    else if(pos3 === -1 && i === 10)color = color6;
    else  color = color7;  
    geom.faces[ i ].color.setHex( color);
    geom.faces[ i + 1 ].color.setHex( color);
  }   
  var mat = new THREE.MeshBasicMaterial( { color: 0xffffff, vertexColors: THREE.FaceColors } );
  this.mesh = new THREE.Mesh(geom, mat);
  // white border
  var geo = new THREE.EdgesGeometry(  this.mesh.geometry ); 
  var mat1 = new THREE.LineBasicMaterial( { color: 0x232323, linewidth: 1} );
  var wireframe = new THREE.LineSegments( geo, mat1 );
  this.mesh.add( wireframe );
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
//x
var nameMass1 = ['-1-1-1', '-1-10', '-1-11', '0-1-1', '0-10', '0-11', '1-1-1', '1-10', '1-11'];
var nameMass2 = ['-10-1',  '-100',  '-101',  '00-1',  '000',  '001',  '10-1',  '100',  '101' ];
var nameMass3 = ['-11-1',  '-110',  '-111',  '01-1',  '010',  '011',  '11-1',  '110',  '111' ];
//y
var nameMass4 = ['11-1',  '110',  '111',  '10-1',  '100',  '101',  '1-1-1',  '1-10',  '1-11' ];
var nameMass5 = ['01-1',  '010',  '011',  '00-1',  '000',  '001',  '0-1-1',  '0-10',  '0-11' ];
var nameMass6 = ['-11-1', '-110', '-111', '-10-1', '-100', '-101', '-1-1-1', '-1-10', '-1-11']
//z
var nameMass7 = ['-1-11',  '-101',  '-111',  '0-11',  '001',  '011',  '1-11',  '101',  '111' ];
var nameMass8 = ['-1-10',  '-100',  '-110',  '0-10',  '000',  '010',  '1-10',  '100',  '110' ];
var nameMass9 = ['-1-1-1', '-10-1', '-11-1', '0-1-1', '00-1', '01-1', '1-1-1', '10-1', '11-1'];

function init(event){
      createScene();
      createCube();
      addLight();
      console.log(rubicCube);
      console.log("fdgfsg");
      console.log(group);
      console.log(scene);
      loop();
      //add listener for rotation
      control.addEventListener('mousemove', handleMouseMove, false);
      r3.addEventListener('click',
                    function(event){
                       group = new THREE.Object3D();                    
                       console.log('x: ' + rubicCube.mesh.rotation.x + 'y: ' + rubicCube.mesh.rotation.y + 'z: ' + rubicCube.mesh.rotation.z);

                       group.rotation.x = currentRoutValueX + rubicCube.mesh.rotation.x;
                       group.rotation.y = currentRoutValueY + rubicCube.mesh.rotation.y;
                       group.rotation.z = currentRoutValueZ + rubicCube.mesh.rotation.z;

                       for(let num = 0; num < nameMass1.length; num++){
                            THREE.SceneUtils.attach(scene.getObjectByName(nameMass1[num]), scene, group);
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
  this.geom = new THREE.BoxGeometry(3, 3, 3);
  this.geom.center();
  var mat = new THREE.MeshPhongMaterial({color:0xffffff, });
  var cubNum = 9;
  var n = 0;
  for(var i = -1; i < 2; i++){
    for(var j = -1; j < 2; j++){
      for (var k = -1; k < 2; k++) {
        cube[n] = new Cube(j, i, k);//y is i its a bug... must be fixed!!!
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

var currentRoutValueX = 0;
var currentRoutValueY = 0;
var currentRoutValueZ = 0;

var routValue = 0;
function rotateGroup(aGroup, axis){

   if(routValue < Math.PI/2 && rout === true){
       routValue +=0.01;
       switch (axis){
         case 'x': aGroup.rotation.x = currentRoutValueX + rubicCube.mesh.rotation.x + routValue; break;
         case 'y': aGroup.rotation.y = currentRoutValueY + rubicCube.mesh.rotation.y + routValue; break;
         case 'z': aGroup.rotation.z = currentRoutValueZ + rubicCube.mesh.rotation.z + routValue; break;
         default: console.log("rotateGroup wrong axis value!"); break;
       }
   }
   else if(rout === true) {
     rout = false;
     routValue = 0;
     var temp;

     var tempRotation = group.rotation.x;
    // var tempRotation = group.rotation.y;
     // var tempRotation = group.rotation.z;

     THREE.SceneUtils.attach(group, scene, rubicCube.mesh);
     console.log(rubicCube); 

     currentRoutValueX = aGroup.rotation.x;
     currentRoutValueY = aGroup.rotation.y;
     currentRoutValueZ = aGroup.rotation.z;

     console.log('currentRoutValueX : ' + currentRoutValueX + 'currentRoutValueY : ' + currentRoutValueY + 'currentRoutValueZ : ' + currentRoutValueZ );
     scene.remove(group);
     group = null;

     // if(aGroup.rotation.x > 2*Math.PI || aGroup.rotation.x < -2*Math.PI ) {
         // aGroup.rotation.x = 0;
         // currentRoutValue =0;
      // }     
    }
 }



function loop(){
   rotateGroup(group, 'x');

  // rotateGroup(group, 'y');
  // rotateGroup(group, 'z');


  updateCube();
  renderer.render(scene, camera);
  requestAnimationFrame(loop);
}

function updateCube(){
  rubicCube.mesh.rotation.x = -mousePos.y;
  //rubicCube.mesh.rotation.y = -mousePos.x;
};

var mousePos = {x:0, y:0};
function handleMouseMove(event) {
  var tx = + (event.clientX / WIDTH)*14;
  var ty = + (event.clientY / HEIGHT)*10;
  mousePos = {x:tx, y:ty};
}