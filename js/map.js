'use strict';

var URL_AVATAR_PATTERN = 'img/avatars/user0{index}.png';
var URL_ASSET_PATTERN = 'http://o0.github.io/assets/images/tokyo/{index}.jpg';
var TEMPLATE_ROOMS_GUESTS = '{rooms} комнаты для {guests} гостей';
var TEMPLATE_CHECKIN_AND_CHECKOUT = 'Заезд после {checkin}, выезд до {checkout}';
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
var LAYOUT_MAX_X_SIZE = 1100;
var LAYOUT_MIN_X_SIZE = 100;
var LAYOUT_MAX_Y_SIZE = 630;
var LAYOUT_MIN_Y_SIZE = 130;
var ADVERTISMENT_LIMIT = 8;
var TEMPLATE_PRICE_SIGN = '{price}₽/ночь';
var TYPE_FLAT_MAP = {
  flat: 'Квартира',
  bungalo: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец'
};
var FEATURE_CLASSNAME_MAP = {
  wifi: 'popup__feature--wifi',
  dishwasher: 'popup__feature--dishwasher',
  parking: 'popup__feature--parking',
  washer: 'popup__feature--washer',
  elevator: 'popup__feature--elevator',
  conditioner: 'popup__feature--conditioner'
};

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

var createPhotoUrl = function (index) {
  return URL_ASSET_PATTERN.replace('{index}', index);
};

var createAvatarUrl = function (index) {
  return URL_AVATAR_PATTERN.replace('{index}', index);
};

var createTimeText = function (checkin, checkout) {
  return TEMPLATE_CHECKIN_AND_CHECKOUT
      .replace('{checkin}', checkin)
      .replace('{checkout}', checkout);
};

var createCapacityText = function (rooms, guests) {
  return TEMPLATE_ROOMS_GUESTS
      .replace('{rooms}', rooms)
      .replace('{guests}', guests);
};

var createPriceText = function (price) {
  return TEMPLATE_PRICE_SIGN.replace('{price}', price);
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

var createMapPinElement = function (templateElement, data) {
  var element = templateElement.cloneNode(true);
  element.style.left = data.location.x + 'px';
  element.style.top = data.location.y + 'px';
  element.querySelector('img').src = data.author.avatar;
  element.querySelector('img').alt = data.offer.title;

  return element;
};

var createPinFragment = function (templateElement, advertisments) {
  var fragment = document.createDocumentFragment();

  advertisments.forEach(function (advertisment) {
    fragment.appendChild(
        createMapPinElement(templateElement, advertisment)
    );
  });

  return fragment;
};

var createCardFragment = function (templateElement, data) {
  var element = templateElement.cloneNode(true);
  var offer = data.offer;

  element.querySelector('.popup__title').textContent = offer.title;
  element.querySelector('.popup__text--address').textContent = offer.address;
  element.querySelector('.popup__text--price').textContent = createPriceText(offer.price);
  element.querySelector('.popup__type').textContent = TYPE_FLAT_MAP[offer.type];
  element.querySelector('.popup__text--capacity').textContent = createCapacityText(offer.rooms, offer.guests);
  element.querySelector('.popup__text--time').textContent = createTimeText(offer.checkin, offer.checkout);
  element.querySelector('.popup__description').textContent = offer.description;
  element.querySelector('.popup__avatar').src = data.author.avatar;

  renderFeatureElements(element, offer.features);
  renderPhotosFragment(element, offer.photos);

  return element;
};

var renderFeatureElements = function (element, features) {
  var featuresElement = element.querySelector('.popup__features');
  var featureElements = element.querySelectorAll('.popup__feature');
  Array.prototype.forEach.call(featureElements, function (el, i) {
    if (!el.classList.contains(FEATURE_CLASSNAME_MAP[features[i]])) {
      featuresElement.removeChild(el);
    }
  });

  return featureElements;
};

var renderPhotosFragment = function (element, photos) {
  var fragment = document.createDocumentFragment();
  var photosElement = element.querySelector('.popup__photos');
  var photoElementRemoved = photosElement.removeChild(photosElement.querySelector('.popup__photo'));
  var photoElementFragment;

  photos.forEach(function (photo) {
    photoElementFragment = photoElementRemoved.cloneNode(true);
    photoElementFragment.src = createPhotoUrl(photo);
    fragment.appendChild(photoElementFragment);
  });

  return photosElement.appendChild(fragment);
};

var mapElement = document.querySelector('.map');
var mapPinTemplateElement = document.querySelector('#pin').content.querySelector('.map__pin');
var mapPinsElement = document.querySelector('.map__pins');
var mapCardTemplateElement = document.querySelector('#card').content.querySelector('.map__card');
var mapFiltersContainerElement = document.querySelector('.map__filters-container');

var advertisments = createAdvertisments();
var mapPinFragment = createPinFragment(mapPinTemplateElement, advertisments);
var mapCardElement = createCardFragment(mapCardTemplateElement, advertisments[0]);

mapElement.classList.remove('map--faded');
mapPinsElement.appendChild(mapPinFragment);
mapElement.insertBefore(mapCardElement, mapFiltersContainerElement);
