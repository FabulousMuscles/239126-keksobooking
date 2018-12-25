'use strict';
(function () {

  var onFormSubmit = function () {
    window.map.deactivate();
    window.form.deactivate();
    window.pins.remove();
  };

  var onFormReset = function () {
    window.mainPin.resetPosition();
    window.map.deactivate();
    window.form.deactivate();
    window.pins.remove();
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

  var advertisments = window.data.createAdvertisments();

  window.mainPin.activate(
      onMainPinMouseUp,
      onMainPinMouseMove
  );
})();
