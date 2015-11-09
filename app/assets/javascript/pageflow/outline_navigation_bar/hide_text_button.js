(function($) {
  var events = pageflow.outlineNavigationBar.events;

  $.widget('pageflow.outlineNavigationBarHideTextButton', {
    _create: function() {
      var element = this.element;

      element.click(function() {
        pageflow.hideText.toggle();
      });

      pageflow.hideText.on('activate deactivate', function() {
        element.toggleClass('active', pageflow.hideText.isActive()).updateTitle();
      });
    }
  });
}(jQuery));