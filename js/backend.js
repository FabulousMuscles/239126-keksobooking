'use strict';

(function () {
  var URL_LOAD = 'https://js.dump.academy/keksobooking/data';
  var URL_UPLOAD = 'https://js.dump.academy/keksobooking';
  var METHOD_POST = 'POST';
  var METHOD_GET = 'GET';
  var XHR_TYPE = 'json';
  var XHR_TIMEOUT = 10000;
  var ERROR_LOAD_TEXT = 'Произошла ошибка соединения.';
  var ERROR_TIMEOUT_TEXT = 'Время запроса истекло.';

  var createRequest = function (callbackLoad, callbackError, method, url, data) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = XHR_TYPE;

    xhr.addEventListener('load', function () {
      callbackLoad(xhr.response);
    });

    xhr.addEventListener('error', function () {
      callbackError(ERROR_LOAD_TEXT);
    });

    xhr.addEventListener('timeout', function () {
      callbackError(ERROR_TIMEOUT_TEXT);
    });

    xhr.timeout = XHR_TIMEOUT;

    xhr.open(method, url);
    xhr.send(data);
  };

  window.backend = {
    load: function (callbackLoad, callbackError) {
      createRequest(callbackLoad, callbackError, METHOD_GET, URL_LOAD);
    },
    upload: function (callbackLoad, callbackError, data) {
      createRequest(callbackLoad, callbackError, METHOD_POST, URL_UPLOAD, data);
    }
  };
})();
