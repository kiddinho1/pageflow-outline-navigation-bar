module Pageflow
  module OutlineNavigationBar
    class WidgetType < Pageflow::WidgetType
      def roles
        ['navigation']
      end

      def render(template, entry, locals)
        template.render(File.join('pageflow/outline_navigation_bar/widget'),
                        locals.merge(entry: entry))
      end
    end
  end
end
