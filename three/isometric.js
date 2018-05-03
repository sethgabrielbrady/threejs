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
				// var gridHelper = new THREE.GridHelper(1200, 12);
				// scene.add( gridHelper );

				// Cubes
				var geometry = new THREE.BoxGeometry( 50, 50, 50 );
				// var material = new THREE.MeshLambertMaterial( { color: 0xffffff, overdraw: 0.5 } );
        // var material = new THREE.MeshLambertMaterial( { color: 0xff0000} );


          //add random cubes to populate the grid
    			// for ( var i = 0; i < 10; i ++ ) {
          //
    			// 	var cube = new THREE.Mesh( geometry, material );
    			// 	cube.scale.y = Math.floor( Math.random() * 2 + 1 );
    			// 	cube.position.x = Math.floor( ( Math.random() * 1000 - 500 ) / 50 ) * 50 + 25;
    			// 	cube.position.y = ( cube.scale.y * 50 ) / 2;
    			// 	cube.position.z = Math.floor( ( Math.random() * 1000 - 500 ) / 50 ) * 50 + 25;
    			// 	scene.add( cube );
          //
    			// }

					// var cube = new THREE.Mesh( geometry, material);
					// cube.scale.y = Math.floor( Math.random() * 2 + 1 );
					// cube.position.x = Math.floor( ( Math.random() * 1000 - 500 ) / 50 ) * 50 + 25;
					// cube.position.y = ( cube.scale.y * 50 ) / 2;
					// cube.position.z = Math.floor( ( Math.random() * 1000 - 500 ) / 50 ) * 50 + 25;
					// scene.add( cube );



              var loader = new THREE.JSONLoader();
              loader.load('three/keeperold.json', function(geometry, materials) {
                  mesh = new THREE.Mesh(geometry, materials);
                  mesh.scale.x = mesh.scale.y = mesh.scale.z = 5;
                  mesh.position.x = Math.floor( ( Math.random() * 1000 - 500 ) / 50 ) * 50 + 25;
        					mesh.position.y = ( mesh.scale.y * 50 ) / 2;
        					mesh.position.z = Math.floor( ( Math.random() * 1000 - 500 ) / 50 ) * 50 + 25;
                  mesh.translation = geometry.center(geometry);
                  scene.add(mesh);
              });



          // movement
          var xSpeed = 50;
          var zSpeed = 50;
          document.addEventListener("keydown", onDocumentKeyDown, false);
          function onDocumentKeyDown(event) {
            var keyCode = event.which;
            if (keyCode == 37) {
                mesh.position.z += zSpeed;
            } else if (keyCode == 39) {
                mesh.position.z -= zSpeed;
            } else if (keyCode == 40) {
                mesh.position.x += xSpeed;
            } else if (keyCode == 38) {
                mesh.position.x -= xSpeed;
            }
            render();
          }

				// Lights

				var ambientLight = new THREE.AmbientLight( Math.random() * 0x10 );
				scene.add( ambientLight );

				var directionalLight = new THREE.DirectionalLight( Math.random() * 0xffffff );
				directionalLight.position.x = Math.random() - 0.5;
				directionalLight.position.y = Math.random() - 0.5;
				directionalLight.position.z = Math.random() - 0.5;
				directionalLight.position.normalize();
				scene.add( directionalLight );

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
      // camera.position.x = Math.cos(100) * 400;
      // camera.position.z = Math.sin(100) * 400;

			function render() {
        // unset this for rotating camera
				var timer = Date.now() * 0.0001;
				camera.position.x = Math.cos(timer) * 800;
				camera.position.z = Math.sin(timer) * 800;

				camera.lookAt( scene.position );
				renderer.render( scene, camera );
			}
