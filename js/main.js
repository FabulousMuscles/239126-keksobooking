'use strict';
(function () {

  var backendOnUploadSuccess = function () {
    deactivateApplication();
  };

  var backendOnUploadError = function () {
    window.messages.createErrorUploadMessage();
  };

  var backendOnLoadSuccess = function (data) {
    window.pins.create(data, onPinClick);
  };

  var deactivateApplication = function () {
    window.map.deactivate();
    window.form.deactivate();
    window.pins.remove();
    window.card.close();
    window.messages.createSuccessUploadMessage();
  };

  var onFormSubmit = function (data) {
    window.backend.upload(
        backendOnUploadSuccess,
        backendOnUploadError,
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
      window.backend.load(backendOnLoadSuccess, window.messages.createErrorLoadMessage);
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
