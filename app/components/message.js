import { getMessage } from '../resources/api';

export default class MessageComponent {
  constructor() {
    this.modal = document.getElementById('showMessageModal');

    this.modal.addEventListener('click', function (event) {
      this.hide();
    }.bind(this));
  }

  show() {
    this.modal.style.visibility = 'visible';
  }

  hide() {
    this.modal.style.visibility = 'hidden';
  }
}
