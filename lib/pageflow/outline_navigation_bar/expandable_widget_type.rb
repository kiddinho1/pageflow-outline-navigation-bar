module Pageflow
  module OutlineNavigationBar
    class ExpandableWidgetType < OutlineNavigationBar::WidgetType
      def name
        'outline_navigation_bar_expandable'
      end

      def translation_key
        'pageflow.outline_navigation_bar.expandable.widget_type_name'
      end

      def render(template, entry)
        super(template, entry, expandable: true)
      end
    end
  end
end
