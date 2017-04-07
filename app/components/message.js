import moment from 'moment';
import { getMessage, postMessage, putMessage } from '../resources/api';

export default class MessageComponent {
  constructor() {
    this.modal = document.getElementById('showMessageModal');
    this.slides = document.getElementById('slides');
    this.postInput = document.getElementById('postInput');
    this.postId = document.getElementById('postId');
    this.replyBack = document.getElementById('reply-back');
    this.slideReply = document.getElementById('slide-reply');
    this.postButton = document.getElementById('postButton');
    this.closeButton = document.getElementById('closeButton');
    this.explanationText = document.getElementById('explanation');

    var self = this;
    setTimeout(function () {
      this.explanationText.classList.add('hidden');
      this.explanationText.classList.remove('visible');
    }.bind(this), 5000);

    this.postButton.addEventListener('click', function (event) {
      this.showReplyOnly();
    }.bind(this));

    this.closeButton.addEventListener('click', function (event) {
      this.hide();
    }.bind(this));

    this.postInput.addEventListener('keyup', function (event) {
      if (event.keyCode == 13) {

        var promise = this.postId.value != '' ? putMessage(this.postId.value, this.postInput.value) : postMessage(this.postInput.value);

        promise
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
    this.clearSlides();

    getMessage()
    .then(function (res) {
      this.modal.classList.remove('hidden');
      this.modal.classList.add('visible');
      this.postButton.style.display = 'none';

      this.postInput.placeholder = 'What would you like to add?';
      this.postId.value = res.data._id;
      this.replyBack.classList.remove('hide-reply');
      this.slideReply.checked = false;

      var totalMessages = res.data.messages.length;
      for (var i = 0; i < totalMessages; i++) {
        var message = res.data.messages[i];
        this.addSlide(i+1, totalMessages, message, i == 0, i == totalMessages - 1)
      }

      this.replyBack.setAttribute('for', 'slide-' + (totalMessages));

    }.bind(this))
    .catch(function (err) {
      console.log(err);
    });
  }

  showReplyOnly() {
    this.modal.classList.remove('hidden');
    this.modal.classList.add('visible');
    this.postButton.style.display = 'none';

    this.clearSlides();
    this.replyBack.classList.add('hide-reply');
    this.slideReply.checked = true;
    this.postInput.placeholder = 'What\'s on your mind?';
    this.postId.value = '';
    this.postInput.focus();
  }

  hide() {
    this.modal.classList.remove('visible');
    this.modal.classList.add('hidden');
    this.postButton.style.display = 'block';
    this.postInput.value = '';
  }

  clearSlides() {
    var slideWrappers = document.getElementsByClassName('slide-wrapper');
    for (var i = 0; i < slideWrappers.length; i++) {
      slideWrappers[i].remove();
    }
  }

  addSlide(n, totalMessages, message, checked, isLast) {
    var slideWrapper = document.createElement('div');
    slideWrapper.classList.add('slide-wrapper');
    this.slides.appendChild(slideWrapper);

    var radio = document.createElement('input');
    this.setAttributes(radio, {
      'type': 'radio',
      'name': 'radio-btn',
      'id': 'slide-' + n
    });

    if (checked) {
      radio.setAttribute('checked', 'checked');
    }

    var slideContainer = document.createElement('li');
    slideContainer.classList.add('slide-container');

    slideWrapper.appendChild(radio);
    slideWrapper.appendChild(slideContainer);

    var slide = document.createElement('div');
    slide.classList.add('slide');

    var count = document.createElement('span');
    count.classList.add('message-count');
    count.textContent = 'Message ' + n + ' of ' + totalMessages + ' - written ' + moment(message.date).fromNow();
    slide.appendChild(count);

    var body = document.createElement('span');
    body.textContent = message.body;
    slide.appendChild(body);

    slideContainer.appendChild(slide);

    var navContainer = document.createElement('div');
    navContainer.classList.add('nav-container');
    slideContainer.appendChild(navContainer);

    var nav = document.createElement('div');
    nav.classList.add('nav');
    navContainer.appendChild(nav);

    if (n > 1) {
      var labelOne = document.createElement('label');
      labelOne.classList.add('nav-label');
      labelOne.classList.add('prev');
      labelOne.setAttribute('for', 'slide-' + (n-1));
      labelOne.innerHTML = '&#x2039;';
      nav.appendChild(labelOne);
    }

    var labelTwo = document.createElement('label');
    labelTwo.classList.add('nav-label');
    labelTwo.classList.add('next');
    labelTwo.setAttribute('for', isLast ? 'slide-reply' : 'slide-' + (n+1));
    labelTwo.innerHTML = '&#x203a;';
    nav.appendChild(labelTwo);

    if (isLast) {
      labelTwo.addEventListener('click', function (event) {
        this.postInput.focus();
      }.bind(this));
    }
  }

  setAttributes(element, attributes) {
    for (var key in attributes) {
      element.setAttribute(key, attributes[key]);
    }
  }
}
