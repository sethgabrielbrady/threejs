var container, stats;
var camera, scene, renderer;
var frustumSize = 1000;
var ball;
var paddle;
var upWall;
var canvas = document.getElementById("myCanvas");
var gridHelper;
var dx = 10;
var dy =-10;
var ballRadius = 12.5;
var rightPressed, leftPressed;
var paddleWidth;
var binary = (Math.random() * 2) + 1;
var zRND = Math.random() * 500;


init();
animate();


function init() {
  container = document.createElement( 'div' );
  document.body.appendChild( container );

  var aspect = canvas.width / canvas.height;

  // var aspect = window.innerWidth / window.innerHeight;
  camera = new THREE.OrthographicCamera( frustumSize * aspect / - 2, frustumSize * aspect / 2, frustumSize / 2, frustumSize / - 2, 1, 2000 );
  camera.position.y = 400;

  scene = new THREE.Scene();
  scene.background = new THREE.Color( 0xf0f0f0 );

  // Grid
  gridHelper = new THREE.GridHelper(1000, 12);
  scene.add( gridHelper );

  //paddle
  var paddleGeo = new THREE.BoxGeometry( 50, 50, 170 );
  var paddleMatr = new THREE.MeshLambertMaterial( { color: 0xff0000 } );
  paddle = new THREE.Mesh( paddleGeo, paddleMatr );
  paddle.position.x = 500;
  paddle.position.y = 50;
  paddle.position.z = 20;
  scene.add( paddle );

  var ballGeo = new THREE.BoxGeometry( 25, 25, 25 );
  var ballMatr = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
  ball = new THREE.Mesh( ballGeo, ballMatr );
  ball.position.x = -500;
  ball.position.y = 50;
  ball.position.z = zRND;
  scene.add( ball );

  // Lights
  var ambientLight = new THREE.AmbientLight( 0xf03ff0 );
  scene.add( ambientLight );

  var light2 = new THREE.PointLight( 0xffffff );
  scene.add(light2);

  // renderer
  renderer = new THREE.WebGLRenderer({canvas: myCanvas});
  renderer.setClearColor(0x000000);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild( renderer.domElement );

  window.addEventListener( 'resize', onWindowResize, false );
}

function onWindowResize() {
  var aspect = window.innerWidth / window.innerHeight;
  camera.left   = - frustumSize * aspect / 2;
  camera.right  =   frustumSize * aspect / 2;
  camera.top    =   frustumSize / 2;
  camera.bottom = - frustumSize / 2;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}

function animate() {
  requestAnimationFrame( animate );
  render();
}

// set this for fixed camera
camera.position.x = Math.cos(100) * 400;
camera.position.z = Math.sin(100) * 400;

function col(){
  ball.position.x += dx;
  ball.position.z += dy;

// if ballx is greater than paddle x && ballx is less than paddle x minus 170
  if( ball.position.x > paddle.position.x &&
    ball.position.z <= paddle.position.z + 80 &&
    ball.position.z >= paddle.position.z - 80 ) {
    dx = -dx;
    dy = dy + (Math.random() * 10);
  }

  if(ball.position.x + dx <= ballRadius -500) {
    dx = -dx;
  }
  if (ball.position.z <= -500 + ballRadius || ball.position.z >= 500 - ballRadius){
    dy = -dy;
  }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
// paddle movement with keys
function keyDownHandler(e) {
  if(e.keyCode == 37) {
    rightPressed = true;
  }
  else if(e.keyCode == 39) {
    leftPressed = true;
  }
}
function keyUpHandler(e) {
  if(e.keyCode == 37) {
    rightPressed = false;
  }
  else if(e.keyCode == 39) {
    leftPressed = false;
  }
}

function render() {
  if(rightPressed && paddle.position.z < 500-70) {
    paddle.position.z += 14;
  } else if(leftPressed && paddle.position.z > -500 + 70) {
    paddle.position.z -= 14;
  }

  col();
  if (binary === 1){
    zRND = zRND * -1;
  }else {
    zRND = zRND;
  }
  console.log(binary);
  // console.log("paddle z",paddle.position.z);
  console.log("paddle x",paddle.position.x);
  // console.log("ball z", ball.position.z);
  console.log("ball x",ball.position.x);

  if (ball.position.x > paddle.position.x + 100){
    ball.position.x = -500;
    ball.position.z = Math.random() * 500;
    dx = 10;
    dy =-10;
  }
  // unset this for rotating camera
  var timer = Date.now() * 0.0001;
  camera.position.x = Math.cos(timer) * 800;
  camera.position.z = Math.sin(timer) * 800;
  camera.lookAt( scene.position );
  renderer.render( scene, camera );
}
