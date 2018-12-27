'use strict';
(function () {

  var deactivateOnSuccess = function () {
    window.map.deactivate();
    window.form.deactivate();
    window.pins.remove();
    window.card.close();
    window.serverMessages.createSuccess();
  };

  var onFormSubmit = function (data) {
    window.backend.upload(
        data,
        deactivateOnSuccess,
        window.serverMessages.createError);
  };

  var onFormReset = function () {
    window.mainPin.resetPosition();
    window.map.deactivate();
    window.form.deactivate();
    window.pins.remove();
    window.card.close();
  };

  var onPinClick = function (advertisment) {
    window.card.open(advertisment);
  };

  var onMainPinMouseUp = function () {
    if (!window.map.isActivated()) {
      window.map.activate();
      window.form.activate(onFormSubmit, onFormReset);
      window.backend.load(window.pins.create, onPinClick);
    }
  };

  var onMainPinMouseMove = function (x, y) {
    window.form.setFieldAddress(x, y);
  };

  window.mainPin.activate(
      onMainPinMouseUp,
      onMainPinMouseMove
  );
})();
