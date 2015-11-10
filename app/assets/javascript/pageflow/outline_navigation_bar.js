//= require_self

//= require ./outline_navigation_bar/events
//= require ./outline_navigation_bar/expander
//= require ./outline_navigation_bar/hide_text_button
//= require ./outline_navigation_bar/resizer
//= require ./outline_navigation_bar/navigator
//= require ./outline_navigation_bar/scroller
//= require ./outline_navigation_bar/panels
//= require ./outline_navigation_bar/menu_item

//= require ./outline_navigation_bar/widget

pageflow.outlineNavigationBar = pageflow.outlineNavigationBar || {};

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
