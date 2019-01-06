'use strict';

(function () {
  var LAYOUT_MAX_X_SIZE = 1135;
  var LAYOUT_MIN_X_SIZE = 0;
  var LAYOUT_MAX_Y_SIZE = 630;
  var LAYOUT_MIN_Y_SIZE = 130;

  var ADDRESS_ORIGIN_X = 570;
  var ADDRESS_ORIGIN_Y = 375;

  var mainPinElement = document.querySelector('.map__pin--main');

  var createMouseDownHandler = function (onMainPinMouseUp, onMainPinMouseMove) {
    return function (evt) {
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

        var y = Math.max(LAYOUT_MIN_Y_SIZE, Math.min((mainPinElement.offsetTop - shift.y), LAYOUT_MAX_Y_SIZE));
        var x = Math.max(LAYOUT_MIN_X_SIZE, Math.min((mainPinElement.offsetLeft - shift.x), LAYOUT_MAX_X_SIZE));

        mainPinElement.style.top = y + 'px';
        mainPinElement.style.left = x + 'px';

        onMainPinMouseMove(x, y);
      };

      var pinMouseUpHandler = function () {
        onMainPinMouseUp();

        document.removeEventListener('mousemove', pinMouseMoveHandler);
        document.removeEventListener('mouseup', pinMouseUpHandler);
      };
      document.addEventListener('mousemove', pinMouseMoveHandler);
      document.addEventListener('mouseup', pinMouseUpHandler);
    };
  };

  var pinMouseDownHandler;

  window.mainPin = {
    activate: function (onMainPinMouseUp, onMainPinMouseMove) {
      pinMouseDownHandler = createMouseDownHandler(onMainPinMouseUp, onMainPinMouseMove);

      mainPinElement.addEventListener('mousedown', pinMouseDownHandler);
    },
    deactivate: function () {
      mainPinElement.removeEventListener('mousedown', pinMouseDownHandler);
    },
    resetPosition: function () {
      mainPinElement.style.left = ADDRESS_ORIGIN_X + 'px';
      mainPinElement.style.top = ADDRESS_ORIGIN_Y + 'px';
    }
  };

})();
