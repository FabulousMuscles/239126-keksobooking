'use strict';
(function () {
  var onMainPinMouseUp = function () {
    window.pins.activateMap();
    createPins();
    window.form.activate();
  };

  var onMainPinMouseMove = function (x, y) {
    window.form.setFieldAddress(x, y);
  };

  var removePinMouseDown = function () {
    mainPinElement.removeEventListener('mousedown', pinMouseDownHandler);
  };

  var resetButtonElementClickHandler = function (evt) {
    evt.preventDefault();
    setFefaultForm();
  };

  var mainPinElement = document.querySelector('.map__pin--main');
  var advertisments = window.data.createAdvertisments();
  var resetButtonElement = document.querySelector('.ad-form__reset');

  var createPins = window.pins.returnCreatePins(advertisments, window.popup.createPinClickHander);

  var pinMouseDownHandler = window.mainPin.activate(onMainPinMouseUp, onMainPinMouseMove, removePinMouseDown);

  var setFefaultForm = window.form.returnSetDefault(window.mainPin.resetMainPinPosition);

  setFefaultForm();

  mainPinElement.addEventListener('mousedown', pinMouseDownHandler);
  resetButtonElement.addEventListener('click', resetButtonElementClickHandler);

})();
