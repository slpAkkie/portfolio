let nav = document.querySelector( 'nav.nav' );
let header = document.querySelector( 'header.header' );
let forEmployers = document.querySelector( '.for-employers' );

window.addEventListener( 'scroll', function () {

  // Nav background
  if ( window.pageYOffset > 50 ) nav.classList.add( 'nav_scrolled' );
  else nav.classList.remove( 'nav_scrolled' );

  // Header paralax
  let posHeaderY = window.pageYOffset / 2;
  header.style.backgroundPositionY = `${posHeaderY}px`;

  // For employers paralax
  let poForEmployersY = ( window.pageYOffset - forEmployers.offsetTop ) / 5;
  forEmployers.style.backgroundPositionY = `${poForEmployersY}px`;

} );
