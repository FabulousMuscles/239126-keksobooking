'use strict';

(function () {
  var ANY_TYPE_VALUE = 'any';
  var DEBOUNCE_INTERVAL = 400;

  var OFFER_TYPE = 'type';
  var OFFER_ROOMS = 'rooms';
  var OFFER_GUESTS = 'guests';
  var ROOMS_FILTER_MAP = {
    'any': 'any',
    '1': 1,
    '2': 2,
    '3': 3
  };
  var GUESTS_FILTER_MAP = {
    'any': 'any',
    '0': 0,
    '1': 1,
    '2': 2
  };

  var createSelectFilter = function (elementValue, fieldName) {
    return function (advertisment) {
      if (elementValue === ANY_TYPE_VALUE) {
        return true;
      }

      return advertisment.offer[fieldName] === elementValue;
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

  var filterByFlat = function () {
    return createSelectFilter(flatTypeFilterElement.value, OFFER_TYPE);
  };

  var filterByRooms = function () {
    return createSelectFilter(ROOMS_FILTER_MAP[roomsFilterElement.value], OFFER_ROOMS);
  };

  var filterByGuests = function () {
    return createSelectFilter(GUESTS_FILTER_MAP[guestsFilterElement.value], OFFER_GUESTS);
  };

  var filter = function (advertisments) {
    return advertisments
      .filter(filterByFlat())
      .filter(filterByRooms())
      .filter(filterByGuests())
      .filter(filterByPrice)
      .filter(filterByFeatures);
  };

  var debounce = function (callback) {
    if (lastTimeout) {
      clearTimeout(lastTimeout);
    }
    lastTimeout = setTimeout(callback, DEBOUNCE_INTERVAL);
  };

  var returnOnfilterChanged = function (advertisments, onFilterChanged) {
    return function () {
      onFilterChanged(filter(advertisments));
    };
  };

  var createFilterFormChangeHandler = function (advertisments, onFilterChanged) {
    return function () {
      debounce(returnOnfilterChanged(advertisments, onFilterChanged));
    };
  };

  var filterFormElement = document.querySelector('.map__filters');
  var featureElements = filterFormElement.querySelectorAll('input');
  var flatTypeFilterElement = filterFormElement.querySelector('#housing-type');
  var roomsFilterElement = filterFormElement.querySelector('#housing-rooms');
  var guestsFilterElement = filterFormElement.querySelector('#housing-guests');
  var priceFilterElement = filterFormElement.querySelector('#housing-price');

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
