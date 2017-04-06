import { getMessage } from '../resources/api';

export default class MessageComponent {
  constructor() {
    this.modal = document.getElementById('showMessageModal');

    this.modal.addEventListener('click', function (event) {
      this.hide();
    }.bind(this));
  }

  show() {
    getMessage()
    .then(function (res) {
      this.modal.classList.remove('hidden');
      this.modal.classList.add('visible');
      document.getElementById('message').innerText = res.data.messages[0].body;
    }.bind(this))
    .catch(function (err) {
      console.log(err);
    });
  }

  hide() {
    this.modal.classList.remove('visible');
    this.modal.classList.add('hidden');
  }
}
