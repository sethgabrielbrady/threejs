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
  var geometry = new THREE.BoxGeometry( 50, 50, 50 );

  var loader = new THREE.ObjectLoader();
  loader.load('models/shard-ship.json', function(obj) {
    obj.scale.x = obj.scale.y = obj.scale.z = 20;
    obj.position.x = 500;
    obj.position.y = 0;
    obj.position.z = 20;
    obj.rotation.y = -1 *(Math.PI / 2);
    obj.translation = geometry.center(geometry);
    scene.add(obj);

    // movement - should seperate into another function and call inside object loader
    var xSpeed = 50;
    var zSpeed = 50;
    document.addEventListener("keydown", onDocumentKeyDown, false);
    function onDocumentKeyDown(event) {
      var keyCode = event.which;
      if (keyCode == 37) {
          obj.position.z += zSpeed;
      } else if (keyCode == 39) {
          obj.position.z -= zSpeed;
      } else if (keyCode == 40) {
          obj.position.x += xSpeed;
      } else if (keyCode == 38) {
          obj.position.x -= xSpeed;
      }
      render();
    }
  });


  // Lights

  var ambientLight = new THREE.AmbientLight( 0xf03ff0 );
  scene.add( ambientLight );

  // var directionalLight = new THREE.DirectionalLight( 0xffffff );
  // directionalLight.position.x = 0.5;
  // directionalLight.position.y = 0.5;
  // directionalLight.position.z = 0.5;
  // scene.add( directionalLight );

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
  // var timer = Date.now() * 0.0001;
  // camera.position.x = Math.cos(timer) * 800;
  // camera.position.z = Math.sin(timer) * 800;
  camera.lookAt( scene.position );
  renderer.render( scene, camera );
}
