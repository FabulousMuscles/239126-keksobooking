'use strict';
(function () {
  var ANY_TYPE_VALUE = 'any';
  var OFFER_TYPE = 'type';
  var OFFER_ROOMS = 'rooms';
  var OFFER_GUESTS = 'guests';
  var ROOMS_FILTER_MAP = {
    any: 'any',
    '1': 1,
    '2': 2,
    '3': 3
  };
  var GUESTS_FILTER_MAP = {
    any: 'any',
    '0': 0,
    '1': 1,
    '2': 2
  };
  var PRICE_FILTER_MAP = {
    any: 'any',
    low: 10000,
    high: 50000,
    middle: [10000, 50000]
  };

  var filterAdvertisments = function(filterValue, advertismentValue) {
    if (filterValue !== ANY_TYPE_VALUE) {
      return advertisments.filter(function(advertisment) {
        return advertisment.offer[this] === filterValue;
      }, advertismentValue);
    } else {
      return advertisments;
    }
  }

  var createFlatTypeHandler = function (onFilterChanged) {
    return function () {
      var filteredbyFlat = filterAdvertisments(flatTypeFilterElement.value, OFFER_TYPE);
    }
  };

  var createPriceHandler = function (onFilterChanged) {
    return function () {
      console.log(advertisments);
    };
  };

  var createRoomsHadler = function (onFilterChanged) {
    return function () {
      var filteredbyRooms = filterAdvertisments(ROOMS_FILTER_MAP[roomsFilterElement.value], OFFER_ROOMS);
      onFilterChanged(filteredbyRooms);
    };
  };

  var createGuestsHandler = function (onFilterChanged) {
    return function () {
      var filteredbyGuests = filterAdvertisments(GUESTS_FILTER_MAP[guestsFilterElement.value], OFFER_GUESTS);
      console.log(filteredbyGuests);
    };
  };

  var createFlatFeaturesHandler = function (onFilterChanged) {
    return function () {
      console.log(advertisments);
    };
  };

  var filterFormElement = document.querySelector('.map__filters');
  var flatTypeFilterElement = filterFormElement.querySelector('#housing-type');
  var priceFilterElement = filterFormElement.querySelector('#housing-price');
  var roomsFilterElement = filterFormElement.querySelector('#housing-rooms');
  var guestsFilterElement = filterFormElement.querySelector('#housing-guests');
  var flatFeaturesFilterElement = filterFormElement.querySelector('#housing-features');

  var filteredList = [];
  var advertisments;
  var flatTypeChangeHandler;
  var priceChangeHandler;
  var roomsChangeHandler;
  var guestsChangeHandler;

  window.filters = {
    activate: function (data, onFilterChanged) {
      advertisments = data;
      flatTypeChangeHandler = createFlatTypeHandler(onFilterChanged);
      priceChangeHandler = createPriceHandler(onFilterChanged);
      roomsChangeHandler = createRoomsHadler(onFilterChanged);
      guestsChangeHandler = createGuestsHandler(onFilterChanged);
      flatTypeFilterElement.addEventListener('change', flatTypeChangeHandler);
      priceFilterElement.addEventListener('change', priceChangeHandler);
      roomsFilterElement.addEventListener('change', roomsChangeHandler);
      guestsFilterElement.addEventListener('change', guestsChangeHandler);
    },
    deactivate: function () {
      flatTypeFilterElement.removeEventListener('change', flatTypeChangeHandler);
      priceFilterElement.removeEventListener('change', priceChangeHandler);
      roomsFilterElement.removeEventListener('change', roomsChangeHandler);
      guestsFilterElement.removeEventListener('change', guestsChangeHandler);
    }
  }
})();
