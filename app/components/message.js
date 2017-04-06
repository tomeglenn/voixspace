import { getMessage } from '../resources/api';

export default class MessageComponent {
  constructor() {
    this.modal = document.getElementById('showMessageModal');
    this.message = document.getElementById('message');

    this.modal.addEventListener('click', function (event) {
      this.hide();
    }.bind(this));
  }

  show() {
    getMessage()
    .then(function (res) {
      this.modal.classList.remove('hidden');
      this.modal.classList.add('visible');

      this.message.innerHTML = '';
      res.data.messages.forEach(function (message) {
        var div = document.createElement('span');
        div.classList.add('message');
        div.textContent = message.body;
        document.getElementById('message').appendChild(div);
      });

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
