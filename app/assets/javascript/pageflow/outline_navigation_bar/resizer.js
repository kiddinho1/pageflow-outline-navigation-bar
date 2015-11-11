(function($) {
  var BAR_MIN_WIDTH = 65;

  pageflow.outlineNavigationBar.Resizer = pageflow.Object.extend({
    initialize: function(element, options) {
      this.element = element;
      this.options = options;

      this.list = this.element.find('.chapters_panel ul');

      this._setupWidth();
    },

    _setupWidth: function() {
      this.expandedWidth = Math.max(BAR_MIN_WIDTH, this.list.width()) + 'px';

      if (this.options.isFixed) {
        this.element.css('width', this.expandedWidth);
      }
    },

    expand: function() {
      this.element.addClass('expanded');
      this.element.css('width', this.expandedWidth);
    },

    collapse: function() {
      this.element.removeClass('expanded');
      this.element.css('width', '');
    },
  });
}(jQuery));
