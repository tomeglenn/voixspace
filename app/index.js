import ApiResource from './apiResource'
import axios from 'axios';

export class App {
  constructor() {
    this.apiResource = new ApiResource();

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize( window.innerWidth, window.innerHeight );

    this.camera.position.z = 5;
  }

  addCube() {
    var geometry = new THREE.BoxGeometry(1, 1, 1);
    var material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
    this.cube = new THREE.Mesh(geometry, material);
    this.scene.add(this.cube);
  }

  render() {
    requestAnimationFrame(this.render.bind(this));

    this.cube.rotation.x = Date.now() * 0.0005;
    this.cube.rotation.y = Date.now() * 0.0001;

    this.renderer.render(this.scene, this.camera);
  }

  addToDom() {
    document.body.appendChild(this.renderer.domElement);
  }

  registerDomEvents() {
    var domEvents = new THREEx.DomEvents(this.camera, this.renderer.domElement);
    domEvents.addEventListener(this.cube, 'click', function (event) {
      event.target.material.color.setHex(0x0000ff);
      this.apiResource.get();
    }.bind(this));
  }

  init() {
    this.addCube();
    this.addToDom();
    this.registerDomEvents();
    this.render();
  }
}

window.onload = function() {
  var app = new App();
  app.init();
};
