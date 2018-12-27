'use strict';
(function () {
  var URL_LOAD = 'https://js.dump.academy/keksobooking/data';
  var URL_UPLOAD = 'https://js.dump.academy/keksobooking';

  window.backend = {
    load: function (onLoad, onPinClick) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        var advertisments = xhr.response;
        onLoad(advertisments, onPinClick);
      });

      xhr.open('GET', URL_LOAD);
      xhr.send();
    },
    upload: function (data, onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        onLoad();
      });

      xhr.addEventListener('error', function () {
        onError();
      });

      xhr.open('POST', URL_UPLOAD);
      xhr.send(data);
    }
  };
})();
