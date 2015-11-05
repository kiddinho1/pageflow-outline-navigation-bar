module Pageflow
  module OutlineNavigationBar
    class Plugin < Pageflow::Plugin
      def configure(config)
        config.features.register('outline_navigation_bar') do |feature_config|
          feature_config.widget_types.register(OutlineNavigationBar.fixed_widget_type)
          feature_config.widget_types.register(OutlineNavigationBar.expandable_widget_type)
        end
      end
    end
  end
end
