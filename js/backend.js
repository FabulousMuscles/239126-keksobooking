'use strict';
(function () {
  var URL_LOAD = 'https://js.dump.academy/keksobooking/data';

  window.backend = {
    load: function (onBackendLoad, onPinClick) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === 200 ) {
          var advertisments = xhr.response;
          onBackendLoad(advertisments, onPinClick);
        } else {
          console.log('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
        }
      });

      xhr.addEventListener('error', function () {
        console.log('произошла ошибка соединения');
      });

      xhr.addEventListener('timeout', function () {
        console.log('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });

      xhr.timeout = 1000;

      xhr.open('GET', URL_LOAD);
      xhr.send();
    }
  }
})();
