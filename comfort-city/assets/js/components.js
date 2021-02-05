/**
 *
 * ========================================
 *        Functions for components
 * ========================================
 *
 */

_( () => {

  /**
   * ====================
   *    .page-top-nav
   * ====================
   */

  _( '.page-top-nav__burger' ).on( 'click', function () {
    _( '.page-top-nav__menu-container' ).toggleClass( 'collapsed' );
    this.toggleClass( 'active' );
  } )

} );
