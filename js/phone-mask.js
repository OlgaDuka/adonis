'use strict';

$(document).ready(function () {

  var HIDDEN_MASK = '+7 (___) ___-__-__';

  var phone = document.querySelector('#phonebox');
  if (phone) {
    var input = phone.querySelector('.modal__phone--visible');
    var mask = phone.querySelector('.modal__phone--mask');

    var clickPhoneHandler = function () {
      mask.classList.remove('modal__phone--hidden');
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
        input.classList.add('modal__phone--not-empty');
      }
    });

    input.addEventListener('input', inputPhoneHandler);
  }

});
