require 'pageflow/outline_navigation_bar/engine'

module Pageflow
  module OutlineNavigationBar
    def self.plugin
      OutlineNavigationBar::Plugin.new
    end

    def self.fixed_widget_type
      OutlineNavigationBar::FixedWidgetType.new
    end

    def self.expandable_widget_type
      OutlineNavigationBar::ExpandableWidgetType.new
    end
  end
end
