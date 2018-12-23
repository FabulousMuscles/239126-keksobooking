'use strict';
(function () {

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

  var syncFieldAddressWithMainPin = function () {
    fieldAddressElement.value = window.dragAndDrop.mainPinElement.offsetLeft + ', ' + window.dragAndDrop.mainPinElement.offsetTop;
  };


  var setDefaultFormValues = function () {
    formElement.reset();
    setFlatPriceValue();
    setFieldCapacityValue();
    window.dragAndDrop.resetMainPinPosition();
    syncFieldAddressWithMainPin();
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

  var activateForm = function () {
    formElement.classList.remove('ad-form--disabled');
    syncFieldAddressWithMainPin();
    fieldFlatTypeElement.addEventListener('change', fieldFlatTypeElementChangeHandler);
    fieldTimeInElement.addEventListener('change', fieldTimeInElementChangeHandler);
    fieldTimeOutElement.addEventListener('change', fieldTimeOutElementChangeHandler);
    fieldRoomNumberElement.addEventListener('change', fieldRoomNumberElementChangeHandler);
  };

  var deactivateForm = function () {
    formElement.classList.add('ad-form--disabled');
    setDefaultFormValues();
    fieldFlatTypeElement.removeEventListener('change', fieldFlatTypeElementChangeHandler);
    fieldTimeInElement.removeEventListener('change', fieldTimeInElementChangeHandler);
    fieldTimeOutElement.removeEventListener('change', fieldTimeOutElementChangeHandler);
    fieldRoomNumberElement.removeEventListener('change', fieldRoomNumberElementChangeHandler);
  };

  var resetButtonElementClickHandler = function (evt) {
    evt.preventDefault();
    setDefaultFormValues();
  };

  var formElement = document.querySelector('.ad-form');
  var resetButtonElement = formElement.querySelector('.ad-form__reset');
  var fieldAddressElement = formElement.querySelector('#address');

  var fieldRoomNumberElement = formElement.querySelector('#room_number');
  var fieldCapacityElement = formElement.querySelector('#capacity');

  var fieldTimeInElement = formElement.querySelector('#timein');
  var fieldTimeOutElement = formElement.querySelector('#timeout');

  var fieldFlatTypeElement = formElement.querySelector('#type');
  var fieldFlatPriceElement = formElement.querySelector('#price');

  setDefaultFormValues();

  resetButtonElement.addEventListener('click', resetButtonElementClickHandler);
  formElement.addEventListener('submit', function (evt) {
    evt.preventDefault();
    deactivateForm();
  });

  window.form = {
    activateForm: activateForm,
    fieldAddressElement: fieldAddressElement,
    syncFieldAddressWithMainPin: syncFieldAddressWithMainPin
  };
})();
