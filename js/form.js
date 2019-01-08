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

  var onFieldFlatTypeChanged = function () {
    syncFlatPriceFieldValue();
  };

  var onFieldTimeInChanged = function () {
    fieldTimeOutElement.value = fieldTimeInElement.value;
  };

  var onFieldTimeOutChanged = function () {
    fieldTimeInElement.value = fieldTimeOutElement.value;
  };

  var onFieldRoomNumberChanged = function () {
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

  var createFormSubmitHandler = function (callbackFormSubmit) {
    return function (evt) {
      evt.preventDefault();

      callbackFormSubmit(new FormData(formElement));
    };
  };

  var createFormResetHandler = function (callbackFormReset) {
    return function () {
      setTimeout(function () {
        callbackFormReset();
        syncCapacityFieldValue();
        syncFlatPriceFieldValue();
      });
    };
  };

  var isFormActive = false;
  var onFormSubmit;
  var onFormReset;
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

  deactivateFields();
  setDefaultAddress();
  syncCapacityFieldValue();
  syncFlatPriceFieldValue();

  window.form = {
    activate: function (callbackFormSubmit, callbackFormReset) {
      onFormSubmit = createFormSubmitHandler(callbackFormSubmit);
      onFormReset = createFormResetHandler(callbackFormReset);

      fieldFlatTypeElement.addEventListener('change', onFieldFlatTypeChanged);
      fieldTimeInElement.addEventListener('change', onFieldTimeInChanged);
      fieldTimeOutElement.addEventListener('change', onFieldTimeOutChanged);
      fieldRoomNumberElement.addEventListener('change', onFieldRoomNumberChanged);

      formElement.classList.remove('ad-form--disabled');
      formElement.addEventListener('reset', onFormReset);
      formElement.addEventListener('submit', onFormSubmit);

      activateFields();
    },
    deactivate: function () {
      fieldFlatTypeElement.removeEventListener('change', onFieldFlatTypeChanged);
      fieldTimeInElement.removeEventListener('change', onFieldTimeInChanged);
      fieldTimeOutElement.removeEventListener('change', onFieldTimeOutChanged);
      fieldRoomNumberElement.removeEventListener('change', onFieldRoomNumberChanged);

      formElement.reset();
      formElement.classList.add('ad-form--disabled');
      formElement.removeEventListener('reset', onFormReset);
      formElement.removeEventListener('submit', onFormSubmit);

      deactivateFields();
      setDefaultAddress();
    },
    setFieldAddress: function (x, y) {
      fieldAddressElement.value = x + ', ' + y;
    }
  };

})();
