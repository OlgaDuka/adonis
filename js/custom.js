'use strict';

$(document).ready(function (e) {
  window.flagTextOpen = false;
  // Кнопка меню на мобильной версии
  $('.header__btn-menu--open').click(function () {
    var desktopWidth = window.matchMedia('(min-width: 1200px)');
    if (!desktopWidth.matches) {
      $('.header__menu').fadeIn(1000);
      $('.header__btn-menu--open').hide();
      $('.header__btn-menu--close').show();
    }
  });

  $('.header__btn-menu--close').click(function () {
    var desktopWidth = window.matchMedia('(min-width: 1200px)');
    if (!desktopWidth.matches) {
      $('.header__menu').fadeOut(1000);
      $('.header__btn-menu--open').show();
      $('.header__btn-menu--close').hide();
    }
  });

  $('.content__btn-more').click(function () {
    $('.content__text-more').slideToggle(1000);
    if (window.flagTextOpen) {
      $('.content__btn-more').text('Читать далее >>');
      window.flagTextOpen = false;
    } else {
      $('.content__btn-more').text('Закрыть текст >>');
      window.flagTextOpen = true;
    }
  });

});
