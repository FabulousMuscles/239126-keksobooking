'use strict';

(function () {
  var onFilterChanged = function (filteredAdvertisments) {
    window.card.close();
    window.pins.remove();
    window.pins.create(filteredAdvertisments, onPinClick);
  };

  var onUploadSuccess = function () {
    deactivateApplication();
    window.messages.createSuccessMessage();
  };

  var onUploadError = function () {
    window.messages.createErrorMessage();
  };

  var onLoadSuccess = function (data) {
    window.formPhoto.activate();
    window.map.activate();
    window.form.activate(onFormSubmit, onFormReset);
    window.pins.create(data, onPinClick);
    window.filters.activate(data, onFilterChanged);
  };

  var deactivateApplication = function () {
    window.formPhoto.deactivate();
    window.map.deactivate();
    window.form.deactivate();
    window.pins.remove();
    window.card.close();
  };

  var onFormSubmit = function (data) {
    window.backend.upload(onUploadSuccess, onUploadError, data);
  };

  var onFormReset = function () {
    deactivateApplication();
    window.mainPin.resetPosition();
  };

  var onPinClick = function (advertisment, onCardClose) {
    window.card.open(advertisment, onCardClose);
  };

  var onMainPinMouseUp = function () {
    if (!window.map.isActivated()) {
      window.backend.load(onLoadSuccess, window.messages.createErrorMessage);
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
