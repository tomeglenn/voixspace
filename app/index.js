import MessageComponent from './components/message';
import PostComponent from './components/post';

var mouseX = 0;
var mouseY = 0;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

var radius = 100, theta = 0;

var nodes = [];
var boids = [];
var boid;
var selectedNode;

export default class App {
    constructor() {

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color( 0x242038 );
    this.scene.add( new THREE.AmbientLight( 0xffffff, 0.3 ) );

    this.camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 1000 );
    this.camera.position.x = 0;
    this.camera.position.z = 5;

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    var windowResize = new THREEx.WindowResize(this.renderer, this.camera);

    this.messageComponent = new MessageComponent();
    this.postComponent = new PostComponent();
  }

  setBoidPosition(boid){
          boid.position.x = Math.random() * 400 - 200;
          boid.position.y = Math.random() * 400 - 200;
          boid.position.z = Math.random() * 400 - 200;
          boid.velocity.x = Math.random() * 2 - 1;
          boid.velocity.y = Math.random() * 2 - 1;
          boid.velocity.z = Math.random() * 2 - 1;
    }

  setMeshState(mesh, isActive){
    if(isActive){
      mesh.material.wireframe = false;
      mesh.material.transparent = true;
      mesh.material.opacity = 0.5;
      mesh.geometry = new THREE.TorusKnotGeometry( 5, 5, 5, 2 );

      selectedNode = mesh;
    }
    else{
      mesh.material.wireframe = true;
      mesh.material.transparent = false;
      mesh.material.opacity = 1;
      var size = (Math.random() * (5.0 - 2.0) + 2.0).toFixed(4);
      mesh.geometry = new THREE.SphereGeometry(size, 6, 6);

      selectedNode = null;
    }
  }

  addStars(){
    var geometry = new THREE.SphereBufferGeometry( 0.2, 64, 32 );
    var material = new THREE.MeshBasicMaterial( { color: 0xb7adcf, } );
    var stars = [];
    for(var i=0; i<300; i++){

      var star = new THREE.Mesh( geometry, material );
      star.position.x = Math.random() * 360 - 180;
      star.position.y = Math.random() * 360 - 180;
      star.position.z = Math.random() * 360 - 180;
      star.scale.x = star.scale.y = star.scale.z = Math.random() * 3 + 1;

      this.scene.add( star );
      stars[i] = star;
    }
  }

  addNodes(){
    var colors = [
      0x4d65a7,
      0x71a097,
      0xd2b68b,
      0xc27b79,
      0xb34849
    ];

    for ( var i = 0; i < 150; i ++ ) {
        boid = boids[ i ] = new Boid();
        this.setBoidPosition(boid);
        boid.setAvoidWalls( true );
        boid.setWorldSize( 500, 500, 400 );

        var size = (Math.random() * (5.0 - 2.0) + 2.0).toFixed(4);
        var color = colors[Math.floor(Math.random() * colors.length)];
        var geometry = new THREE.SphereGeometry(size, 6, 6);
        var material = new THREE.MeshBasicMaterial({ color: color, side: THREE.DoubleSide, wireframe: true });

        var node = nodes[ i ] = new THREE.Mesh(geometry, material);
        this.scene.add(node);
        this.registerDomEvents(node);
      }
  }

  render(){
      requestAnimationFrame(this.render.bind(this));

      if(selectedNode == null){
        theta += 0.01;
        this.camera.position.x = radius * Math.sin( THREE.Math.degToRad( theta ) );
        this.camera.position.y = radius * Math.sin( THREE.Math.degToRad( theta ) );
        this.camera.position.z = radius * Math.cos( THREE.Math.degToRad( theta ) );
      }

      for ( var i = 0, il = nodes.length; i < il; i++ ) {
          var node = nodes[ i ];
          if(node !== selectedNode)
          {
            boid = boids[ i ];
            boid.run( boids );
            node.position.copy( boids[ i ].position );
            node.rotation.x += 0.01;
            node.rotation.y += 0.005;
          }
      }

      this.renderer.render(this.scene, this.camera);
  }

  addToDom() {
    document.body.appendChild(this.renderer.domElement);
  }

  registerDomEvents(mesh) {
    var domEvents = new THREEx.DomEvents(this.camera, this.renderer.domElement);
    domEvents.addEventListener(mesh, 'click', function (event) {
      mesh.material.transparent = true;
      mesh.material.opacity = 0;
      for(var i = 0; i < nodes.length; i++){
        if(nodes[i] == selectedNode)
        {
          this.setBoidPosition(boids[i]);
        }
      }
      this.setMeshState(mesh, false);
      this.messageComponent.show();
    }.bind(this));

    domEvents.addEventListener(mesh, 'mouseover', function (event) {
      this.setMeshState(mesh, true);
    }.bind(this));

    domEvents.addEventListener(mesh, 'mouseout', function (event) {
      this.setMeshState(mesh, false);
    }.bind(this));
  }

  registerPostButtonDomEvent() {
    document.getElementById('postButton').addEventListener('click', function (event) {
      this.postComponent.show();
    }.bind(this));
  }

  init() {
    this.registerPostButtonDomEvent();

    this.addStars();
    this.addNodes();
    this.addToDom();
    this.render();
  }
}

window.onload = function() {
  var app = new App();
  app.init();
};
