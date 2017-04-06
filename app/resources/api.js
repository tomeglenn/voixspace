import axios from 'axios';

const ENDPOINTS = {
  MESSAGE: '/api/message'
};

function getMessage() {
  return axios.get(ENDPOINTS.MESSAGE);
}

function postMessage(message) {
  return axios.post(ENDPOINTS.MESSAGE, {
    message: message
  });
}

export { getMessage, postMessage };
