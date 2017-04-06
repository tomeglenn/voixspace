import cube from './cube';
import axios from 'axios';
import { setupModals } from './forms';

window.onload = function() {
  cube();
  setupModals();
}
