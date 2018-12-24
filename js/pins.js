'use strict';
(function () {

  var createPinElement = function (data) {
    var element = templatePinElement.cloneNode(true);

    element.style.left = data.location.x + 'px';
    element.style.top = data.location.y + 'px';
    element.querySelector('img').src = data.author.avatar;
    element.querySelector('img').alt = data.offer.title;

    return element;
  };

  var mapElement = document.querySelector('.map');
  var pinsElement = mapElement.querySelector('.map__pins');

  var templatePinElement = document.querySelector('#pin').content.querySelector('.map__pin');

  window.pins = {
    returnCreatePins: function (advertisments, onPinCallback) {
      return function () {
        var fragment = document.createDocumentFragment();

        advertisments.forEach(function (advertisment) {
          var element = createPinElement(advertisment);
          var clickHandler = onPinCallback(advertisment);
          element.addEventListener('click', clickHandler);

          fragment.appendChild(element);
        });
        pinsElement.appendChild(fragment);
      };
    },
    activateMap: function () {
      mapElement.classList.remove('map--faded');
    }

  };
})();
