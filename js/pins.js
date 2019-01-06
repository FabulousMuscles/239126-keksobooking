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

  var createPins = function (advertisments, onPinClick) {
    var fragment = document.createDocumentFragment();

    advertisments.forEach(function (advertisment) {
      var element = createPinElement(advertisment);

      element.addEventListener('click', function (evt) {
        onPinClick(advertisment, evt.currentTarget);
      });

      fragment.appendChild(element);
    });

    pinElement.appendChild(fragment);
  };

  var removePins = function () {
    var pinsElements = pinElement.children;
    for (var i = pinsElements.length - 1; i >= 0; i--) {
      if (pinsElements[i].type === 'button') {
        pinsElements[i].remove();
      }
    }
  };

  var pinElement = document.querySelector('.map__pins');
  var templatePinElement = document.querySelector('#pin').content.querySelector('.map__pin');

  window.pins = {
    create: createPins,
    remove: removePins
  };
})();
