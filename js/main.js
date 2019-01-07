'use strict';

(function () {
  var callbackFilterChanged = function (filteredAdvertisments) {
    window.card.close();
    window.pins.remove();
    window.pins.create(filteredAdvertisments, callbackPinClick);
  };

  var callbackUploadSuccess = function () {
    deactivateApplication();
    window.messages.createSuccessMessage();
  };

  var callbackUploadError = function () {
    window.messages.createErrorMessage();
  };

  var callbackLoadSuccess = function (data) {
    window.formPhoto.activate();
    window.map.activate();
    window.form.activate(callbackFormSubmit, callbackFormReset);
    window.pins.create(data, callbackPinClick);
    window.filters.activate(data, callbackFilterChanged);
  };

  var deactivateApplication = function () {
    window.filters.deactivate();
    window.formPhoto.deactivate();
    window.map.deactivate();
    window.form.deactivate();
    window.pins.remove();
    window.card.close();
  };

  var callbackFormSubmit = function (data) {
    window.backend.upload(callbackUploadSuccess, callbackUploadError, data);
  };

  var callbackFormReset = function () {
    deactivateApplication();
    window.mainPin.resetPosition();
  };

  var callbackPinClick = function (advertisment, callbackCardClose) {
    window.card.open(advertisment, callbackCardClose);
  };

  var callbackMainPinMouseUp = function () {
    if (!window.map.isActivated()) {
      window.backend.load(callbackLoadSuccess, window.messages.createErrorMessage);
    }
  };

  var callbackMainPinMouseMove = function (x, y) {
    window.form.setFieldAddress(x, y);
  };

  window.mainPin.activate(
      callbackMainPinMouseUp,
      callbackMainPinMouseMove
  );
})();
