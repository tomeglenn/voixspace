/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 108);
/******/ })
/************************************************************************/
/******/ ({

/***/ 108:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var mouseX = 0;
var mouseY = 0;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

var radius = 100,
    theta = 0;

var birds = [];
var boids = [];
var boid;

var App = function () {
  function App() {
    _classCallCheck(this, App);

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x0F6A7A);
    this.scene.add(new THREE.AmbientLight(0xffffff, 0.3));

    this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
    this.camera.position.x = 0;
    this.camera.position.z = -5;

    // this.controls = new THREE.TrackballControls(this.camera);
    // this.controls.rotateSpeed = 10.0;
    // this.controls.zoomSpeed = 10;
    // this.controls.noZoom = false;
    // this.controls.noPan = true;
    // this.controls.staticMoving = true;
    // this.controls.dynamicDampingFactor = 1;
    // this.controls.keys = [ 65, 83, 68 ];

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  _createClass(App, [{
    key: "addStars",
    value: function addStars() {
      var stars = [];
      var geometry = new THREE.SphereBufferGeometry(0.2, 64, 32);
      var material = new THREE.MeshBasicMaterial({ color: 0x32A188, wireframe: true });

      for (var i = 0; i < 1000; i++) {
        var star = new THREE.Mesh(geometry, material);
        star.position.x = Math.random() * 360 - 180;
        star.position.y = Math.random() * 360 - 180;
        star.position.z = Math.random() * 360 - 180;
        star.scale.x = star.scale.y = star.scale.z = Math.random() * 3 + 1;

        this.scene.add(star);
        stars[i] = star;
      }
    }
  }, {
    key: "addBirds",
    value: function addBirds() {
      for (var i = 0; i < 200; i++) {
        boid = boids[i] = new Boid();
        boid.position.x = Math.random() * 400 - 200;
        boid.position.y = Math.random() * 400 - 200;
        boid.position.z = Math.random() * 400 - 200;
        boid.velocity.x = Math.random() * 2 - 1;
        boid.velocity.y = Math.random() * 2 - 1;
        boid.velocity.z = Math.random() * 2 - 1;
        boid.setAvoidWalls(true);
        boid.setWorldSize(500, 500, 400);
        var bird = birds[i] = new THREE.Mesh(new Bird(), new THREE.MeshBasicMaterial({ color: Math.random() * 0xffffff, side: THREE.DoubleSide }));
        bird.phase = Math.floor(Math.random() * 62.83);
        this.scene.add(bird);
      }
    }
  }, {
    key: "animate",
    value: function animate() {
      // CAMERA DRAG
      requestAnimationFrame(this.animate.bind(this));
      // this.controls.update();

      this.renderer.render(this.scene, this.camera);

      // CAMERA SPAN
      theta += 0.01;
      this.camera.position.x = radius * Math.sin(THREE.Math.degToRad(theta));
      this.camera.position.y = radius * Math.sin(THREE.Math.degToRad(theta));
      this.camera.position.z = radius * Math.cos(THREE.Math.degToRad(theta));

      // ANIMATE BIRDS
      for (var i = 0, il = birds.length; i < il; i++) {
        boid = boids[i];
        boid.run(boids);
        var bird = birds[i];
        bird.position.copy(boids[i].position);
        var color = bird.material.color;
        color.r = color.g = color.b = (500 - bird.position.z) / 1000;
        bird.rotation.y = Math.atan2(-boid.velocity.z, boid.velocity.x);
        bird.rotation.z = Math.asin(boid.velocity.y / boid.velocity.length());
        bird.phase = (bird.phase + (Math.max(0, bird.rotation.z) + 0.1)) % 62.83;
        bird.geometry.vertices[5].y = bird.geometry.vertices[4].y = Math.sin(bird.phase) * 5;
      }
    }
  }, {
    key: "addToDom",
    value: function addToDom() {
      document.body.appendChild(this.renderer.domElement);
    }

    // registerDomEvents() {
    //   var domEvents = new THREEx.DomEvents(this.camera, this.renderer.domElement);
    //   domEvents.addEventListener(this.star, 'click', function (event) {
    //     event.target.material.color.setHex(0x0000ff);
    //     this.apiResource.get();
    //   }.bind(this));
    // }

  }, {
    key: "init",
    value: function init() {
      this.addStars();
      this.addBirds();
      this.addToDom();
      this.animate();
      // this.registerDomEvents();
    }
  }]);

  return App;
}();

exports.default = App;


window.onload = function () {
  var app = new App();
  app.init();
};

/***/ })

/******/ });