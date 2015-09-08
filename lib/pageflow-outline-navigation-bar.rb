require 'pageflow/outline_navigation_bar/engine'

module Pageflow
  module OutlineNavigationBar
    def self.plugin
      OutlineNavigationBar::Plugin.new
    end

    def self.widget_type
      OutlineNavigationBar::WidgetType.new
    end
  end
end
