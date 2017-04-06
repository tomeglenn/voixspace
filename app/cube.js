import clickNode from './interactions';

export default function cube() {
  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

  var renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );

  var geometry = new THREE.BoxGeometry( 1, 1, 1 );
  var material = new THREE.MeshBasicMaterial( { color: 0x00ff00, wireframe: true } );
  var cube = new THREE.Mesh( geometry, material );
  scene.add( cube );

  camera.position.z = 5;

  function render() {
    requestAnimationFrame( render );

    cube.rotation.x = Date.now() * 0.0005;
    cube.rotation.y = Date.now() * 0.0001;

    renderer.render( scene, camera );
  }
  render();

  var domEvents = new THREEx.DomEvents(camera, renderer.domElement);
  domEvents.addEventListener(cube, 'click', function (event) {
    clickNode(cube);
  });
}
