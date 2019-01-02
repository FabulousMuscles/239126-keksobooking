'use strict';

(function () {
  var ANY_TYPE_VALUE = 'any';
  var DEBOUNCE_INTERVAL = 400;

  var OFFER_TYPE = 'type';
  var OFFER_ROOMS = 'rooms';
  var OFFER_GUESTS = 'guests';

  var PRICE_LOW = 10000;
  var PRICE_HIGH = 50000;

  var createSelectFilter = function (element, fieldName) {
    return function (advertisment) {
      if (element.value === ANY_TYPE_VALUE) {
        return true;
      }

      return advertisment.offer[fieldName].toString() === element.value;
    };
  };

  var filterByPrice = function (advertisment) {
    switch (priceFilterElement.value) {
      case 'low':
        return advertisment.offer.price <= PRICE_LOW;
      case 'high':
        return advertisment.offer.price >= PRICE_HIGH;
      case 'middle':
        return advertisment.offer.price >= PRICE_LOW && advertisment.offer.price <= PRICE_HIGH;
      default:
        return true;
    }
  };

  var filterByFeatures = function (advertisment) {
    var selectedFeatures = Array
      .from(featureElements)
      .filter(function (featureElement) {
        return featureElement.checked;
      })
      .every(function (featureElement) {
        return advertisment.offer.features.indexOf(featureElement.value) !== -1;
      })

      return selectedFeatures;
  };

  var filter = function (advertisments) {
    return advertisments.filter(function (advertisment) {
      return filterByFlat(advertisment)
      && filterByRooms(advertisment)
      && filterByGuests(advertisment)
      && filterByPrice(advertisment)
      && filterByFeatures(advertisment);
    });
  };

  var debounce = function (callback) {
    if (lastTimeout) {
      clearTimeout(lastTimeout);
    }
    lastTimeout = setTimeout(callback, DEBOUNCE_INTERVAL);
  };

  var createFilterFormChangeHandler = function (advertisments, onFilterChanged) {
    return function () {
      debounce(function () {
        onFilterChanged(filter(advertisments));
      });
    };
  };

  var filterFormElement = document.querySelector('.map__filters');
  var featureElements = filterFormElement.querySelectorAll('input');
  var flatTypeFilterElement = filterFormElement.querySelector('#housing-type');
  var roomsFilterElement = filterFormElement.querySelector('#housing-rooms');
  var guestsFilterElement = filterFormElement.querySelector('#housing-guests');
  var priceFilterElement = filterFormElement.querySelector('#housing-price');

  var filterByFlat = createSelectFilter(flatTypeFilterElement, OFFER_TYPE);
  var filterByRooms = createSelectFilter(roomsFilterElement, OFFER_ROOMS);
  var filterByGuests = createSelectFilter(guestsFilterElement, OFFER_GUESTS);

  var filterFormChangeHandler;
  var lastTimeout;

  window.filters = {
    activate: function (data, onFilterChanged) {
      filterFormChangeHandler = createFilterFormChangeHandler(data, onFilterChanged);
      filterFormElement.addEventListener('change', filterFormChangeHandler);
    },
    deactivate: function () {
      filterFormElement.removeEventListener('change', filterFormChangeHandler);
    }
  };
})();
