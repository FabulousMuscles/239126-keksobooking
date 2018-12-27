'use strict';
(function () {
  var URL_LOAD = 'https://js.dump.academy/keksobooking/data';
  var URL_UPLOAD = 'https://js.dump.academy/keksobooking';
  var METHOD_POST = 'POST';
  var METHOD_GET = 'GET';
  var XHR_TYPE = 'json';

  var createRequest = function (onLoad, onError, method, url, data) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = XHR_TYPE;

    xhr.addEventListener('load', function () {
      onLoad(xhr.response);
    });

    xhr.addEventListener('error', function () {
      onError();
    });

    xhr.open(method, url);
    xhr.send(data);
  };

  window.backend = {
    load: function (onLoad, onError, data) {
      createRequest(onLoad, onError, METHOD_GET, URL_LOAD, data);
    },
    upload: function (onLoad, onError, data) {
      createRequest(onLoad, onError, METHOD_POST, URL_UPLOAD, data);
    }
  };
})();
