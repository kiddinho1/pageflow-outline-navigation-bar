(function($) {
  $.widget('pageflow.outlineNavigationBarFullscreenButton', {
    _create: function() {
      var element = this.element;

      if ($.support.fullscreen) {
        element.click(function() {
          element.toggleClass('fs').updateTitle();

          $('#outer_wrapper').fullScreen({
            callback: function(isFullScreen) {
              element
                .toggleClass('active', !!isFullScreen)
                .updateTitle();
            }
          });
        });
      }
      else {
        element.parent().hide();
      }
    }
  });
}(jQuery));