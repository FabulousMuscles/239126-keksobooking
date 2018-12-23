'use strict';
(function () {
  var URL_AVATAR_PATTERN = 'img/avatars/user0{index}.png';

  var LIMIT_ROOM_PRICE_MAX = 1000000;
  var LIMIT_ROOM_PRICE_MIN = 1000;
  var LIMIT_ROOM_AMOUNT_MAX = 5;
  var LIMIT_ROOM_AMOUNT_MIN = 1;
  var LIMIT_GUESTS_AMOUNT_MAX = 10;
  var LIMIT_GUESTS_AMOUNT_MIN = 1;

  var ADVERTISMENT_TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var ADVERTISMENT_TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var ADVERTISMENT_CHECKINS_AND_CHECKOUTS = ['12:00', '13:00', '14:00'];
  var ADVERTISMENT_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var ADVERTISMENT_PHOTOS = ['hotel1', 'hotel2', 'hotel3'];

  var LAYOUT_MAX_X_SIZE = 1135;
  var LAYOUT_MIN_X_SIZE = 0;
  var LAYOUT_MAX_Y_SIZE = 630;
  var LAYOUT_MIN_Y_SIZE = 100;

  var ADVERTISMENT_LIMIT = 8;

  var KEYCODE_ESC = 27;

  var ADDRESS_ORIGIN_X = 570;
  var ADDRESS_ORIGIN_Y = 375;

  var createAdvertisment = function (i) {
    var x = createRandomNumber(LAYOUT_MIN_X_SIZE, LAYOUT_MAX_X_SIZE);
    var y = createRandomNumber(LAYOUT_MIN_Y_SIZE, LAYOUT_MAX_Y_SIZE);

    return {
      author: {
        avatar: createAvatarUrl(i + 1)
      },
      location: {
        x: x,
        y: y
      },
      offer: {
        title: ADVERTISMENT_TITLES[i % ADVERTISMENT_TITLES.length],
        adress: x + ' ' + y,
        price: createRandomNumber(LIMIT_ROOM_PRICE_MIN, LIMIT_ROOM_PRICE_MAX),
        type: ADVERTISMENT_TYPES[createRandomNumber(0, ADVERTISMENT_TYPES.length - 1)],
        rooms: createRandomNumber(LIMIT_ROOM_AMOUNT_MIN, LIMIT_ROOM_AMOUNT_MAX),
        guests: createRandomNumber(LIMIT_GUESTS_AMOUNT_MIN, LIMIT_GUESTS_AMOUNT_MAX),
        checkin: ADVERTISMENT_CHECKINS_AND_CHECKOUTS[createRandomNumber(0, ADVERTISMENT_CHECKINS_AND_CHECKOUTS.length - 1)],
        checkout: ADVERTISMENT_CHECKINS_AND_CHECKOUTS[createRandomNumber(0, ADVERTISMENT_CHECKINS_AND_CHECKOUTS.length - 1)],
        features: createRandomArrayLength(ADVERTISMENT_FEATURES),
        description: '',
        photos: createRandomArray(ADVERTISMENT_PHOTOS)
      }
    };
  };

  var createAvatarUrl = function (index) {
    return URL_AVATAR_PATTERN.replace('{index}', index);
  };

  var createRandomNumber = function (min, max) {
    return Math.round(min + Math.random() * (max - min));
  };

  var createRandomArray = function (arr) {
    var copy = arr.slice();
    var result = [];
    var randomRelativeIndex;

    for (var i = 0; i < arr.length; i++) {
      randomRelativeIndex = createRandomNumber(0, copy.length - 1);
      result.push(copy[randomRelativeIndex]);
      copy.splice(randomRelativeIndex, 1);
    }

    return result;
  };

  var createRandomArrayLength = function (arr) {
    return arr.slice(0, createRandomNumber(1, arr.length));
  };

  var createAdvertisments = function () {
    var advertisments = [];

    for (var i = 0; i < ADVERTISMENT_LIMIT; i++) {
      advertisments.push(createAdvertisment(i));
    }

    return advertisments;
  };

  window.setup = {
    ADDRESS_ORIGIN_X: ADDRESS_ORIGIN_X,
    ADDRESS_ORIGIN_Y: ADDRESS_ORIGIN_Y,
    createAdvertisments: createAdvertisments,
    KEYCODE_ESC: KEYCODE_ESC,
    LAYOUT_MAX_X_SIZE: LAYOUT_MAX_X_SIZE,
    LAYOUT_MIN_X_SIZE: LAYOUT_MIN_X_SIZE,
    LAYOUT_MAX_Y_SIZE: LAYOUT_MAX_Y_SIZE,
    LAYOUT_MIN_Y_SIZE: LAYOUT_MIN_Y_SIZE
  };
})();
