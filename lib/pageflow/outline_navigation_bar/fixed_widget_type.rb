module Pageflow
  module OutlineNavigationBar
    class FixedWidgetType < OutlineNavigationBar::WidgetType
      def name
        'outline_navigation_bar_fixed'
      end

      def translation_key
        'pageflow.outline_navigation_bar.fixed.widget_type_name'
      end

      def render(template, entry)
        super(template, entry, expandable: false)
      end
    end
  end
end
