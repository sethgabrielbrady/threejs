var container, stats;
var camera, scene, renderer;
var frustumSize = 1000;

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

  // Cubes
  var shipGeo = new THREE.BoxGeometry( 50, 50, 50 );
  var shipLoader = new THREE.ObjectLoader();
  shipLoader.load('models/shard-ship.json', function(ship) {
    ship.scale.x = ship.scale.y = ship.scale.z = 20;
    ship.position.x = 500;
    ship.position.y = 0;
    ship.position.z = 20;
    ship.rotation.y = -1 *(Math.PI / 2);
    ship.translation = shipGeo.center(shipGeo);
    scene.add(ship);

    // movement - should seperate into another function and call inside object loader
    var xSpeed = 50;
    var zSpeed = 50;
    document.addEventListener("keydown", onDocumentKeyDown, false);
    function onDocumentKeyDown(event) {
      var keyCode = event.which;
      if (keyCode == 37) {
          ship.position.z += zSpeed;
      } else if (keyCode == 39) {
          ship.position.z -= zSpeed;
      } else if (keyCode == 40) {
          ship.position.x += xSpeed;
      } else if (keyCode == 38) {
          ship.position.x -= xSpeed;
      }
      render();
    }
  });

  var wallGeo = new THREE.BoxGeometry( 50, 50, 50 );
  var wallLoader = new THREE.ObjectLoader();
  wallLoader.load('models/wall.json', function(wall) {
    wall.scale.x = wall.scale.y = wall.scale.z = 15;
    wall.position.x = -300;
    wall.position.y = 0;
    wall.position.z = 500;
    wall.rotation.y = -1 *(Math.PI / 2);
    wall.translation = wallGeo.center(wallGeo);
  scene.add(wall);
});


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

function render() {
  // unset this for rotating camera
  var timer = Date.now() * 0.0001;
  camera.position.x = Math.cos(timer) * 800;
  camera.position.z = Math.sin(timer) * 800;
  camera.lookAt( scene.position );
  renderer.render( scene, camera );
}
