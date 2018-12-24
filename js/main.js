'use strict';
(function () {
  var mainPinElement = document.querySelector('.map__pin--main');
  var advertisments = window.data.createAdvertisments();

  var createPins = window.pins.returnCreatePins(advertisments, window.popup.createPinClickHander);

  var onMainPinMouseUp = function () {
    window.pins.activateMap();
    createPins();
    window.form.activate();
  };

  var onMainPinMouseMove = function () {
    window.form.setFieldAddress();
  };

  var removePinMouseDown = function () {
    mainPinElement.removeEventListener('mousedown', pinMouseDownHandler);
  };

  var pinMouseDownHandler = window.mainPin.activate(onMainPinMouseUp, onMainPinMouseMove, removePinMouseDown);

  mainPinElement.addEventListener('mousedown', pinMouseDownHandler);

})();
