'use strict';

$(document).ready(function () {
  var desktopWidth = window.matchMedia('(min-width: 1200px)');
  var feedback = document.querySelector('.feedback__form');

  // ******************************* //
  // Функции обработки событий
  var openText = function () {
    var services = $(this).parents();
    $(services[0]).find('.work__text, .work__sublist, .work__subtitle--italic, .work__price').slideToggle(1000);
    if (this.innerHTML === 'Подробнее...') {
      $(this).text('Скрыть...');
    } else {
      $(this).text('Подробнее...');
    }
  };

  var openContentText = function () {
    var contents = $(this).parents();
    $(contents[0]).find('.content__text-more').slideToggle(1000);
    if (this.innerHTML === 'Читать далее &gt;&gt;') {
      $('.content__btn-more').text('Скрыть >>');
    } else {
      $('.content__btn-more').text('Читать далее >>');
    }
  };

  var checkValue = function (input) {
    if (input.value) {
      input.classList.add('feedback__input--not-empty');
    }
  };

  // Сбрасывает поле телефона формы и показывает сообщение об успешной отправке
  var resetForm = function (form, resetClassField) {
    form.reset();
    resetClassField(form);
  };

  var resetPopup = function (form) {
    form.querySelector('.modal__phone--mask').classList.add('modal__phone--hidden');
    form.querySelector('.modal__phone--visible').classList.remove('modal__phone--not-empty');
    $('.modal__wrapper--order').hide();
    $('.modal__wrapper--message').css('display', 'flex');
  };

  var resetFeedback = function (form) {
    form.querySelector('.feedback__phone--mask').classList.add('feedback__phone--hidden');
    form.querySelector('.feedback__phone--visible').classList.remove('feedback__phone--not-empty');
    $('.feedback__wrapper--main').hide();
    $('.feedback__wrapper--message').css('display', 'flex');
  };

  var openPopup = function (e) {
    e.preventDefault();
    $('.modal__overlay').css('display', 'flex');
    $('.modal').show();
    $('.modal__wrapper--order').css('display', 'flex');
    $('.modal__wrapper--message').hide();
  };

  var closePopup = function () {
    $('.modal').hide();
    $('.modal__overlay').css('display', 'none');
  };

  // Добавляет методы валидации для телефона
  $.validator.addMethod('minlenghtphone', function (value) {
    return value.replace(/\D+/g, '').length > 10;
  }, 'Неверный формат номера!');

  $.validator.addMethod('requiredphone', function (value) {
    return value.replace(/\D+/g, '').length > 1;
  }, 'Заполните это поле!');

  // Функция валидации форм
  var formValidate = function (form, resetClassField) {
    form.validate({
      rules: {
        name: {
          required: true,
          minlength: 3
        },
        email: {
          required: true,
          email: true
        },
        phone: {
          requiredphone: true,
          minlenghtphone: true,
          required: true
        },
        message: {
          required: true,
          minlength: 10
        }
      },
      messages: {
        name: {
          required: 'Заполните это поле!',
          minlength: 'Введите не менее 3 символов'
        },
        email: {
          required: 'Заполните это поле!',
          email: 'Неверный формат адреса'
        },
        phone: {
          required: 'Заполните это поле!'
        },
        message: {
          required: 'Заполните это поле!',
          minlength: 'Слишком короткое сообщение'
        }
      },
      submitHandler: function () {
        resetForm(form, resetClassField);
      }
    });
  };


  // ******************************* //
  // Обрабатываем события на страницах

  // Плавный скролл до гугл-карты на десктопной версии
  if (desktopWidth.matches) {
    $('.header__link-map').click(function (e) {
      var offsetMap = $('#map').offset().top;
      e.preventDefault();
      $('html, body').animate({scrollTop: offsetMap}, 1000);
    });
  }

  // Клик по кнопке меню "гамбургер" на мобильной версии
  $('.header__btn-menu--open').click(function () {
    $('.menu--mobile').fadeIn();
    $('.header__btn-menu--open').hide();
    $('.header__btn-menu--close').show();
  });

  // Клик по кнопке меню "крестик" на мобильной версии
  $('.header__btn-menu--close').click(function () {
    $('.menu--mobile').fadeOut();
    $('.header__btn-menu--open').show();
    $('.header__btn-menu--close').hide();
  });

  // Клик по пункту меню "Услуги" на десктопной версии
  $('.menu__btn--service').click(function () {
    $('.menu__item--service').slideToggle();
  });

  // Клик по пункту меню "Другая деятельность" на десктопной версии
  $('.menu__btn--another').click(function () {
    $('.menu__item--ihilov').slideToggle();
  });

  // Для полей ФОС - событие потери фокуса (для перемещения подписи поля)
  if (feedback) {
    var inputs = [].slice.call(feedback.querySelectorAll('.feedback__input'));
    inputs.forEach(function (elem) {
      elem.addEventListener('blur', function () {
        checkValue(elem);
      });
    });
  }

  // Переключает текст краткий/полный на мобильной версии
  $('.content__btn-more').each(function (i, el) {
    $(el).click(openContentText);
  });

  // Навешиваем событие "клик" на все кнопки "Подробнее" для услуг
  $('.work').find('.work__btn-more').each(function (i, el) {
    $(el).click(openText);
  });

  // Навешиваем событие "клик" на все кнопки "Заказать"
  $('.work').find('.work__btn').each(function (i, el) {
    $(el).click(openPopup);
  });

// Клик по кнопке "Перезвонить вам?"
  $('.ihilov__btn').click(openPopup);

  // Клик по кнопке "Закрыть" на сообщении
  $('.modal__btn--close').click(closePopup);

  // Клик по крестику на модальном окне
  $('.modal__btn-cancel').click(closePopup);

  formValidate($('#popup'), resetPopup);
  formValidate($('#feedback'), resetFeedback);

});
