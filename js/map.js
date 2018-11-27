'use strict';
var AVATARS = ['img/avatars/user01.png', 'img/avatars/user02.png', 'img/avatars/user03.png', 'img/avatars/user04.png', 'img/avatars/user05.png', 'img/avatars/user06.png', 'img/avatars/user07.png', 'img/avatars/user08.png'];
var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var MAX_ROOM_PRICE = 1000000;
var MIN_ROOM_PRICE = 1000;
var MAX_ROOM_AMOUNT = 5;
var MIN_ROOM_AMOUNT = 1;
var MAX_GUESTS_AMOUNT = 10;
var MIN_GUESTS_AMOUNT = 1;
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var CHECKINS_AND_CHECKOUTS = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var LAYOUT_MAX_X_SIZE = 1100;
var LAYOUT_MIN_X_SIZE = 100;
var LAYOUT_MAX_Y_SIZE = 630;
var LAYOUT_MIN_Y_SIZE = 130;
var ADVERTISMENT_LIMIT = 8;
var PRICE_SIGN = '₽/ночь';
var FLAT_TYPES_MAP = {
  flat: 'Квартира',
  bungalo: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец'
};
var FEATURES_MAP = {
  wifi: 'popup__feature--wifi',
  dishwasher: 'popup__feature--dishwasher',
  parking: 'popup__feature--parking',
  washer: 'popup__feature--washer',
  elevator: 'popup__feature--elevator',
  conditioner: 'popup__feature--conditioner'
};

var createAdvertisment = function (i) {
  return {
    author: {
      avatar: AVATARS[i]
    },
    offer: {
      title: TITLES[i],
      adress: createRandomNumber(LAYOUT_MIN_X_SIZE, LAYOUT_MAX_X_SIZE).toString() + ' ' + createRandomNumber(LAYOUT_MIN_Y_SIZE, LAYOUT_MAX_Y_SIZE).toString(),
      price: createRandomNumber(MIN_ROOM_PRICE, MAX_ROOM_PRICE),
      type: TYPES[createRandomNumber(0, TYPES.length)],
      rooms: createRandomNumber(MIN_ROOM_AMOUNT, MAX_ROOM_AMOUNT),
      guests: createRandomNumber(MIN_GUESTS_AMOUNT, MAX_GUESTS_AMOUNT),
      checkin: CHECKINS_AND_CHECKOUTS[createRandomNumber(0, CHECKINS_AND_CHECKOUTS.length)],
      checkout: CHECKINS_AND_CHECKOUTS[createRandomNumber(0, CHECKINS_AND_CHECKOUTS.length)],
      features: createRandomArrayLength(FEATURES),
      description: '',
      photos: createRandomArray(PHOTOS)
    },
    location: {
      x: createRandomNumber(LAYOUT_MIN_X_SIZE, LAYOUT_MAX_X_SIZE),
      y: createRandomNumber(LAYOUT_MIN_Y_SIZE, LAYOUT_MAX_Y_SIZE)
    }
  };
};

var createRandomNumber = function (min, max) {
  return Math.floor(min + Math.random() * (max - min));
};

var createRandomArray = function (arr) {
  var copy = arr.slice();
  var result = [];
  var randomRelativeIndex;
  for (var i = 0; i < arr.length; i++) {
    randomRelativeIndex = createRandomNumber(0, copy.length);
    result.push(copy[randomRelativeIndex]);
    copy.splice(randomRelativeIndex, 1);
  }
  return result;
};

var createRandomArrayLength = function (arr) {
  var copy = arr.slice();
  copy.length = createRandomNumber(1, arr.length);

  return copy;
};

var createAdvertisments = function () {
  var advertisments = [];

  for (var i = 0; i < ADVERTISMENT_LIMIT; i++) {
    advertisments.push(createAdvertisment(i));
  }

  return advertisments;
};

var createMapPinElement = function (templateElement, data) {
  var element = templateElement.cloneNode(true);

  element.style.left = data.location.x.toString() + 'px';
  element.style.top = data.location.y.toString() + 'px';
  element.querySelector('img').src = data.author.avatar;
  element.querySelector('img').alt = data.offer.title;

  return element;
};

var createMapPinFragment = function (templateElement, advertisments) {
  var fragment = document.createDocumentFragment();

  advertisments.forEach(function (advertisment) {
    fragment.appendChild(
        createMapPinElement(templateElement, advertisment)
    );
  });

  return fragment;
};

var createMapCardFragment = function (templateElement, data) {
  var element = templateElement.cloneNode(true);
  element.querySelector('.popup__title').textContent = data.offer.title;
  element.querySelector('.popup__text--address').textContent = data.offer.address;
  element.querySelector('.popup__text--price').textContent = data.offer.price + PRICE_SIGN;
  element.querySelector('.popup__type').textContent = FLAT_TYPES_MAP[data.offer.type];
  element.querySelector('.popup__text--capacity').textContent = data.offer.rooms.toString() + ' комнаты для ' + data.offer.guests.toString() + ' гостей';
  element.querySelector('.popup__text--time').textContent = 'Заезд после ' + data.offer.checkin + ' выезд до ' + data.offer.checkout;
  renderFeatureElements(element, data);
  renderPhotosElements(element, data);
  element.querySelector('.popup__description').textContent = data.offer.description;
  element.querySelector('.popup__avatar').src = data.author.avatar;

  return element;
};

var renderFeatureElements = function (element, data) {
  var featureContainerElement = element.querySelector('.popup__features');
  var featureListElement = element.querySelectorAll('.popup__feature');
  for (var i = featureListElement.length - 1; i >= 0; i--) {
    if (featureListElement[i].classList[1] !== FEATURES_MAP[data.offer.features[i]]) {
      featureContainerElement.removeChild(featureListElement[i]);
    }
  }

  return featureListElement;
};

var renderPhotosElements = function (element, data) {
  var fragment = document.createDocumentFragment();
  var popupPhotosElement = element.querySelector('.popup__photos');
  var popupPhotoElementRemoved = popupPhotosElement.removeChild(popupPhotosElement.querySelector('.popup__photo'));
  var popupPhotoElementFragment;
  data.offer.photos.forEach(function (photo) {
    popupPhotoElementFragment = popupPhotoElementRemoved.cloneNode(true);
    popupPhotoElementFragment.src = photo;
    fragment.appendChild(popupPhotoElementFragment);
  });

  return popupPhotosElement.appendChild(fragment);
};

var mapElement = document.querySelector('.map');
mapElement.classList.remove('map--faded');

var mapPinTemplate = document.querySelector('#pin').content
    .querySelector('.map__pin');
var mapPinsElement = document.querySelector('.map__pins');

var mapCardTemplate = document.querySelector('#card').content
    .querySelector('.map__card');

var mapFiltersContainerElement = document.querySelector('.map__filters-container');

var advertisments = createAdvertisments();
var mapPinFragment = createMapPinFragment(mapPinTemplate, advertisments);
mapPinsElement.appendChild(mapPinFragment);

var mapCardElement = createMapCardFragment(mapCardTemplate, advertisments[0]);
mapElement.insertBefore(mapCardElement, mapFiltersContainerElement);
