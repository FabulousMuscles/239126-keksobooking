'use strict';
(function () {

  var ADDRESS_ORIGIN_X = 570;
  var ADDRESS_ORIGIN_Y = 375;

  var FlatPriceMap = {
    FLAT: 1000,
    BUNGALO: 0,
    HOUSE: 5000,
    PALACE: 10000
  };

  var ValidationRoomCapacityMap = {
    '1': ['1'],
    '2': ['1', '2'],
    '3': ['1', '2', '3'],
    '100': ['0']
  };

  var syncFormFieldsAttributes = function () {
    fieldsElements.forEach(function (fieldElement) {
      fieldElement.disabled = isFormActive;
    });
  };

  var setDefaultAddress = function () {
    fieldAddressElement.value = ADDRESS_ORIGIN_X + ', ' + ADDRESS_ORIGIN_Y;
  };

  var syncFlatPriceFieldValue = function () {
    fieldFlatPriceElement.min = FlatPriceMap[fieldFlatTypeElement.value.toUpperCase()];
    fieldFlatPriceElement.placeholder = fieldFlatPriceElement.min;
  };

  var syncCapacityFieldValue = function () {
    var capacityValues = ValidationRoomCapacityMap[fieldRoomNumberElement.value];
    var defaultCapacityValue = capacityValues[0];

    fieldCapacityElement.value = defaultCapacityValue;

    Array.prototype.forEach.call(fieldCapacityElement.options, function (optionElement) {
      optionElement.disabled = capacityValues.indexOf(optionElement.value) === -1;
    });
  };

  var fieldFlatTypeChangeHandler = function () {
    syncFlatPriceFieldValue();
  };

  var fieldTimeInChangeHandler = function () {
    fieldTimeOutElement.value = fieldTimeInElement.value;
  };

  var fieldTimeOutChangeHandler = function () {
    fieldTimeInElement.value = fieldTimeOutElement.value;
  };

  var fieldRoomNumberChangeHandler = function () {
    syncCapacityFieldValue();
  };

  var activateFields = function () {
    isFormActive = false;
    syncFormFieldsAttributes();
  };

  var deactivateFields = function () {
    isFormActive = true;
    syncFormFieldsAttributes();
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

  var isFormActive = false;
  var formSubmitHandler;
  var formResetHandler;
  var formElement = document.querySelector('.ad-form');

  var fieldAddressElement = formElement.querySelector('#address');
  var fieldsElements = formElement.querySelectorAll('.ad-form fieldset');
  var fieldRoomNumberElement = formElement.querySelector('#room_number');
  var fieldCapacityElement = formElement.querySelector('#capacity');
  var fieldTimeInElement = formElement.querySelector('#timein');
  var fieldTimeOutElement = formElement.querySelector('#timeout');
  var fieldFlatTypeElement = formElement.querySelector('#type');
  var fieldFlatPriceElement = formElement.querySelector('#price');

  fieldAddressElement.readOnly = true;

  formElement.reset();
  deactivateFields();
  setDefaultAddress();

  window.form = {
    activate: function (onFormSubmit, onFormReset) {
      activateFields();
      syncFlatPriceFieldValue();
      syncCapacityFieldValue();

      formSubmitHandler = createFormSubmitHandler(onFormSubmit);
      formResetHandler = createFormResetHandler(onFormReset);

      fieldFlatTypeElement.addEventListener('change', fieldFlatTypeChangeHandler);
      fieldTimeInElement.addEventListener('change', fieldTimeInChangeHandler);
      fieldTimeOutElement.addEventListener('change', fieldTimeOutChangeHandler);
      fieldRoomNumberElement.addEventListener('change', fieldRoomNumberChangeHandler);

      formElement.classList.remove('ad-form--disabled');
      formElement.addEventListener('reset', formResetHandler);
      formElement.addEventListener('submit', formSubmitHandler);
    },
    deactivate: function () {
      deactivateFields();
      setDefaultAddress();

      fieldFlatTypeElement.removeEventListener('change', fieldFlatTypeChangeHandler);
      fieldTimeInElement.removeEventListener('change', fieldTimeInChangeHandler);
      fieldTimeOutElement.removeEventListener('change', fieldTimeOutChangeHandler);
      fieldRoomNumberElement.removeEventListener('change', fieldRoomNumberChangeHandler);

      formElement.reset();
      formElement.classList.add('ad-form--disabled');
      formElement.removeEventListener('reset', formResetHandler);
      formElement.removeEventListener('submit', formSubmitHandler);
    },
    setFieldAddress: function (x, y) {
      fieldAddressElement.value = x + ', ' + y;
    }
  };

})();
