(function($) {
  var events = pageflow.outlineNavigationBar.events;

  $.widget('pageflow.outlineNavigationBarMenuItem', {
    _create: function() {
      this._setupPressedClass();
      this._ensureOpenWhileFocusInMenuBox();
    },

    _setupPressedClass: function() {
      var element = this.element;

      element.on(events.pointerDown, '> a', function() {
        var link = $(this);
        link.addClass('pressed');

        $('body').one(events.pointerUp, function() {
          link.removeClass('pressed');
        });
      });
    },

    _ensureOpenWhileFocusInMenuBox: function() {
      var element = this.element;

      element.find('.menu_box a').on({
        focus: function() {
          element.addClass('focused');
        },

        blur: function() {
          element.removeClass('focused');
        }
      });

      element.on('mouseleave', function() {
        element.blur();
      });
    }
  });
}(jQuery));