import { postMessage } from '../resources/api';

export default class PostComponent {
  constructor() {
    this.modal = document.getElementById('postMessageModal');
    this.postInput = document.getElementById('postInput');

    this.postInput.addEventListener('click', function (event) {
      event.cancelBubble = true;
    });

    this.modal.addEventListener('click', function (event) {
      this.hide();
    }.bind(this));

    this.postInput.addEventListener('keyup', function (event) {
      if (event.keyCode == 13) {
        postMessage(this.postInput.value)
        .then(function (res) {
          this.postInput.value = '';
          this.postInput.placeholder = 'Message successfully sent!';
          this.hide();
        }.bind(this))
        .catch(function (err) {
          console.log(err);
        });
      }
    }.bind(this));
  }

  show() {
      this.modal.classList.remove('hidden');
      this.modal.classList.add('visible');

      this.postInput.placeholder = 'What\'s on your mind?';

      setTimeout(function () {
        this.postInput.focus();
      }, 500);
  }

  hide() {
    this.modal.classList.remove('visible');
    this.modal.classList.add('hidden');
  }
}
