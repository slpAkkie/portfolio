$(document).ready(function () {

  $(window).scroll(function () {
    if ($(this).scrollTop() >= 150) {
      $('nav.fixed-top').addClass('scrolled');
    } else {
      $('nav.fixed-top').removeClass('scrolled');
    }
  });

});
