'use strict';

(function () {
  var ANY_TYPE_VALUE = 'any';
  var DEBOUNCE_INTERVAL = 400;

  var OFFER_TYPE = 'type';
  var OFFER_ROOMS = 'rooms';
  var OFFER_GUESTS = 'guests';
  var FLAT_TYPE_FILTER_MAP = {
    palace: 'palace',
    flat: 'flat',
    house: 'house',
    bungalo: 'bungalo'
  };

  var ROOMS_FILTER_MAP = {
    '1': 1,
    '2': 2,
    '3': 3
  };

  var GUESTS_FILTER_MAP = {
    '0': 0,
    '1': 1,
    '2': 2
  };

  var createSelectFilter = function (element, fieldName, valueMap) {
    return function (advertisment) {
      if (element.value === ANY_TYPE_VALUE) {
        return true;
      }

      return advertisment.offer[fieldName] === valueMap[element.value];
    };
  };

  var filterByPrice = function (advertisment) {
    switch (priceFilterElement.value) {
      case 'low':
        return advertisment.offer.price < 10000;
      case 'high':
        return advertisment.offer.price > 50000;
      case 'middle':
        return advertisment.offer.price >= 10000 && advertisment.offer.price <= 50000;
      default:
        return true;
    }
  };

  var filterByFeatures = function (advertisment) {
    var isCheckedFeature;
    var filteredByFeatures;

    filteredByFeatures = Array.prototype.every.call(featureElements, function (featureElement) {
      return !featureElement.checked;
    });

    for (var i = 0; i < featureElements.length; i++) {
      isCheckedFeature = featureElements[i];
      if (isCheckedFeature.checked) {
        filteredByFeatures = advertisment.offer.features.indexOf(isCheckedFeature.value) !== -1;
      }
    }

    return filteredByFeatures;
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

  var filterByFlat = createSelectFilter(flatTypeFilterElement, OFFER_TYPE, FLAT_TYPE_FILTER_MAP);
  var filterByRooms = createSelectFilter(roomsFilterElement, OFFER_ROOMS, ROOMS_FILTER_MAP);
  var filterByGuests = createSelectFilter(guestsFilterElement, OFFER_GUESTS, GUESTS_FILTER_MAP);

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
