

  var renderer,
      camera,
      scene,
      annie,
      myCanvas = document.getElementById('myCanvas');
      var clock = new THREE.Clock();
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

  var geometry = new THREE.BoxGeometry(500,300, 100);
  var material1 = new THREE.MeshLambertMaterial({color: 0xF3FFE2});
  var mesh1 = new THREE.Mesh(geometry, material1);
  mesh1.position.set(-100, 100, -1000);


  // var material = new THREE.MeshLambertMaterial({color: 0xf3ffe2});
  // var mesh = new THREE.Mesh(geometry, material);
  // mesh.position.set(0, 0, -1000);
  scene.add(mesh);



////////////////////Sprite



// Sprite material

var material = new THREE.SpriteMaterial({
  map: new THREE.TextureLoader().load("brwnbot.png"),

});
var mesh = new THREE.Sprite(material);
mesh.scale.set(200, 100, 100);
mesh.position.z = -1000;
mesh.position.y = 225;
mesh.position.x = 225;
scene.add(mesh, mesh1);

mesh1.rotation.x = 2.25;
  myCanvas.innerHTML = mesh1.rotation.y;
  // console.log(mesh.position.z, mesh.position.y, mesh.position.x);
  // console.log(mesh1.position.z, mesh1.position.y, mesh1.position.x);
 // var delta = 0;
  //RENDER LOOP
  var xSpeed = 50;
  var ySpeed = 50;

document.addEventListener("keydown", onDocumentKeyDown, false);
function onDocumentKeyDown(event) {
    var keyCode = event.which;
    if (keyCode == 38) {
        mesh.position.y += ySpeed;
        mesh.position.z -= ySpeed;
    } else if (keyCode == 40) {
        mesh.position.z += ySpeed;
        mesh.position.y -= ySpeed;
    } else if (keyCode == 39) {
        mesh.position.x += xSpeed;
        material = new THREE.SpriteMaterial({
          map: new THREE.TextureLoader().load("three/brwnbot.png"),
          // color: 0xF3FFE2
        });
    } else if (keyCode == 37) {
        mesh.position.x -= xSpeed;
    }
        render();
}

function animate()
{
    requestAnimationFrame( animate );
	render();
	update();
}

function update()
{
	
	annie.update(1000 * delta);

}

  requestAnimationFrame(render);
  function render() {
    animate();

    // material.map.needsUpdate = true;
    // material.displacementScale = 200;
    // material.displacementMap.needsUpdate = true;
     // delta += 0.01;
    // material.rotation.x +=  Math.PI / 100;
    // mesh1.rotation.x += 0.025;

    // console.log(mesh.position.z, mesh.position.y, mesh.position.x);
    // console.log(mesh1.position.z, mesh1.position.y, mesh1.position.x);
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }

  function TextureAnimator(texture, tilesHoriz, tilesVert, numTiles, tileDispDuration){
	// note: texture passed by reference, will be updated by the update function.

	this.tilesHorizontal = tilesHoriz;
	this.tilesVertical = tilesVert;
	// how many images does this spritesheet contain?
	//  usually equals tilesHoriz * tilesVert, but not necessarily,
	//  if there at blank tiles at the bottom of the spritesheet.
	this.numberOfTiles = numTiles;
	texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
	texture.repeat.set( 1 / this.tilesHorizontal, 1 / this.tilesVertical );
	// how long should each image be displayed?
	this.tileDisplayDuration = tileDispDuration;
	// how long has the current image been displayed?
	this.currentDisplayTime = 0;
	// which image is currently being displayed?
	this.currentTile = 0;

	this.update = function( milliSec )
	{
		this.currentDisplayTime += milliSec;
		while (this.currentDisplayTime > this.tileDisplayDuration)
		{
			this.currentDisplayTime -= this.tileDisplayDuration;
			this.currentTile++;
			if (this.currentTile == this.numberOfTiles)
				this.currentTile = 0;
			var currentColumn = this.currentTile % this.tilesHorizontal;
			texture.offset.x = currentColumn / this.tilesHorizontal;
			var currentRow = Math.floor( this.currentTile / this.tilesHorizontal );
			texture.offset.y = currentRow / this.tilesVertical;
		}
	};
}
