'use strict';
(function () {

  var ADDRESS_ORIGIN_X = 570;
  var ADDRESS_ORIGIN_Y = 375;

  var FLAT_PRICE_MAP = {
    flat: 1000,
    bungalo: 0,
    house: 5000,
    palace: 10000
  };

  var VALIDATION_ROOM_CAPACITY_MAP = {
    '1': ['1'],
    '2': ['1', '2'],
    '3': ['1', '2', '3'],
    '100': ['0']
  };

  var enableDefaultAdress = function () {
    fieldAddressElement.value = ADDRESS_ORIGIN_X + ', ' + ADDRESS_ORIGIN_Y;
  };

  var setFlatPriceValue = function () {
    fieldFlatPriceElement.min = FLAT_PRICE_MAP[fieldFlatTypeElement.value];
    fieldFlatPriceElement.placeholder = fieldFlatPriceElement.min;
  };

  var setFieldCapacityValue = function () {
    var capacityValues = VALIDATION_ROOM_CAPACITY_MAP[fieldRoomNumberElement.value];

    fieldCapacityElement.value = capacityValues[0];

    Array.prototype.forEach.call(fieldCapacityElement.options, function (optionElement) {
      if (capacityValues.indexOf(optionElement.value) !== -1) {
        optionElement.disabled = false;
      } else {
        optionElement.disabled = true;
      }
    });
  };

  var fieldFlatTypeElementChangeHandler = function () {
    setFlatPriceValue();
  };

  var fieldTimeInElementChangeHandler = function () {
    fieldTimeOutElement.value = fieldTimeInElement.value;
  };

  var fieldTimeOutElementChangeHandler = function () {
    fieldTimeInElement.value = fieldTimeOutElement.value;
  };

  var fieldRoomNumberElementChangeHandler = function () {
    setFieldCapacityValue();
  };

  var intializeDefaultInputs = function () {
    formElement.reset();
    setFlatPriceValue();
    setFieldCapacityValue();
    enableDefaultAdress();
  };

  var createFormSubmitHandler = function (onFormSubmit) {
    return function (evt) {
      evt.preventDefault();
      onFormSubmit();
    };
  };

  var createFormResetHandler = function (onFormReset) {
    return function (evt) {
      evt.preventDefault();
      intializeDefaultInputs();

      onFormReset();
    };
  };


  var formElement = document.querySelector('.ad-form');

  var fieldAddressElement = formElement.querySelector('#address');
  fieldAddressElement.readOnly = true;
  var fieldRoomNumberElement = formElement.querySelector('#room_number');
  var fieldCapacityElement = formElement.querySelector('#capacity');
  var fieldTimeInElement = formElement.querySelector('#timein');
  var fieldTimeOutElement = formElement.querySelector('#timeout');
  var fieldFlatTypeElement = formElement.querySelector('#type');
  var fieldFlatPriceElement = formElement.querySelector('#price');
  var buttonReset = formElement.querySelector('.ad-form__reset');

  var formSubmitHandler;
  var formResetHandler;

  intializeDefaultInputs();

  window.form = {
    activate: function (onFormSubmit, onFormReset) {

      formSubmitHandler = createFormSubmitHandler(onFormSubmit);
      formResetHandler = createFormResetHandler(onFormReset);

      formElement.classList.remove('ad-form--disabled');

      fieldFlatTypeElement.addEventListener('change', fieldFlatTypeElementChangeHandler);
      fieldTimeInElement.addEventListener('change', fieldTimeInElementChangeHandler);
      fieldTimeOutElement.addEventListener('change', fieldTimeOutElementChangeHandler);
      fieldRoomNumberElement.addEventListener('change', fieldRoomNumberElementChangeHandler);

      buttonReset.addEventListener('click', formResetHandler);
      formElement.addEventListener('submit', formSubmitHandler);
    },
    deactivate: function () {
      formElement.classList.add('ad-form--disabled');
      fieldFlatTypeElement.removeEventListener('change', fieldFlatTypeElementChangeHandler);
      fieldTimeInElement.removeEventListener('change', fieldTimeInElementChangeHandler);
      fieldTimeOutElement.removeEventListener('change', fieldTimeOutElementChangeHandler);
      fieldRoomNumberElement.removeEventListener('change', fieldRoomNumberElementChangeHandler);

      formElement.removeEventListener('reset', formResetHandler);
      formElement.removeEventListener('submit', formSubmitHandler);
    },
    setFieldAddress: function (x, y) {
      fieldAddressElement.value = x + ', ' + y;
    }
  };

})();
