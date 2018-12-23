'use strict';
(function () {

  var resetMainPinPosition = function () {
    mainPinElement.style.left = window.setup.ADDRESS_ORIGIN_X + 'px';
    mainPinElement.style.top = window.setup.ADDRESS_ORIGIN_Y + 'px';
  };

  var pinMouseDownHandler = function (evt) {
    window.pins.mapElement.classList.remove('map--faded');
    window.pins.createPins();
    window.form.activateForm();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var pinMouseMoveHandler = function (moveEvt) {
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      mainPinElement.style.top = Math.max(window.setup.LAYOUT_MIN_Y_SIZE, Math.min((mainPinElement.offsetTop - shift.y), window.setup.LAYOUT_MAX_Y_SIZE)) + 'px';
      mainPinElement.style.left = Math.max(window.setup.LAYOUT_MIN_X_SIZE, Math.min((mainPinElement.offsetLeft - shift.x), window.setup.LAYOUT_MAX_X_SIZE)) + 'px';
      window.form.syncFieldAddressWithMainPin();
    };

    var pinMouseUpHandler = function () {
      document.removeEventListener('mousemove', pinMouseMoveHandler);
      document.removeEventListener('mouseup', pinMouseUpHandler);
    };
    mainPinElement.removeEventListener('mousedown', pinMouseDownHandler);
    document.addEventListener('mousemove', pinMouseMoveHandler);
    document.addEventListener('mouseup', pinMouseUpHandler);
  };

  var mainPinElement = window.pins.mapElement.querySelector('.map__pin--main');

  mainPinElement.addEventListener('mousedown', pinMouseDownHandler);

  window.dragAndDrop = {
    mainPinElement: mainPinElement,
    resetMainPinPosition: resetMainPinPosition
  };
})();
