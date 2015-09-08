module Pageflow
  module OutlineNavigationBar
    class Plugin < Pageflow::Plugin
      def configure(config)
        config.features.register('outline_navigation_bar') do |c|
          c.widget_types.register(OutlineNavigationBar.widget_type)
        end
      end
    end
  end
end
