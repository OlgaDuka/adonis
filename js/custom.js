'use strict';

$(document).ready(function (e) {
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

});
