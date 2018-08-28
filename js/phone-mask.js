'use strict';

$(document).ready(function () {

  var HIDDEN_MASK = '+7 (___) ___-__-__';

  var phoneModal = document.querySelector('#phonebox');
  var phoneFeedback = document.querySelector('.feedback__input-box--tel');

  var phoneMask = function (input, mask, classHidden, classNotEmpty) {

    var clickPhoneHandler = function () {
      mask.classList.remove(classHidden);
    };

    var cleave = new Cleave(input, {
      blocks: [3, 3, 3, 2, 2],
      delimiters: ['(', ') ', '-', '-'],
      uppercase: true,
      prefix: '+7 ',
      numericOnly: true
    });

    var inputPhoneHandler = function (evt) {
      var newValue = input.value;
      mask.value = newValue + HIDDEN_MASK.substr(newValue.length);

      if (evt.data !== null && Number.isInteger(+evt.data)) {
        if (input.value.length <= 5) {
          input.selectionStart = 5;
        } else if (input.selectionStart < 4) {
          input.value = '+7 (' + evt.data + input.value.slice(4, input.value.length);
        }
      }
    };

    input.addEventListener('click', clickPhoneHandler);

    input.addEventListener('blur', function () {
      if (input.value) {
        input.classList.add(classNotEmpty);
      }
    });

    input.addEventListener('input', inputPhoneHandler);
  };

  if (phoneModal) {
    var inputModal = phoneModal.querySelector('.modal__phone--visible');
    var maskModal = phoneModal.querySelector('.modal__phone--mask');
    var classHidden = 'modal__phone--hidden';
    var classNotEmpty = 'modal__phone--not-empty';
    phoneMask(inputModal, maskModal, classHidden, classNotEmpty);
  }

  if (phoneFeedback) {
    var inputFeedback = phoneFeedback.querySelector('.feedback__phone--visible');
    var maskFeedback = phoneFeedback.querySelector('.feedback__phone--mask');
    classHidden = 'feedback__phone--hidden';
    classNotEmpty = 'feedback__phone--not-empty';
    phoneMask(inputFeedback, maskFeedback, classHidden, classNotEmpty);
  }

});
