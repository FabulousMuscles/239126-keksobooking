'use strict';
(function () {
  var LAYOUT_MAX_X_SIZE = 1135;
  var LAYOUT_MIN_X_SIZE = 0;
  var LAYOUT_MAX_Y_SIZE = 630;
  var LAYOUT_MIN_Y_SIZE = 100;

  var ADDRESS_ORIGIN_X = 570;
  var ADDRESS_ORIGIN_Y = 375;

  var resetMainPinPosition = function () {
    mainPinElement.style.left = ADDRESS_ORIGIN_X + 'px';
    mainPinElement.style.top = ADDRESS_ORIGIN_Y + 'px';
  };

  var mainPinElement = document.querySelector('.map__pin--main');

  window.mainPin = {
    activate: function (onMouseUpCallback, onMouseMoveCallback, removeMouseDownCallback) {
      return function (evt) {
        var y;
        var x;

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

          y = Math.max(LAYOUT_MIN_Y_SIZE, Math.min((mainPinElement.offsetTop - shift.y), LAYOUT_MAX_Y_SIZE));
          x = Math.max(LAYOUT_MIN_X_SIZE, Math.min((mainPinElement.offsetLeft - shift.x), LAYOUT_MAX_X_SIZE));

          mainPinElement.style.top = y + 'px';
          mainPinElement.style.left = x + 'px';
          onMouseMoveCallback(x, y);
        };

        var pinMouseUpHandler = function () {
          onMouseUpCallback();
          document.removeEventListener('mousemove', pinMouseMoveHandler);
          document.removeEventListener('mouseup', pinMouseUpHandler);
          removeMouseDownCallback();
        };
        document.addEventListener('mousemove', pinMouseMoveHandler);
        document.addEventListener('mouseup', pinMouseUpHandler);
      };
    },
    resetMainPinPosition: resetMainPinPosition
  };

})();
