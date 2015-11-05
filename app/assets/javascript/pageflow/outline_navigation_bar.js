//= require_self
//= require ./outline_navigation_bar/widget

pageflow.widgetTypes.register('outline_navigation_bar_expandable', {
  enhance: function(element) {
    element.outlineNavigationBar();
  }
});

pageflow.widgetTypes.register('outline_navigation_bar_fixed', {
  enhance: function(element) {
    element.outlineNavigationBar();
  }
});
