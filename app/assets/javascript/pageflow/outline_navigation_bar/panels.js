(function($) {
  var events = pageflow.outlineNavigationBar.events;

  $.widget('pageflow.outlineNavigationBarPanels', {
    _create: function() {
      var links = this.options.toggles.find('a');
      var panels = this.options.panels;
      var expandable = this.options.expandable;

      events.onPointerDown(links, function() {
        var link = $(this);
        var panelName = link.data('panel');
        var collapsed = false;

        if (link.data('toggle') === 'expandable') {
          if (link.hasClass('active')) {
            expandable.collapse();
            collapsed = true;
          }
          else {
            expandable.expand();
          }
        }
        else if (link.data('toggle')) {
          if (link.hasClass('active')) {
            panelName = link.data('toggle');
          }
        }

        links.each(function() {
          var link = $(this);
          link.toggleClass('active', link.data('panel') === panelName && !collapsed);
        });

        panels.each(function() {
          var panel = $(this);
          panel.toggleClass('active', panel.hasClass(panelName));
        });
      });
    }
  });
}(jQuery));
