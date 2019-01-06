'use strict';

(function () {
  var URL_LOAD = 'https://js.dump.academy/keksobooking/data';
  var URL_UPLOAD = 'https://js.dump.academy/keksobooking';
  var METHOD_POST = 'POST';
  var METHOD_GET = 'GET';
  var XHR_TYPE = 'json';
  var ERROR_LOAD_TEXT = 'Произошла ошибка соединения.';
  var ERROR_TIMEOUT_TEXT = 'Время запроса истекло.';

  var createRequest = function (onLoad, onError, method, url, data) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = XHR_TYPE;

    xhr.addEventListener('load', function () {
      onLoad(xhr.response);
    });

    xhr.addEventListener('error', function () {
      onError(ERROR_LOAD_TEXT);
    });

    xhr.addEventListener('timeout', function () {
      onError(ERROR_TIMEOUT_TEXT);
    });

    xhr.open(method, url);
    xhr.send(data);
  };

  window.backend = {
    load: function (onLoad, onError) {
      createRequest(onLoad, onError, METHOD_GET, URL_LOAD);
    },
    upload: function (onLoad, onError, data) {
      createRequest(onLoad, onError, METHOD_POST, URL_UPLOAD, data);
    }
  };
})();
