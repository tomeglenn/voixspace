export default class MessageComponent {
  constructor() {
    this.overlay = document.getElementById('overlay');
    this.modal = document.getElementById('messageContainer');
  }

  show() {
    this.overlay.style.display = 'block';
    this.modal.style.display = 'block';
  }

  hide() {
    this.overlay.style.display = 'none';
    this.modal.style.display = 'none';
  }
}
