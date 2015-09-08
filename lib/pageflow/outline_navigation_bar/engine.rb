module Pageflow
  module OutlineNavigationBar
    class Engine < Rails::Engine
      isolate_namespace Pageflow::OutlineNavigationBar

      config.autoload_paths << File.join(config.root, 'lib')
    end
  end
end
