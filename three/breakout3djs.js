var container, stats;
var camera, scene, renderer;
var frustumSize = 1000;
var ball;
init();
animate();


function init() {
  container = document.createElement( 'div' );
  document.body.appendChild( container );

  var aspect = window.innerWidth / window.innerHeight;
  camera = new THREE.OrthographicCamera( frustumSize * aspect / - 2, frustumSize * aspect / 2, frustumSize / 2, frustumSize / - 2, 1, 2000 );
  camera.position.y = 400;

  scene = new THREE.Scene();
  scene.background = new THREE.Color( 0xf0f0f0 );

  // Grid
  var gridHelper = new THREE.GridHelper(1000, 12);
  scene.add( gridHelper );

  //paddle
  var paddleGeo = new THREE.BoxGeometry( 50, 50, 170 );
  var paddleMatr = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
  var paddle = new THREE.Mesh( paddleGeo, paddleMatr );
  paddle.position.x = 500;
  paddle.position.y = 50;
  paddle.position.z = 20;
  scene.add( paddle );

  var ballGeo = new THREE.BoxGeometry( 25, 25, 25 );
  var ballMatr = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
  ball = new THREE.Mesh( ballGeo, ballMatr );
  ball.position.x = 0;
  ball.position.y = 50;
  ball.position.z = 0;
  scene.add( ball );

  // movement - should seperate into another function and call inside object loader

  document.addEventListener("keydown", onDocumentKeyDown, false);

  function onDocumentKeyDown(event) {
    var xSpeed = 50;
    var zSpeed = 50;
    var keyCode = event.which;
    if (keyCode == 37) {
        paddle.position.z += zSpeed;
    } else if (keyCode == 39) {
        paddle.position.z -= zSpeed;
    } else if (keyCode == 40) {
        paddle.position.x += xSpeed;
    } else if (keyCode == 38) {
        paddle.position.x -= xSpeed;
    }
    render();
  }

  // Lights
  var ambientLight = new THREE.AmbientLight( 0xf03ff0 );
  scene.add( ambientLight );

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
  ball.position.x += 20;
}
function render() {
  col();
  // unset this for rotating camera
  // var timer = Date.now() * 0.0001;
  // camera.position.x = Math.cos(timer) * 800;
  // camera.position.z = Math.sin(timer) * 800;
  camera.lookAt( scene.position );
  renderer.render( scene, camera );
}
