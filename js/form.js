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

  var manageDisabledAttrForFieldsElements = function () {
    Array.prototype.forEach.call(fieldsElements, function (fieldElement) {
      if (fieldsDisabled) {
        fieldElement.disabled = true;
      } else if (!fieldsDisabled) {
        fieldElement.disabled = false;
      }
    });
  };

  var setDefaultAddress = function () {
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

  var initializeFields = function () {
    activateFields();
    setFlatPriceValue();
    setFieldCapacityValue();
  };

  var unitializeFields = function () {
    formElement.reset();
    deactivateFields();
    setDefaultAddress();
  };

  var activateFields = function () {
    fieldsDisabled = false;
    manageDisabledAttrForFieldsElements();
  };

  var deactivateFields = function () {
    fieldsDisabled = true;
    manageDisabledAttrForFieldsElements();
  };

  var createFormSubmitHandler = function (onFormSubmit) {
    return function (evt) {
      evt.preventDefault();

      onFormSubmit(new FormData(formElement));
    };
  };

  var createFormResetHandler = function (onFormReset) {
    return function () {

      setTimeout(function () {
        onFormReset();
      });
    };
  };


  var formElement = document.querySelector('.ad-form');

  var fieldAddressElement = formElement.querySelector('#address');
  var fieldsElements = formElement.querySelectorAll('.ad-form__element');
  var fieldRoomNumberElement = formElement.querySelector('#room_number');
  var fieldCapacityElement = formElement.querySelector('#capacity');
  var fieldTimeInElement = formElement.querySelector('#timein');
  var fieldTimeOutElement = formElement.querySelector('#timeout');
  var fieldFlatTypeElement = formElement.querySelector('#type');
  var fieldFlatPriceElement = formElement.querySelector('#price');
  var fieldsDisabled;

  var formSubmitHandler;
  var formResetHandler;

  fieldAddressElement.readOnly = true;
  unitializeFields();

  window.form = {
    activate: function (onFormSubmit, onFormReset) {

      formSubmitHandler = createFormSubmitHandler(onFormSubmit);
      formResetHandler = createFormResetHandler(onFormReset);

      formElement.classList.remove('ad-form--disabled');
      initializeFields();
      fieldFlatTypeElement.addEventListener('change', fieldFlatTypeElementChangeHandler);
      fieldTimeInElement.addEventListener('change', fieldTimeInElementChangeHandler);
      fieldTimeOutElement.addEventListener('change', fieldTimeOutElementChangeHandler);
      fieldRoomNumberElement.addEventListener('change', fieldRoomNumberElementChangeHandler);

      formElement.addEventListener('reset', formResetHandler);
      formElement.addEventListener('submit', formSubmitHandler);
    },
    deactivate: function () {
      formElement.classList.add('ad-form--disabled');
      unitializeFields();
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
