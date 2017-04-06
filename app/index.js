
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app.jsx';
import ThreeCanvas from './components/three-canvas';

window.onload = function() {
  ReactDOM.render(<App />, document.getElementById('app'));

  var threeCanvas = new ThreeCanvas();
  threeCanvas.init();
};
