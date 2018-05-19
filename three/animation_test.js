var container, stats;
var camera, scene, renderer;
var frustumSize = 1000;
var textureLoader = new THREE.TextureLoader();
var texture, texture1;
var annie;
var clock = new THREE.Clock();
var frame = 0;
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

  //  3d model with movement
  // var textureTestGeo = new THREE.BoxGeometry( 50, 50, 50 );
  // var textureTestLoader = new THREE.ObjectLoader();
  // textureTestLoader.load('models/keeperWalking.json', function(textureTest) {
  //
  //   textureTest.scale.x = textureTest.scale.y = textureTest.scale.z = 1000;
  //   textureTest.position.x = 0;
  //   textureTest.position.y = 0;
  //   textureTest.position.z = 20;
  //   textureTest.rotation.y = -1 *(Math.PI / 2);
  //   textureTest.translation = textureTestGeo.center(textureTestGeo);
  //   scene.add(textureTest);
  //
  //   // movement - should seperate into another function and call inside object loader
  //   var xSpeed = 50;
  //   var zSpeed = 50;
  //   document.addEventListener("keydown", onDocumentKeyDown, false);
  //   function onDocumentKeyDown(event) {
  //     var keyCode = event.which;
  //     if (keyCode == 37) {
  //         textureTest.position.z += zSpeed;
  //     } else if (keyCode == 39) {
  //         textureTest.position.z -= zSpeed;
  //     } else if (keyCode == 40) {
  //         textureTest.position.x += xSpeed;
  //     } else if (keyCode == 38) {
  //         textureTest.position.x -= xSpeed;
  //     }
  //     render();
  //   }
  // });


  // PNG Sprites
  // texture3 = textureLoader.load( 'three/kiss.png' );
  // 				texture3.wrapS = THREE.ClampToEdgeWrapping;
  // 				texture3.wrapT = THREE.ClampToEdgeWrapping;
  // 					var material = new THREE.SpriteMaterial( { map: texture3 } );
  // 					// material.rotation = 2 * Math.PI * ( Math.random() - 0.5 );
  // 					var sprite = new THREE.Sprite( material );
  // 					// sprite.position.x = Math.random() * 1000 - 500;
  // 					// sprite.position.y = Math.random() * 1000 - 500;
  // 					// sprite.position.z = Math.random() * 1000 - 500;
  //           sprite.position.x = 0;
  // 					sprite.position.y = 20;
  // 					sprite.position.z = 0;
  // 					sprite.scale.set( 128, 128, 1 );
  // 					scene.add( sprite );

  // SPRITES - from Sprite Sheet
				// texture1 = textureLoader.load( 'three/e.png', function() {
        //   annie = new TextureAnimator( texture1, 4, 1, 4, 75 ); // texture, #horiz, #vert, #total, duration.
				// 	texture1.wrapS = THREE.ClampToEdgeWrapping;
				// 	texture1.wrapT = THREE.ClampToEdgeWrapping;
				// 		var tex = texture1.clone();
				// 		tex.needsUpdate = true; // cloning does not set this
				// 		// tex.offset.x = 0.1 * ( 1, 1 );
				// 		// tex.offset.y = 0.1 * ( 1, 4 );
				// 		// tex.repeat.x = 0.1 * ( 0, 4 );
				// 		// tex.repeat.y = 0.1 * ( 1, 1 );
        //     // tex.offset.x = 2;
				// 		// tex.offset.y = 2;
				// 		// tex.repeat.x = 3;
				// 		// tex.repeat.y = 3;
				// 		var material = new THREE.SpriteMaterial( { map: tex } );
				// 		// material.rotation = 0.5 * Math.PI * ( Math.random() - 0.5 );
				// 		var sprite = new THREE.Sprite( material );
				// 		sprite.position.x = 0;
				// 		sprite.position.y = 160;
				// 		sprite.position.z = 0;
				// 		sprite.scale.set( 256, 256, 1 );
        //
				// 		scene.add( sprite );
				// } );


        texture1 = new THREE.TextureLoader().load( 'textures/player_0/sw.png' );
        // materialArray.push(new THREE.MeshBasicMaterial({ map: THREE.ImageUtils.loadTexture('img/s2.png'), opacity: 0.9, color: 0xFF0000 }));

      	annie = new TextureAnimator( texture1, 4, 1, 4, 200 ); // texture, #horiz, #vert, #total, duration.
      	var runnerMaterial = new THREE.MeshBasicMaterial( { map: texture1, side:THREE.DoubleSide,  transparent: true } );
      	var runnerGeometry = new THREE.PlaneGeometry(200, 200, 1, 1);
      	var runner = new THREE.Mesh(runnerGeometry, runnerMaterial);
        runner.rotation.set(-.15,-4,0); //use this to set the correct orientation of the texture - XYZ
      	runner.position.set(0,200,0);

      	scene.add(runner);


  // Lights
  // var ambientLight = new THREE.AmbientLight( 0xffffff, 0.75 );
  // scene.add( ambientLight );
  // var light2 = new THREE.PointLight(0xffffff, 1);
  // scene.add(light2);

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
  update();
}

// set this for fixed camera
camera.position.x = Math.cos(100) * 400;
camera.position.z = Math.sin(100) * 400;

function update(){
	var delta = clock.getDelta();
	annie.update(1000 * delta);
}



function render() {

  // var timer = Date.now() * 0.0001;
  // camera.position.x = Math.cos(timer) * 800;
  // camera.position.z = Math.sin(timer) * 800;

  camera.lookAt( scene.position );
  renderer.render( scene, camera );
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

    this.update = function( milliSec ){
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
