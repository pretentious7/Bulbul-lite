// these need to be accessed inside more than one function so we'll declare them first
let container;
let camera;
let controls;
let renderer;
let scene;
let mesh;
let mesh2;
var boxes = [];
var numBoxes = 9;
var bigmat;



var rgbToHex = function (rgb) { 
  var hex = Number(rgb).toString(16);
  if (hex.length < 2) {
       hex = "0" + hex;
  }
  return hex;
};


var fullColorHex = function(r,g,b) {   
  var red = rgbToHex(r);
  var green = rgbToHex(g);
  var blue = rgbToHex(b);
  return red+green+blue;
};


function init() {

  container = document.querySelector( '#scene-container' );

  scene = new THREE.Scene();
  //scene.background = new THREE.Color( 0x8FBCD4 );

  createCamera();
  //createControls();
  createLights();
  createMeshes();
  createRenderer();

  renderer.setAnimationLoop( () => {

    update();
    render();

  } );

}

function createCamera() {

  camera = new THREE.PerspectiveCamera(
    35, // FOV
    container.clientWidth / container.clientHeight, // aspect

    0.1, // near clipping plane
    1000, // far clipping plane
  );

  camera.position.set( 51 ,-18, 40 )
  camera.rotation.y += math.pi/4;
  camera.rotation.z += math.pi/2;



}

function createControls() {

  controls = new THREE.OrbitControls( camera, container );

}


function createLights() {

  // Create a directional light
  const light = new THREE.DirectionalLight( 0xffffff, 3.0 );
  //0xff9317
  const ambientLight = new THREE.HemisphereLight(
  0xffffff, // bright sky color
  0x000000, // dim ground color
  3, // intensity
  );

  scene.add( ambientLight );


  // move the light back and up a bit
  light.position.set( 50, 10, 10 );

  // remember to add the light to the scene
  scene.add( light );

}

function createMeshes2() {

  const geometry = new THREE.BoxBufferGeometry( 0.2, 0.2, 0.2 );

  const textureLoader = new THREE.TextureLoader();

  const texture = textureLoader.load( 'https://cdn.glitch.com/9cc367a0-18ab-4af4-a31d-4a9272e2439f%2FScreenshot%202019-10-17%20at%2012.52.09%20AM.png?v=1573336761732' );

  texture.encoding = THREE.sRGBEncoding;
  texture.anisotropy = 16;

  const material = new THREE.MeshStandardMaterial( {
    map: texture,
  } );

  mesh = new THREE.Mesh( geometry, material );
  
  mesh2 = new THREE.Mesh( geometry, material );

  scene.add( mesh );
  scene.add( mesh2 );
  
  
  

}

abs = math.abs
cos = math.cos
sqrt = math.sqrt

function setBoxPosZ(box, step) {
let x = box.position.x;
let y = box.position.y;
let md = abs(x) + abs(y);
let d = sqrt(x*x + y*y);
box.position.z = x;
box.position.z = cos(x/2) + cos(y/2);
box.position.z = cos(d);
box.position.z = cos(d + step);
box.position.z = d;
}

function setBoxScaleZ(box, step) {
let x = box.position.x;
let y = box.position.y;
let md = abs(x) + abs(y);
let d = sqrt(x*x + y*y);
box.scale.z = (d);
box.scale.x = 1+d/20;
box.scale.y = 1+d/20;
//position.z = d;//cos(abs(x) - abs(y) + step);
}

function createMeshes(){
  
  var geometry = new THREE.BoxGeometry( 1,1,1);

  
 // var boxes = [];
  var numBoxes = 9;
  for (let x = 0; x <= numBoxes; x++) {
    for (let y = 0; y <= numBoxes; y++) {
      var material = new THREE.MeshStandardMaterial( );
      var cube = new THREE.Mesh( geometry, material );
      cube.position.x = x * 1.2;
      cube.position.y = y * 1.2;
      cube.position.z = 1
      boxes.push(cube)
      scene.add(cube);
  }
}
  
//   for (var box of boxes) {
  
//     var x = box.position.x;
//     var y = box.position.y;
    
//     //setBoxPosZ(box,10)
//     //setBoxScaleZ(box,10)

//     var wpVector = new THREE.Vector3();

      
//   //box.material.color.r = math.abs(box.getWorldPosition().x)/2;
//   //box.material.color.g = math.abs(box.getWorldPosition().y)/2;
//   box.material.color.r = math.abs(box.getWorldPosition(wpVector).z)/25;
//   box.material.color.g = math.abs(box.getWorldPosition(wpVector).z)/50;

  

//}

  
}
function createRenderer() {

  renderer = new THREE.WebGLRenderer( { antialias: true } );
  renderer.setSize( container.clientWidth, container.clientHeight );

  renderer.setPixelRatio( window.devicePixelRatio );

  renderer.gammaFactor = 2.2;
  renderer.gammaOutput = true;
  
  renderer.physicallyCorrectLights = true;


  container.appendChild( renderer.domElement );

}

// perform any updates to the scene, called once per frame
// avoid heavy computation here
function update() {

    var len = bigmat._size[0];

    for(let i=0;i<len;i++){
        for(let j=0;j<len;j++){
           box = boxes[i*len + j]


           if(box.position.z-(bigmat._data[i][j]*10)>0.1){
               box.position.z -= 0.1
               box.material.color.r -= 0.1
           }
           else if(box.position.z-(bigmat._data[i][j]*10)<-0.1){
               box.position.z += 0.1
               box.material.color.r +=  0.1
           }



        }
    }


  // increase the mesh's rotation each frame

}

function render() {
  

  renderer.render( scene, camera );

}


function onWindowResize() {

  // set the aspect ratio to match the new browser window aspect ratio
  camera.aspect = container.clientWidth / container.clientHeight;


  // update the camera's frustum
  camera.updateProjectionMatrix();

  // update the size of the renderer AND the canvas
  renderer.setSize( container.clientWidth, container.clientHeight );

}

window.addEventListener( 'resize', onWindowResize );


// call the init function to set everything up
init();