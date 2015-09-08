//= require_self
//= require ./outline_navigation_bar/widget

pageflow.widgetTypes.register('outline_navigation_bar', {
  enhance: function(element) {
    element.outlineNavigationBar();
  }
});