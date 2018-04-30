

  var renderer,
      camera,
      scene,
      myCanvas = document.getElementById('myCanvas');
  //RENDERER
  renderer = new THREE.WebGLRenderer({canvas: myCanvas});
  renderer.setClearColor(0x000000);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);

  //CAMERA
  camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 3000);

  //SCENE
  scene = new THREE.Scene();

  //LIGHTS
  var light = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(light);

  var light2 = new THREE.PointLight(0xffffff, 0.5);
  scene.add(light2);

  // var geometry = new THREE.BoxGeometry(100, 100, 100);

  var geometry = new THREE.BoxGeometry(100, 100, 100);
  var material1 = new THREE.MeshLambertMaterial({color: 0xF3FFE2});
  var mesh1 = new THREE.Mesh(geometry, material1);
  mesh1.position.set(100, 100, -1000);


  // var material = new THREE.MeshLambertMaterial({color: 0xf3ffe2});
  // var mesh = new THREE.Mesh(geometry, material);
  // mesh.position.set(0, 0, -1000);
  // scene.add(mesh);



////////////////////Sprite

// Sprite material
var material = new THREE.SpriteMaterial({
  map: new THREE.TextureLoader().load("brwnbot.png"),
  // color: 0xF3FFE2
});
var mesh = new THREE.Sprite(material);
mesh.scale.set(100, 100, 100);
mesh.position.z = -1000;
scene.add(mesh, mesh1);

 // var delta = 0;
  //RENDER LOOP
  requestAnimationFrame(render);
  function render() {
     // delta += 0.01;
    material.rotation.x +=  Math.PI / 100;
    mesh1.rotation.x += 0.025;
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }
