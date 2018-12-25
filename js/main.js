'use strict';
(function () {

  var isActivated = false;

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

  var onFormSubmit = function () {
    window.map.deactivate();
    window.form.deactivate();
    window.pins.remove();
  };

  var onFormReset = function () {
    window.mainPin.resetPosition();
  };

  var onPinClick = function (advertisment) {
    window.card.open(advertisment);
  };

  var onMainPinMouseUp = function () {
    if (!window.map.isActivated()) {
      window.map.activate();
      window.form.activate(onFormSubmit, onFormReset);
      window.pins.create(advertisments, onPinClick);
    }
  };

  var onMainPinMouseMove = function (x, y) {
    window.form.setFieldAddress(x, y);
  };


  var mapElement = document.querySelector('.map');
  var advertisments = window.data.createAdvertisments();

  // window.form.reset();

  window.mainPin.activate(
      onMainPinMouseUp,
      onMainPinMouseMove
  );
})();
