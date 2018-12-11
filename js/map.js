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
var KEYCODE_ESC = 27;
var ADRESS_ORIGIN_X = 570;
var ADRESS_ORIGIN_Y = 375;

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

  element.addEventListener('click', function () {
    openCardElement(data);
  });

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

var createCardElement = function (templateElement, data) {
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

  element.addEventListener('click', elementClickHandler);

  renderFeatureElements(element, offer.features);
  renderPhotosFragment(element, offer.photos);

  return element;
};

var renderFeatureElements = function (element, features) {
  var fragment = document.createDocumentFragment();

  var featureElementTemplate;
  var featuresElementContainer = element.querySelector('.popup__features');
  var featureElements = featuresElementContainer.querySelectorAll('.popup__feature');
  var featureElementRemovedClone = featureElements[0].cloneNode(true);

  featureElementRemovedClone.classList.remove('popup__feature--wifi');

  Array.prototype.forEach.call(featureElements, function (featureElement) {
    featuresElementContainer.removeChild(featureElement);
  });

  features.forEach(function (feature) {
    featureElementTemplate = featureElementRemovedClone.cloneNode(true);
    featureElementTemplate.classList.add(FEATURE_CLASSNAME_MAP[feature]);
    fragment.appendChild(featureElementTemplate);
  });

  return featuresElementContainer.appendChild(fragment);
};

var renderPhotosFragment = function (element, photos) {
  var fragment = document.createDocumentFragment();
  var photosElement = element.querySelector('.popup__photos');

  var photoElementFragment;
  var photoElementRemoved = photosElement.removeChild(photosElement.querySelector('.popup__photo'));

  photos.forEach(function (photo) {
    photoElementFragment = photoElementRemoved.cloneNode(true);
    photoElementFragment.src = createPhotoUrl(photo);
    fragment.appendChild(photoElementFragment);
  });

  return photosElement.appendChild(fragment);
};

var insertCardElement = function (data) {
  mapCardElement = createCardElement(mapCardTemplateElement, data);

  mapElement.insertBefore(mapCardElement, mapFiltersContainerElement);
  document.addEventListener('keydown', documentKeydownHandler);
};

var closeCardElement = function () {
  mapElement.removeChild(mapCardElement);
  mapCardElement = null;
  document.removeEventListener('keydown', documentKeydownHandler);
};

var openCardElement = function (data) {
  if (!mapCardElement) {
    insertCardElement(data);
  } else {
    closeCardElement();
    insertCardElement(data);
  }
};

var elementClickHandler = function (evt) {
  if (evt.target.classList.contains('popup__close')) {
    closeCardElement();
  }
};

var documentKeydownHandler = function (evt) {
  if (evt.keyCode === KEYCODE_ESC) {
    closeCardElement();
  }
};

var mapMainPinElementMouseupHandler = function (evt) {
  mapElement.classList.remove('map--faded');
  formContainerElement.classList.remove('ad-form--disabled');
  mapPinsElement.appendChild(mapPinFragment);
  adressElement.value = evt.target.offsetLeft + ' ' + evt.target.offsetTop;
};

var mapCardElement;
var mapElement = document.querySelector('.map');
var mapMainPinElement = mapElement.querySelector('.map__pin--main');
var mapPinTemplateElement = document.querySelector('#pin').content.querySelector('.map__pin');
var mapPinsElement = mapElement.querySelector('.map__pins');
var mapCardTemplateElement = document.querySelector('#card').content.querySelector('.map__card');
var mapFiltersContainerElement = mapElement.querySelector('.map__filters-container');
var formContainerElement = document.querySelector('.ad-form');
var adressElement = formContainerElement.querySelector('#address');
var advertisments = createAdvertisments();
var mapPinFragment = createPinFragment(mapPinTemplateElement, advertisments);

adressElement.value = ADRESS_ORIGIN_X + ' ' + ADRESS_ORIGIN_Y;

mapMainPinElement.addEventListener('mouseup', mapMainPinElementMouseupHandler);
