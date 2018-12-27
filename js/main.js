'use strict';
(function () {

  window.messages.createSuccessMessage();
  window.messages.createErrorMessage();

  var deactivateApplication = function () {
    window.map.deactivate();
    window.form.deactivate();
    window.pins.remove();
    window.card.close();
    window.messages.createSuccessMessage();
  };

  var onFormSubmit = function (data) {
    window.backend.upload(
        function onLoad() {
          deactivateApplication();
        },
        function onError() {
          window.messages.createErrorMessage();
        },
        data);
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
      window.backend.load(function (data) {
        window.pins.create(data, onPinClick);
      });
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
