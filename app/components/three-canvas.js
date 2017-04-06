import ApiResource from '../resources/api';

export default class ThreeCanvas {
  
  constructor() {

    var mouseX = 0;
    var mouseY = 0;
    var windowHalfX = window.innerWidth / 2;
    var windowHalfY = window.innerHeight / 2;

    var radius = 100, theta = 0;

    var birds = [];
    var boids = [];
    var boid;
    
    this.apiResource = new ApiResource();

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color( 0x0F6A7A );
    this.scene.add( new THREE.AmbientLight( 0xffffff, 0.3 ) );

    this.camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 1000 );
    this.camera.position.x = 0;
    this.camera.position.z = -5;
    
    this.controls = new THREE.TrackballControls(this.camera);
    this.controls.rotateSpeed = 10.0;
    this.controls.zoomSpeed = 10;
    this.controls.noZoom = false;
    this.controls.noPan = true;
    this.controls.staticMoving = true;
    this.controls.dynamicDampingFactor = 1;
    this.controls.keys = [ 65, 83, 68 ];

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize( window.innerWidth, window.innerHeight );
  }

  addStars(){
    var stars = [];
    var geometry = new THREE.SphereBufferGeometry( 0.2, 64, 32 );
    var material = new THREE.MeshBasicMaterial( { color: 0x32A188, wireframe: true } );
    
    for(var i=0; i<1000; i++){
      var star = new THREE.Mesh( geometry, material );
      star.position.x = Math.random() * 360 - 180;
      star.position.y = Math.random() * 360 - 180;
      star.position.z = Math.random() * 360 - 180;
      star.scale.x = star.scale.y = star.scale.z = Math.random() * 3 + 1;

      this.scene.add( star );
      stars[i] = star;
    }
  }

  addBirds(){
    for ( var i = 0; i < 200; i ++ ) {
        boid = boids[ i ] = new Boid();
        boid.position.x = Math.random() * 400 - 200;
        boid.position.y = Math.random() * 400 - 200;
        boid.position.z = Math.random() * 400 - 200;
        boid.velocity.x = Math.random() * 2 - 1;
        boid.velocity.y = Math.random() * 2 - 1;
        boid.velocity.z = Math.random() * 2 - 1;
        boid.setAvoidWalls( true );
        boid.setWorldSize( 500, 500, 400 );
        var bird = birds[ i ] = new THREE.Mesh( new Bird(), new THREE.MeshBasicMaterial( { color:Math.random() * 0xffffff, side: THREE.DoubleSide } ) );
        bird.phase = Math.floor( Math.random() * 62.83 );
        this.scene.add( bird );
      }
  }

  animate(){
      // CAMERA DRAG
      requestAnimationFrame( this.animate.bind(this) );
      this.controls.update();
      
      this.renderer.render(this.scene, this.camera);

      // CAMERA SPAN
      theta += 0.01;
      this.camera.position.x = radius * Math.sin( THREE.Math.degToRad( theta ) );
      this.camera.position.y = radius * Math.sin( THREE.Math.degToRad( theta ) );
      this.camera.position.z = radius * Math.cos( THREE.Math.degToRad( theta ) );
      
      // ANIMATE BIRDS
      for ( var i = 0, il = birds.length; i < il; i++ ) {
          boid = boids[ i ];
          boid.run( boids );
          var bird = birds[ i ];
          bird.position.copy( boids[ i ].position );
          var color = bird.material.color;
          color.r = color.g = color.b = ( 500 - bird.position.z ) / 1000;
          bird.rotation.y = Math.atan2( - boid.velocity.z, boid.velocity.x );
          bird.rotation.z = Math.asin( boid.velocity.y / boid.velocity.length() );
          bird.phase = ( bird.phase + ( Math.max( 0, bird.rotation.z ) + 0.1 )  ) % 62.83;
          bird.geometry.vertices[ 5 ].y = bird.geometry.vertices[ 4 ].y = Math.sin( bird.phase ) * 5;
      }
  }

  addToDom() {
    document.body.appendChild(this.renderer.domElement);
  }

  registerDomEvents() {
    var domEvents = new THREEx.DomEvents(this.camera, this.renderer.domElement);
    domEvents.addEventListener(this.star, 'click', function (event) {
      event.target.material.color.setHex(0x0000ff);
      this.apiResource.get();
    }.bind(this));
  }

  init() {
    this.addStars();
    this.addBirds();  
    this.addToDom();
    this.animate();
    // this.registerDomEvents();
  }
}
