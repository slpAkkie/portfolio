let nav = document.querySelector( 'nav.nav' );

window.addEventListener( 'scroll', function () {
  if ( window.pageYOffset > 50 ) nav.classList.add( 'nav_scrolled' );
  else nav.classList.remove( 'nav_scrolled' );
} );
