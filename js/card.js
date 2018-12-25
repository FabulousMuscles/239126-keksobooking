'use strict';

(function () {
  var URL_ASSET_PATTERN = 'http://o0.github.io/assets/images/tokyo/{index}.jpg';
  var TEMPLATE_PRICE_SIGN = '{price}₽/ночь';
  var TEMPLATE_ROOMS_GUESTS = '{rooms} комнаты для {guests} гостей';
  var TEMPLATE_CHECKIN_AND_CHECKOUT = 'Заезд после {checkin}, выезд до {checkout}';

  var PHOTO_WIDTH = 45;
  var PHOTO_HEIGHT = 40;

  var KEYCODE_ESC = 27;

  var FLAT_TYPE_MAP = {
    flat: 'Квартира',
    bungalo: 'Бунгало',
    house: 'Дом',
    palace: 'Дворец'
  };

  var createPhotoUrl = function (index) {
    return URL_ASSET_PATTERN.replace('{index}', index);
  };

  var createTimeText = function (checkin, checkout) {
    return TEMPLATE_CHECKIN_AND_CHECKOUT
      .replace('{checkin}', checkin)
      .replace('{checkout}', checkout);
  };

  var createPriceText = function (price) {
    return TEMPLATE_PRICE_SIGN.replace('{price}', price);
  };

  var createCapacityText = function (rooms, guests) {
    return TEMPLATE_ROOMS_GUESTS
      .replace('{rooms}', rooms)
      .replace('{guests}', guests);
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

  var closeCard = function () {
    mapElement.removeChild(cardElement);

    cardElement.removeEventListener('keydown', cardClickHandler);
    document.removeEventListener('keydown', documentKeydownHandler);

    cardElement = null;
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

  var cardElement;
  var mapElement = document.querySelector('.map');
  var filtersElement = mapElement.querySelector('.map__filters-container');
  var templateCardElement = document.querySelector('#card').content.querySelector('.map__card');

  window.card = {
    open: function (data) {
      openCard(data);
    }
  };
})();
