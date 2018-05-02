      let container, stats;
			let camera, scene, renderer;
			let frustumSize = 1000;

      let playing = false;
      let audio = document.getElementById('myAudio');
      let parent = document.getElementById('bar_test');
      let test_node = document.getElementById('test_node');
      let node;
      let nodeCount = 128;
        let frequencyData;
        let cube;


      function play() {
        let ctx = new AudioContext();
        let audioSrc = ctx.createMediaElementSource(audio);
        let analyser = ctx.createAnalyser();
        audioSrc.connect(analyser);
        audioSrc.connect(ctx.destination);
        frequencyData = new Uint8Array(analyser.frequencyBinCount);

        function renderFrame() {
           requestAnimationFrame(renderFrame);
           analyser.getByteFrequencyData(frequencyData);
        }

        audio.play();
        playing = true;
        renderFrame();



			init();
			animate();

			function init() {

				container = document.createElement( 'div' );
				document.body.appendChild( container );

				let aspect = window.innerWidth / window.innerHeight;
				camera = new THREE.OrthographicCamera( frustumSize * aspect / - 2, frustumSize * aspect / 2, frustumSize / 2, frustumSize / - 2, 1, 2000 );
				camera.position.y = 400;

				scene = new THREE.Scene();
				scene.background = new THREE.Color( 0xf0f0f0 );

				// Grid
				let gridHelper = new THREE.GridHelper(1200, 12);
				scene.add( gridHelper );

				// Cubes
				let geometry = new THREE.BoxGeometry( 50, 50, 50 );
				let material = new THREE.MeshLambertMaterial( { color: 0xffffff, overdraw: 0.5 } );

          // add random cubes to populate the grid
    			for ( let i = 0; i < nodeCount; i ++ ) {
    				cube = new THREE.Mesh( geometry, material );
            console.log(cube.id);
    				cube.scale.y = Math.floor( Math.random() * 2 + 1 );
    				cube.position.x = Math.floor( ( Math.random() * 1000 - 500 ) / 50 ) * 50 + 25;
    				cube.position.y = ( cube.scale.y * 50 ) / 2;
    				cube.position.z = Math.floor( ( Math.random() * 1000 - 500 ) / 50 ) * 50 + 25;
    				scene.add( cube );

    			}

					// let cube = new THREE.Mesh( geometry, material);
					// cube.scale.y = Math.floor( Math.random() * 2 + 1 );
					// cube.position.x = Math.floor( ( Math.random() * 1000 - 500 ) / 50 ) * 50 + 25;
					// cube.position.y = ( cube.scale.y * 50 ) / 2;
					// cube.position.z = Math.floor( ( Math.random() * 1000 - 500 ) / 50 ) * 50 + 25;
					// scene.add( cube );


          // movement
          // let xSpeed = 50;
          // let zSpeed = 50;
          // document.addEventListener("keydown", onDocumentKeyDown, false);
          // function onDocumentKeyDown(event) {
          //   let keyCode = event.which;
          //   if (keyCode == 37) {
          //       cube.position.z += zSpeed;
          //   } else if (keyCode == 39) {
          //       cube.position.z -= zSpeed;
          //   } else if (keyCode == 40) {
          //       cube.position.x += xSpeed;
          //   } else if (keyCode == 38) {
          //       cube.position.x -= xSpeed;
          //   }
          //   render();
          // }


				// Lights
				let ambientLight = new THREE.AmbientLight( Math.random() * 0x10 );
				scene.add( ambientLight );

				let directionalLight = new THREE.DirectionalLight( Math.random() * 0xffffff );
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
				let aspect = window.innerWidth / window.innerHeight;
				camera.left   = - frustumSize * aspect / 2;
				camera.right  =   frustumSize * aspect / 2;
				camera.top    =   frustumSize / 2;
				camera.bottom = - frustumSize / 2;
				camera.updateProjectionMatrix();
				renderer.setSize( window.innerWidth, window.innerHeight );
			}

			function animate() {
        // renderFrame();
        for ( let i = 1; i < nodeCount; i ++ ) {
        let ival = i +5;
        let cubeI = ival;
        cubeI = scene.getObjectById(  ival, true );
        cubeI.position.y = (frequencyData[ival]);
        }

        // console.log(cube.position.y);
				requestAnimationFrame( animate );
				render();
			}

      // set this for fixed camera
      // camera.position.x = Math.cos(100) * 400;
      // camera.position.z = Math.sin(100) * 400;

			function render() {
        // unset this for rotating camera
				let timer = Date.now() * 0.0001;
				camera.position.x = Math.cos(timer) * 800;
				camera.position.z = Math.sin(timer) * 800;
				camera.lookAt( scene.position );
				renderer.render( scene, camera );
			}
}
