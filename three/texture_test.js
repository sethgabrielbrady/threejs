/*
	Three.js "tutorials by example"
	Author: Lee Stemkoski
	Date: July 2013 (three.js v59dev)
*/
// MAIN
// standard global variables
var container, scene, camera, renderer, controls, stats;
var clock = new THREE.Clock();
// custom global variables
var annie, boomer; // animators
init();
animate();
// FUNCTIONS
function init()
{
	// SCENE
	scene = new THREE.Scene();
	// CAMERA
	var SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight;
	var VIEW_ANGLE = 45, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 0.1, FAR = 20000;
	camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR);
	scene.add(camera);
	camera.position.set(0,150,400);
	camera.lookAt(scene.position);
	// RENDERER

	renderer = new THREE.WebGLRenderer( {antialias:true} );

	renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
	container = document.getElementById( 'ThreeJS' );
	// container.appendChild( renderer.domElement );

	// LIGHT
	var light = new THREE.PointLight(0xffffff);
	light.position.set(0,250,0);
	scene.add(light);
	// FLOOR


	////////////
	// CUSTOM //
	////////////

	// MESHES WITH ANIMATED TEXTURES!

	var runnerTexture = new THREE.TextureLoader().load( 'textures/player_0/e.png' );
	annie = new TextureAnimator( runnerTexture, 10, 1, 10, 75 ); // texture, #horiz, #vert, #total, duration.
	var runnerMaterial = new THREE.MeshBasicMaterial( { map: runnerTexture, side:THREE.DoubleSide } );
	var runnerGeometry = new THREE.PlaneGeometry(50, 50, 1, 1);
	var runner = new THREE.Mesh(runnerGeometry, runnerMaterial);
	runner.position.set(-1000,25,0);
	scene.add(runner);
}

function animate()
{
    requestAnimationFrame( animate );
	render();
	update();
}
function update()
{
	var delta = clock.getDelta();
	annie.update(1000 * delta);

}
function render()
{
	renderer.render( scene, camera );
}

function TextureAnimator(texture, tilesHoriz, tilesVert, numTiles, tileDispDuration)
{
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
