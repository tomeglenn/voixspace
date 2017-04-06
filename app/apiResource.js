import axios from 'axios';

const ENDPOINTS = {
  MESSAGE: '/api/message'
};

export default class ApiResource
{
  get() {
    axios.get(ENDPOINTS.MESSAGE)
    .then(function (res) {
      console.log(res);
    })
    .catch(function (err) {
      console.log(err);
    });
  }

  post(message) {
    axios.post(ENDPOINTS.MESSAGE, {
      message: message
    })
    .then(function (res) {
      console.log(res);
    })
    .catch(function (err) {
      console.log(err);
    });
  }
}
