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

  var createPins = function () {
    var fragment = document.createDocumentFragment();

    advertisments.forEach(function (advertisment) {
      var element = createPinElement(advertisment);
      var clickHandler = window.popup.createPinClickHander(advertisment);
      element.addEventListener('click', clickHandler);

      fragment.appendChild(element);
    });

    pinsElement.appendChild(fragment);
  };

  var mapElement = document.querySelector('.map');
  var pinsElement = mapElement.querySelector('.map__pins');
  var filtersElement = mapElement.querySelector('.map__filters-container');

  var templatePinElement = document.querySelector('#pin').content.querySelector('.map__pin');

  var advertisments = window.setup.createAdvertisments();

  window.pins = {
    mapElement: mapElement,
    createPins: createPins,
    filtersElement: filtersElement
  };

})();
