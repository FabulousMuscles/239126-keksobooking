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
    low: 10000,
    high: 50000,
    middle: [10000, 50000]
  };

  var createSelectFilter = function(element, fieldName) {
    return function(advertisment) {
      if (element.value === ANY_TYPE_VALUE) {
        return true
      }

      return advertisment.offer[fieldName] === element.value
    }
  };

  var filterByPrice = function(advertisment) {
    if (priceFilterElement.value === ANY_TYPE_VALUE) {
      return true
    } else if (priceFilterElement.value === 'low') {
      return advertisment.offer.price < 10000;
    } else if (priceFilterElement.value === 'high') {
      return advertisment.offer.price > 50000;
    } else if (priceFilterElement.value === 'middle') {
      return advertisment.offer.price >= 10000 && advertisment.offer.price <= 50000;
    }
  }

    /**
    <fieldset id="housing-features" class="map__features">
      <input type="checkbox" name="features" value="wifi" id="filter-wifi" class="map__checkbox visually-hidden">
      <label class="map__feature map__feature--wifi" for="filter-wifi">Wi-Fi</label>
      <input type="checkbox" name="features" value="dishwasher" id="filter-dishwasher" class="map__checkbox visually-hidden">
      <label class="map__feature map__feature--dishwasher" for="filter-dishwasher">Посудомоечная машина</label>
      <input type="checkbox" name="features" value="parking" id="filter-parking" class="map__checkbox visually-hidden">
      <label class="map__feature map__feature--parking" for="filter-parking">Парковка</label>
      <input type="checkbox" name="features" value="washer" id="filter-washer" class="map__checkbox visually-hidden">
      <label class="map__feature map__feature--washer" for="filter-washer">Стиральная машина</label>
      <input type="checkbox" name="features" value="elevator" id="filter-elevator" class="map__checkbox visually-hidden">
      <label class="map__feature map__feature--elevator" for="filter-elevator">Лифт</label>
      <input type="checkbox" name="features" value="conditioner" id="filter-conditioner" class="map__checkbox visually-hidden">
      <label class="map__feature map__feature--conditioner" for="filter-conditioner">Кондиционер</label>
    </fieldset>
   */

   //
  var filterByFeatures = function(advertisment) {
    var filteredByFeatures;
    var unCheckedList = [];

    Array.prototype.forEach.call(featureInputElements, function(featureElement) {
     if (featureElement.checked) {
      filteredByFeatures = advertisment.offer.features.indexOf(featureElement.value) !== -1;
     } else {
      unCheckedList.push(featureElement);
     }
    });

    if (unCheckedList.length === featureInputElements.length) {
      return true;
    } else {
      return filteredByFeatures;
    }
  };

    ///advertisment.offer.features: ["wifi", "dishwasher", "parking", "washer", "elevator",  "conditioner"]


  var filter = function(advertisments) {
    return advertisments
      .filter(createSelectFilter(flatTypeFilterElement, 'type'))
      .filter(createSelectFilter(roomsFilterElement, 'rooms'))
      .filter(createSelectFilter(guestsFilterElement, 'guests'))
      .filter(filterByPrice)
      .filter(filterByFeatures)
  };

  var createFilterFormChangeHandler = function(advertisments, onFilterChanged) {
    return function () {
      onFilterChanged(filter(advertisments));
    }
  };

  var filterFormElement = document.querySelector('.map__filters');
  var featureInputElements = filterFormElement.querySelectorAll('input');
  var flatTypeFilterElement = filterFormElement.querySelector('#housing-type');
  var roomsFilterElement = filterFormElement.querySelector('#housing-rooms');
  var guestsFilterElement = filterFormElement.querySelector('#housing-guests');
  var priceFilterElement = filterFormElement.querySelector('#housing-price');
  var flatFeaturesFilterElement = filterFormElement.querySelector('#housing-features');

  var filterFormChangeHandler;

  window.filters = {
    activate: function (data, onFilterChanged) {
      filterFormChangeHandler = createFilterFormChangeHandler(data, onFilterChanged);
      filterFormElement.addEventListener('change', filterFormChangeHandler);
    },
    deactivate: function () {
      filterFormElement.removeEventListener('change', filterFormChangeHandler);
    }
  }
})();
