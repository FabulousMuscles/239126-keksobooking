'use strict';
(function () {

  var onFilterChanged = function (filteredAdvertisments) {
    window.card.close();
    window.pins.remove();
    window.pins.create(filteredAdvertisments, onPinClick);
  };

  var onBackendUploadSuccess = function () {
    deactivateApplication();
    window.messages.createSuccessMessage();
  };

  var onBackendUploadError = function () {
    window.messages.createErrorMessage();
  };

  var onBackendLoadSuccess = function (data) {
    window.photo.activate();
    window.map.activate();
    window.form.activate(onFormSubmit, onFormReset);
    window.pins.create(data, onPinClick);
    window.filters.activate(data, onFilterChanged);
  };

  var deactivateApplication = function () {
    window.photo.deactivate();
    window.map.deactivate();
    window.form.deactivate();
    window.pins.remove();
    window.card.close();
  };

  var onFormSubmit = function (data) {
    window.backend.upload(
        onBackendUploadSuccess,
        onBackendUploadError,
        data);
  };


  var onFormReset = function () {
    deactivateApplication();
    window.mainPin.resetPosition();
  };

  var onPinClick = function (advertisment) {
    window.card.open(advertisment);
  };

  var onMainPinMouseUp = function () {
    if (!window.map.isActivated()) {
      window.backend.load(onBackendLoadSuccess, window.messages.createErrorMessage);
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
