'use strict';

(function () {
  var createPinElement = function (data) {
    var element = templatePinElement.cloneNode(true);
    var imageElement = element.querySelector('img');

    element.style.left = data.location.x + 'px';
    element.style.top = data.location.y + 'px';

    imageElement.src = data.author.avatar;
    imageElement.alt = data.offer.title;

    return element;
  };

  var resetActivePin = function () {
    if (activeElement) {
      activeElement.classList.remove('map__pin--active');
    }
  };

  var createPins = function (advertisments, onPinClick) {
    var fragment = document.createDocumentFragment();

    advertisments.forEach(function (advertisment) {
      var element = createPinElement(advertisment);

      element.addEventListener('click', function () {
        resetActivePin();
        element.classList.add('map__pin--active');
        activeElement = element;
        onPinClick(advertisment, resetActivePin);
      });

      fragment.appendChild(element);
    });

    mapPinsElement.appendChild(fragment);
  };

  var removePins = function () {
    activeElement = null;

    Array.from(mapPinsElement.children)
    .filter(function (childElement) {
      return childElement.type === 'button';
    })
    .forEach(function (childElement) {
      childElement.remove();
    });
  };

  var activeElement;
  var mapPinsElement = document.querySelector('.map__pins');
  var templatePinElement = document.querySelector('#pin').content.querySelector('.map__pin');

  window.pins = {
    create: createPins,
    remove: removePins
  };
})();
