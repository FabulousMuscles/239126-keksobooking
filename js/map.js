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
var FLAT_TYPE_MAP = {
  flat: 'Квартира',
  bungalo: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец'
};
var FLAT_PRICE_MAP = {
  flat: 1000,
  bungalo: 0,
  house: 5000,
  palace: 10000
};
var PHOTO_WIDTH = 45;
var PHOTO_HEIGHT = 40;
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

var createPinClickHander = function (data) {
  return function () {
    openCard(data);
  };
};

var createPinElement = function (data) {
  var element = templatePinElement.cloneNode(true);

  element.style.left = data.location.x + 'px';
  element.style.top = data.location.y + 'px';
  element.querySelector('img').src = data.author.avatar;
  element.querySelector('img').alt = data.offer.title;

  element.addEventListener('click', createPinClickHander(data));

  return element;
};

var createPinsFragment = function () {
  var fragment = document.createDocumentFragment();

  advertisments.forEach(function (advertisment) {
    fragment.appendChild(
        createPinElement(advertisment)
    );
  });

  return fragment;
};

var renderCardElement = function (cardElement, data) {
  var offer = data.offer;
  var featuresElement = cardElement.querySelector('.popup__features');
  var photosElement = cardElement.querySelector('.popup__photos');

  cardElement.querySelector('.popup__title').textContent = offer.title;
  cardElement.querySelector('.popup__text--address').textContent = offer.address;
  cardElement.querySelector('.popup__text--price').textContent = createPriceText(offer.price);
  cardElement.querySelector('.popup__type').textContent = FLAT_TYPE_MAP[offer.type];
  cardElement.querySelector('.popup__text--capacity').textContent = createCapacityText(offer.rooms, offer.guests);
  cardElement.querySelector('.popup__text--time').textContent = createTimeText(offer.checkin, offer.checkout);
  cardElement.querySelector('.popup__description').textContent = offer.description;
  cardElement.querySelector('.popup__avatar').src = data.author.avatar;

  renderFeatureElements(featuresElement, offer.features);
  renderPhotosFragment(photosElement, offer.photos);
};

var renderFeatureElements = function (featuresElement, features) {
  var fragment = document.createDocumentFragment();

  features.forEach(function (feature) {
    var featureElement = document.createElement('li');
    featureElement.className = 'popup__feature popup__feature--' + feature;
    fragment.appendChild(featureElement);
  });

  featuresElement.innerHTML = '';
  featuresElement.appendChild(fragment);
};

var renderPhotosFragment = function (photosElement, photos) {
  var fragment = document.createDocumentFragment();

  photos.forEach(function (photo) {
    var photoElement = document.createElement('img');

    photoElement.src = createPhotoUrl(photo);
    photoElement.className = 'popup__photo';
    photoElement.width = PHOTO_WIDTH;
    photoElement.height = PHOTO_HEIGHT;

    fragment.appendChild(photoElement);
  });

  photosElement.innerHTML = '';
  photosElement.appendChild(fragment);
};

var closeCard = function () {
  mapElement.removeChild(cardElement);

  cardElement.removeEventListener('keydown', cardClickHandler);
  document.removeEventListener('keydown', documentKeydownHandler);

  cardElement = null;
};

var openCard = function (data) {
  if (!cardElement) {
    var element = templateCardElement.cloneNode(true);

    renderCardElement(element, data);

    mapElement.insertBefore(element, filtersElement);

    element.addEventListener('click', cardClickHandler);
    document.addEventListener('keydown', documentKeydownHandler);

    cardElement = element;
  } else {
    renderCardElement(cardElement, data);
  }
};

var cardClickHandler = function (evt) {
  if (evt.target.classList.contains('popup__close')) {
    closeCard();
  }
};

var documentKeydownHandler = function (evt) {
  if (evt.keyCode === KEYCODE_ESC) {
    closeCard();
  }
};

var pinMouseDownHandler = function (evt) {
  pinsElement.appendChild(createPinsFragment());

  mapElement.classList.remove('map--faded');
  formElement.classList.remove('ad-form--disabled');

  fieldAddressElement.value = evt.target.offsetLeft + ' ' + evt.target.offsetTop;
  mainPinElement.removeEventListener('mousedown', pinMouseDownHandler);
  formElement.addEventListener('click', formElementClickHandler);
};


var setFormDefaultResults = function () {
  fieldAddressElement.value = ADRESS_ORIGIN_X + ' ' + ADRESS_ORIGIN_Y;
  flatPrice.placeholder = FLAT_PRICE_MAP['flat'];
  roomNumber.options[0].selected = true;
  flatType.options[1].selected = true;
  timeIn.options[0].selected = true;
  timeOut.options[0].selected = true;
  title.value = '';
  price.value = '';
  setRoomSelect(roomNumber.options[0], guestsCapacity.options);
};

var setTimeSelect = function (target, options) {
  for (var i = 0; i < options.length; i++) {
    if (target.value === options[i].value) {
      options[i].selected = true;
      return;
    }
  }
};

var disableAllGuests = function (guest) {
  if (guest.value === '0') {
    guest.selected = true;
  } else {
    guest.disabled = true;
  }
};

var setRoomForGuests = function (room, guest) {
  guest.disabled = false;
  if (room.value === '100') {
    disableAllGuests(guest);
  } else if (room.value === guest.value) {
    guest.selected = true;
  } else if (guest.value === '0' || room.value < guest.value) {
    guest.disabled = true;
  }
};


var setRoomSelect = function (room, guests) {
  for (var i = 0; i < guests.length; i++) {
    setRoomForGuests(room, guests[i]);
  }
};

var formElementClickHandler = function (evt) {
  if (evt.target.parentElement.id === 'type') {
    flatPrice.min = FLAT_PRICE_MAP[evt.target.value];
    flatPrice.placeholder = flatPrice.min;
  } else if (evt.target.parentElement.id === 'timein') {
    setTimeSelect(evt.target, timeOut.options);
  } else if (evt.target.parentElement.id === 'timeout') {
    setTimeSelect(evt.target, timeIn.options);
  } else if (evt.target.parentElement.id === 'room_number') {
    setRoomSelect(evt.target, guestsCapacity.options);
  }
};

var formElementResetHandler = function (evt) {
  evt.preventDefault();
  setFormDefaultResults();
};

var cardElement;
var mapElement = document.querySelector('.map');
var mainPinElement = mapElement.querySelector('.map__pin--main');
var pinsElement = mapElement.querySelector('.map__pins');
var filtersElement = mapElement.querySelector('.map__filters-container');

var templatePinElement = document.querySelector('#pin').content.querySelector('.map__pin');
var templateCardElement = document.querySelector('#card').content.querySelector('.map__card');

var formElement = document.querySelector('.ad-form');
var fieldAddressElement = formElement.querySelector('#address');
var flatType = formElement.querySelector('#type');
var flatPrice = formElement.querySelector('#price');
var timeIn = formElement.querySelector('#timein');
var timeOut = formElement.querySelector('#timeout');
var roomNumber = formElement.querySelector('#room_number');
var guestsCapacity = formElement.querySelector('#capacity');
var title = formElement.querySelector('#title');
var price = formElement.querySelector('#price');

var advertisments = createAdvertisments();

setFormDefaultResults();

mainPinElement.addEventListener('mousedown', pinMouseDownHandler);
formElement.addEventListener('reset', formElementResetHandler);
