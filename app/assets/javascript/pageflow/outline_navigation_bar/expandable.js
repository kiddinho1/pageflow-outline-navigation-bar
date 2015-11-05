(function($) {
  var BAR_MIN_WIDTH = 65;

  $.widget('pageflow.outlineNavigationBarExpandable', {
    _create: function() {
      this.list = this.element.find('.chapters_panel ul');

      this.setupWidth();
      this.setupEventHandler();
    },

    setupWidth: function() {
      this.expandedWidth = Math.max(BAR_MIN_WIDTH, this.list.width()) + 'px';

      if (this.options.isFixed) {
        this.element.css('width', this.expandedWidth);
      }
    },

    setupEventHandler: function() {
      var that = this;

      if (!this.options.isFixed) {
        this.element.on({
          mouseenter: function() {
            that.expand();
            that.options.expanded && that.options.expanded();
          },

          mouseleave: function() {
            that.collapse();
            that.options.collapsed && that.options.collapsed();
          }
        });
      }
    },

    expand: function() {
      this.element.addClass('expanded');
      this.element.css('width', this.expandedWidth);
    },

    collapse: function() {
      this.element.removeClass('expanded');
      this.element.css('width', '');
    }
  });
}(jQuery));
