module Pageflow
  module OutlineNavigationBar
    class WidgetType < Pageflow::WidgetType
      def name
        'outline_navigation_bar'
      end

      def roles
        ['navigation']
      end
    end
  end
end
