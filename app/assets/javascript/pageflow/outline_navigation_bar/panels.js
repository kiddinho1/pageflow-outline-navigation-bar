(function($) {
  var events = pageflow.outlineNavigationBar.events;

  $.widget('pageflow.outlineNavigationBarPanels', {
    _create: function() {
      var links = this.options.toggles.find('a');
      var expander = this.options.expander;
      var widget = this;

      events.onPointerDown(links, function() {
        var link = $(this);
        var panelName = link.data('panel');
        var collapsed = false;

        if (link.data('toggle') === 'expandable') {
          if (link.hasClass('active')) {
            expander.collapse();
            collapsed = true;
          }
          else {
            expander.expand();
          }
        }
        else if (link.data('toggle')) {
          if (link.hasClass('active')) {
            panelName = link.data('toggle');
          }
        }

        widget.update(panelName, collapsed);
      });
    },

    reset: function() {
      var defaultLink = this.options.toggles.find('a[data-toggle="expandable"]');
      this.update(defaultLink.data('panel'), true);
    },

    update: function(panelName, collapsed) {
      var links = this.options.toggles.find('a');
      var panels = this.options.panels;

      links.each(function() {
        var link = $(this);
        link.toggleClass('active', link.data('panel') === panelName && !collapsed);
      });

      panels.each(function() {
        var panel = $(this);
        panel.toggleClass('active', panel.hasClass(panelName));
      });
    }
  });
}(jQuery));
