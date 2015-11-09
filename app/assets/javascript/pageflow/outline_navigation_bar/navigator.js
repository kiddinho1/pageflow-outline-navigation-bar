(function($) {
  var events = pageflow.outlineNavigationBar.events;

  $.widget('pageflow.outlineNavigationBarNavigator', {
    _create: function() {
      var element = this.element;
      var scroller = this.options.scroller;
      var links = element.find('a');

      element.on(events.pointerDown, 'a', function(event) {
        event.preventDefault();
        $(this).one(events.pointerUp, goToPage);
      });

      element.on('click', 'a', function(event) {
        event.preventDefault();
      });

      element.on('keydown', 'a', function(event) {
        if (event.which == 13) {
          goToPage.call(this);
        }
      });

      scroller.on('scroll', function() {
        links.off(events.pointerUp, goToPage);
      });

      function goToPage() {
        var id = $(this).data('link');
        pageflow.slides.goToById(id);
      }
    }
  });
}(jQuery));