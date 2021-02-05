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

  _( '.page-top-nav__burger' ).on( 'click', () => {
    _( '.page-top-nav__menu-container' ).toggleClass( 'collapsed' )
  } )

} );
