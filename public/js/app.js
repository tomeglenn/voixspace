var ENDPOINTS = {
  MESSAGE: '/api/message'
};

function getMessage() {
  axios.get(ENDPOINTS.MESSAGE)
  .then(function (res) {
    console.log(res.data);
  })
  .catch(function (err) {
    console.log(err);
  });
}

function postMessage() {
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
}
