'use strict';

(function () {
  var TEMPLATE_PRICE_SIGN = '{price}₽/ночь';
  var TEMPLATE_ROOMS_GUESTS = '{rooms} комнаты для {guests} гостей';
  var TEMPLATE_CHECKIN_AND_CHECKOUT = 'Заезд после {checkin}, выезд до {checkout}';

  var PHOTO_WIDTH = 45;
  var PHOTO_HEIGHT = 40;
  var KEYCODE_ESC = 27;

  var FlatTypeMap = { // @TODO: Критерий Б8
    FLAT: 'Квартира',
    BUNGALO: 'Бунгало',
    HOUSE: 'Дом',
    PALACE: 'Дворец'
  };

  var createProperties = function (offer, author) {
    return [
      {
        selector: '.popup__title',
        value: offer.title,
        attribute: 'textContent'
      },
      {
        selector: '.popup__text--address',
        value: offer.address,
        attribute: 'textContent'
      },
      {
        selector: '.popup__text--price',
        value: createPriceText(offer.price),
        attribute: 'textContent'
      },
      {
        selector: '.popup__type',
        value: FlatTypeMap[offer.type.toUpperCase()],
        attribute: 'textContent'
      },
      {
        selector: '.popup__text--capacity',
        value: createCapacityText(offer.rooms, offer.guests),
        attribute: 'textContent'
      },
      {
        selector: '.popup__text--time',
        value: createTimeText(offer.checkin, offer.checkout),
        attribute: 'textContent'
      },
      {
        selector: '.popup__description',
        value: offer.description,
        attribute: 'textContent'
      },
      {
        selector: '.popup__avatar',
        value: author.avatar,
        attribute: 'src'
      }
    ];
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

      photoElement.src = photo;
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
    var author = data.author;
    var featuresElement = cardElement.querySelector('.popup__features');
    var photosElement = cardElement.querySelector('.popup__photos');

    var properties = createProperties(offer, author);

    properties.forEach(function (property) {
      var element = cardElement.querySelector(property.selector);
      if (property.value) {
        element[property.attribute] = property.value;
      } else {
        element.classList.add('hidden');
      }
    });

    renderFeatureElements(featuresElement, offer.features);
    renderPhotosFragment(photosElement, offer.photos);
  };

  var openCard = function (data, pinElement) {
    if (!cardElement) {
      var element = templateCardElement.cloneNode(true);

      cardClickHandler = createCardClickHandler(pinElement);
      documentKeydownHandler = createDocumentKeydownHandler(pinElement);

      renderCardElement(element, data);

      mapElement.insertBefore(element, filtersElement);

      element.addEventListener('click', cardClickHandler);
      document.addEventListener('keydown', documentKeydownHandler);

      cardElement = element;
      pinElement.classList.add('map__pin--active');
    } else {
      renderCardElement(cardElement, data);
    }
  };

  var closeCard = function (pinElement) {
    if (cardElement) {
      mapElement.removeChild(cardElement);

      cardElement.removeEventListener('click', cardClickHandler);
      document.removeEventListener('keydown', documentKeydownHandler);

      cardElement = null;
      pinElement.classList.remove('map__pin--active');
    }
  };

  var createCardClickHandler = function (pinElement) {
    return function (evt) {
      if (evt.target.classList.contains('popup__close')) {
        closeCard(pinElement);
      }
    };
  };

  var createDocumentKeydownHandler = function (pinElement) {
    return function (evt) {
      if (evt.keyCode === KEYCODE_ESC) {
        closeCard(pinElement);
      }
    };
  };

  var cardClickHandler;
  var documentKeydownHandler;
  var cardElement;
  var mapElement = document.querySelector('.map');
  var filtersElement = mapElement.querySelector('.map__filters-container');
  var templateCardElement = document.querySelector('#card').content.querySelector('.map__card');

  window.card = {
    open: openCard,
    close: closeCard
  };
})();
