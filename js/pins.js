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

  var pinsElement = document.querySelector('.map__pins');
  var templatePinElement = document.querySelector('#pin').content.querySelector('.map__pin');

  window.pins = {
    create: function (advertisments, onPinClick) {
      var fragment = document.createDocumentFragment();

      advertisments.forEach(function (advertisment) {
        var element = createPinElement(advertisment);

        element.addEventListener('click', function () {
          onPinClick(advertisment);
        });

        fragment.appendChild(element);
      });

      pinsElement.appendChild(fragment);
    },
    remove: function () {

      // @TODO
      // pinsElement.innerHTML = '';
    }
  };
})();
