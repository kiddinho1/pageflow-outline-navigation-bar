# Pageflow Outline Navigation Bar

[![Gem Version](https://badge.fury.io/rb/pageflow-outline-navigation-bar.svg)](http://badge.fury.io/rb/pageflow-outline-navigation-bar)

A navigation bar displaying chapter titles.

## Installation

Add this line to your application's `Gemfile`:

    gem 'pageflow-outline-navigation-bar'

Register the plugin inside the configure block in `config/initializers/pageflow.rb`

    Pageflow.configure do |config|
      config.plugin(Pageflow::OutlineNavigationBar.plugin)
    end

Include javascripts and stylesheets:

    # app/assets/javascripts/pageflow/application.js
    //= require pageflow/outline_navigation_bar

    # app/assets/stylesheets/pageflow/application.css.scss
    @import "pageflow/outline_navigation_bar";

    # Adding basic style to your theme
    # app/assets/stylesheets/pageflow/themes/default.css.scss
    @import "pageflow/outline_navigation_bar/themes/default";

Execute `bundle install` Restart the application server.

## Troubleshooting

If you run into problems while installing the page type, please also refer to the
[Troubleshooting](https://github.com/codevise/pageflow/wiki/Troubleshooting) wiki
page in the [Pageflow  repository](https://github.com/codevise/pageflow). If that
doesn't help, consider
[filing an issue](https://github.com/codevise/pageflow-outline-navigation-bar/issues).

## Contributing Locales

Edit the translations directly on the
[pageflow-outline-navigation-bar](http://www.localeapp.com/projects/public?search=tf/pageflow-outline-navigation-bar)
locale project.
