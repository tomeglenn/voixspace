import axios from 'axios';

const ENDPOINTS = {
  MESSAGE: '/api/message'
};

function setupModals () {
  document.getElementById('postMessageButton').addEventListener('click', function (event) {
    var messageInput = document.getElementById('messageInput');
    var message = messageInput.value;

    if (!message) {
      alert('You must enter a message');
      return;
    }

    axios.post(ENDPOINTS.MESSAGE, {
      message: messageInput.value
    })
    .then(function (res) {
      console.log(res);

      messageInput.value = '';
    })
    .catch(function (err) {
      console.log(err);
    });
  });
};

export { setupModals };
