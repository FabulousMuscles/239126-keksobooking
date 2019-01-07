'use strict';

(function () {
  var isActivated = false;
  var mapElement = document.querySelector('.map');

  window.map = {
    isActivated: function () {
      return isActivated;
    },
    activate: function () {
      isActivated = true;
      mapElement.classList.remove('map--faded');
    },
    deactivate: function () {
      isActivated = false;
      mapElement.classList.add('map--faded');
    }
  };
})();
