      var container, stats;
			var camera, scene, renderer;
			var frustumSize = 1000;

			init();
			animate();

			function init() {

				container = document.createElement( 'div' );
				document.body.appendChild( container );

				var info = document.createElement( 'div' );
				info.style.position = 'absolute';
				info.style.top = '10px';
				info.style.width = '100%';
				info.style.textAlign = 'center';
				info.innerHTML = '<a href="http://threejs.org" target="_blank" rel="noopener">three.js</a> - orthographic view';
				container.appendChild( info );

				var aspect = window.innerWidth / window.innerHeight;
				camera = new THREE.OrthographicCamera( frustumSize * aspect / - 2, frustumSize * aspect / 2, frustumSize / 2, frustumSize / - 2, 1, 2000 );
				camera.position.y = 400;

				scene = new THREE.Scene();
				scene.background = new THREE.Color( 0xf0f0f0 );

				// Grid

				var gridHelper = new THREE.GridHelper( 1000, 20 );
				scene.add( gridHelper );

				// Cubes

				var geometry = new THREE.BoxGeometry( 50, 50, 50 );
				var material = new THREE.MeshLambertMaterial( { color: 0xffffff, overdraw: 0.5 } );

				for ( var i = 0; i < 100; i ++ ) {

					var cube = new THREE.Mesh( geometry, material );

					cube.scale.y = Math.floor( Math.random() * 2 + 1 );

					cube.position.x = Math.floor( ( Math.random() * 1000 - 500 ) / 50 ) * 50 + 25;
					cube.position.y = ( cube.scale.y * 50 ) / 2;
					cube.position.z = Math.floor( ( Math.random() * 1000 - 500 ) / 50 ) * 50 + 25;

					scene.add( cube );

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

				var directionalLight = new THREE.DirectionalLight( Math.random() * 0xffffff );
				directionalLight.position.x = Math.random() - 0.5;
				directionalLight.position.y = Math.random() - 0.5;
				directionalLight.position.z = Math.random() - 0.5;
				directionalLight.position.normalize();
				scene.add( directionalLight );

				renderer = new THREE.CanvasRenderer();
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				container.appendChild( renderer.domElement );

				stats = new Stats();
				container.appendChild( stats.dom );

				//

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

			//

			function animate() {

				requestAnimationFrame( animate );

				stats.begin();
				render();
				stats.end();

			}

			function render() {

				var timer = Date.now() * 0.0001;

				camera.position.x = Math.cos( timer ) * 800;
				camera.position.z = Math.sin( timer ) * 800;
				camera.lookAt( scene.position );

				renderer.render( scene, camera );

			}
