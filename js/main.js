
window.addEventListener('load', init, false);
var scene, camera, HEIGHT, WIDTH, renderer, container;
function createScene(){
  HEIGHT = 800;//window.innerHeight;
  WIDTH = 600;//window.innerWidth;
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera( 75, WIDTH/HEIGHT, 0.1, 1000 );
  camera.position.z = 7;
  camera.position.x = 7;
  camera.position.y = 7;

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
  var color1 = 0xdb7f0c;//orange
  var color2 = 0x890828;//red
  var color3 = 0xffce00;//yellow
  var color4 = 0xede3de;//white
  var color5 = 0x00aa11;//green
  var color6 = 0x1c61b5;//blue
  var color7 = 0x2A343C;//black
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
x0Side = {
nameMass: ['-1-1-1', '-1-10', '-1-11', '0-1-1', '0-10', '0-11', '1-1-1', '1-10', '1-11'],
currentRoutValueX: 0,
currentRoutValueY: 0,
currentRoutValueZ: 0,
rout: false
 }
 x1Side = {
nameMass : ['-10-1',  '-100',  '-101',  '00-1',  '000',  '001',  '10-1',  '100',  '101' ],
currentRoutValueX : 0,
currentRoutValueY : 0,
currentRoutValueZ : 0,
rout : false
}

 x2Side ={
nameMass :['-11-1',  '-110',  '-111',  '01-1',  '010',  '011',  '11-1',  '110',  '111' ],
currentRoutValueX :0,
currentRoutValueY: 0,
currentRoutValueZ :0,
rout :false
}
//y
 y0Side ={
nameMass :['11-1',  '110',  '111',  '10-1',  '100',  '101',  '1-1-1',  '1-10',  '1-11' ],
currentRoutValueX: 0,
currentRoutValueY: 0,
currentRoutValueZ: 0,
rout : false
}

 y1Side = {
nameMass :['01-1',  '010',  '011',  '00-1',  '000',  '001',  '0-1-1',  '0-10',  '0-11' ],
currentRoutValueX :0,
currentRoutValueY: 0,
currentRoutValueZ :0,
rout : false
}

 y2Side = {
nameMass : ['-11-1', '-110', '-111', '-10-1', '-100', '-101', '-1-1-1', '-1-10', '-1-11'],
currentRoutValueX : 0,
currentRoutValueY : 0,
currentRoutValueZ : 0,
rout : false
}
//z
 z0Side = {
nameMass : ['-1-11',  '-101',  '-111',  '0-11',  '001',  '011',  '1-11',  '101',  '111' ],
currentRoutValueX : 0,
currentRoutValueY : 0,
currentRoutValueZ : 0,
rout : false
}

z1Side = {
 nameMass :['-1-10',  '-100',  '-110',  '0-10',  '000',  '010',  '1-10',  '100',  '110' ],
currentRoutValueX :0,
currentRoutValueY :0,
currentRoutValueZ: 0,
rout :false
}

z2Side = {
nameMass :['-1-1-1', '-10-1', '-11-1', '0-1-1', '00-1', '01-1', '1-1-1', '10-1', '11-1'],
currentRoutValueX: 0,
currentRoutValueY: 0,
currentRoutValueZ :0,
rout :false
}
var routAxis = false;
function init(event){
      createScene();
      createCube();
      addLight();        
      console.log(rubicCube);     
      console.log(group);
      console.log(scene);
      loop();
      //add listener for rotation
      world.addEventListener('mousemove', handleMouseMove, false);
      world.addEventListener('mousedown', function(event){ routAxis = !routAxis; }, false);
      r0.addEventListener('click', function(event){ choiseSide(x0Side); }, false);
      r1.addEventListener('click', function(event){ choiseSide(x1Side); }, false);
      r2.addEventListener('click', function(event){ choiseSide(x2Side); }, false);
      r3.addEventListener('click', function(event){ choiseSide(y0Side); }, false);
      r4.addEventListener('click', function(event){ choiseSide(y1Side); }, false);
      r5.addEventListener('click', function(event){ choiseSide(y2Side); }, false);
      r6.addEventListener('click', function(event){ choiseSide(z0Side); }, false);
      r7.addEventListener('click', function(event){ choiseSide(z1Side); }, false);
      r8.addEventListener('click', function(event){ choiseSide(z2Side); }, false);
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
  var cubeAxis = new THREE.AxisHelper(20);
  this.mesh.add(cubeAxis);
}

var routValue = 0;
function rotateGroup(aGroup, axis, side){

   if(routValue <= Number(Math.PI/2).toFixed(4) && rout === true){
       routValue +=0.01;

                 console.log("asdasdsdfewrd");
       switch (axis){
         case 'x': aGroup.rotation.x = side.currentRoutValueX + rubicCube.mesh.rotation.x + routValue; break;
         case 'y': aGroup.rotation.y = side.currentRoutValueY + rubicCube.mesh.rotation.y + routValue; break;
         case 'z': aGroup.rotation.z = side.currentRoutValueZ + rubicCube.mesh.rotation.z + routValue; break;
         default: console.log("rotateGroup wrong axis value!"); break;
       }
   }
   else if(rout === true) {
     rout = false;
     routValue = 0;
     THREE.SceneUtils.attach(group, scene, rubicCube.mesh);
    
     console.log(side);
     switch (axis){
        case 'x':{
                 side.currentRoutValueX = ( Math.abs(side.currentRoutValueX - 2* Math.PI)) < 0.01 ? 0 : side.currentRoutValueX + Math.PI/2;                                                        
                 side.currentRoutValueY = aGroup.rotation.y;
                 side.currentRoutValueZ = aGroup.rotation.z;
                 
                 console.log("asdasd");
                 console.log(side.nameMass);
                 side.nameMass = ['11-1',  '110',  '111',  '10-1',  '100',  '101',  '1-1-1',  '1-10',  '1-11' ];
                 console.log("asdasd22");
                 console.log(side.nameMass);
                 break; } 
         case 'y':{
                  side.currentRoutValueY = ( Math.abs(side.currentRoutValueY - 2* Math.PI)) < 0.01 ? 0 : side.currentRoutValueY + Math.PI/2;                                                        
                  side.currentRoutValueX = aGroup.rotation.x;
                  side.currentRoutValueZ = aGroup.rotation.z;
                 break; }
        case 'z':{
                  side.currentRoutValueZ = ( Math.abs(side.currentRoutValueZ - 2* Math.PI)) < 0.01 ? 0 : side.currentRoutValueZ + Math.PI/2;                                                        
                  side.currentRoutValueX = aGroup.rotation.x;
                  side.currentRoutValueY = aGroup.rotation.y;
                 break; }
     }
     scene.remove(group);
     group = null;
     side.rout = false;
    }
 }

function loop(){
  checkNeedRotation()  
  updateCube();
  renderer.render(scene, camera);
  requestAnimationFrame(loop);
}

function checkNeedRotation(){

   if(x0Side.rout === true)rotateGroup(group, 'x', x0Side);    
   if(x1Side.rout === true)rotateGroup(group, 'x', x1Side);  
   if(x2Side.rout === true)rotateGroup(group, 'x', x2Side);  
   if(y0Side.rout === true)rotateGroup(group, 'y', y0Side);  
   if(y1Side.rout === true)rotateGroup(group, 'y', y1Side);  
   if(y2Side.rout === true)rotateGroup(group, 'y', y2Side);  
   if(z0Side.rout === true)rotateGroup(group, 'z', z0Side);
   if(z1Side.rout === true)rotateGroup(group, 'z', z1Side);
   if(z2Side.rout === true)rotateGroup(group, 'z', z2Side);
}

function updateCube(){
  var x = camera.position.x,
      y = camera.position.y,
      z = camera.position.z;
  var radius = 10;     
  if (routAxis){
     camera.position.y = rubicCube.mesh.position.y + radius * Math.sin( 3 *  Number(mousePos.y).toFixed(3) / 5 );  
     camera.position.x = rubicCube.mesh.position.x + radius * Math.sin( 3 *  Number(mousePos.x).toFixed(3) / 5 );
     camera.position.z = rubicCube.mesh.position.z + radius * Math.cos( 3 *  Number(mousePos.x + mousePos.y).toFixed(3) / 5 );
  } 
  camera.lookAt( rubicCube.mesh.position );
};

var mousePos = {x:0, y:0};
function handleMouseMove(event) {
  var tx = + (event.clientX / WIDTH)*14;
  var ty = + (event.clientY / HEIGHT)*10;
  mousePos = {x:tx, y:ty};
}

function choiseSide(side){
  group = new THREE.Object3D(); 
  console.log(side) ;                  
  group.rotation.x = side.currentRoutValueX + rubicCube.mesh.rotation.x;
  group.rotation.y = side.currentRoutValueY + rubicCube.mesh.rotation.y;
  group.rotation.z = side.currentRoutValueZ + rubicCube.mesh.rotation.z;

  for(let num = 0; num < side.nameMass.length; num++){
      THREE.SceneUtils.attach(scene.getObjectByName(side.nameMass[num]), scene, group);
  }

  scene.add( group );               
  rout = true;
  side.rout = true;
}

