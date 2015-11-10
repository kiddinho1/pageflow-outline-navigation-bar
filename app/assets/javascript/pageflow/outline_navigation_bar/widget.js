(function($) {
  var events = pageflow.outlineNavigationBar.events;

  $.widget('pageflow.outlineNavigationBar', {
    _create: function() {
      ///////// TERRIBLE HACK
      // Ensure all storylines inherit the parent navigation bar for highlighting when this widget is enabled.

      pageflow.HighlightedPage.prototype.getNavigationBarMode = function(storylineId) {
        if (!pageflow.entryData.getStorylineConfiguration(storylineId).main) {
          return 'inherit_from_parent';
        }
      };

      /////////

      this.element.toggleClass('expandable', !this._isFixed());

      this.expander = this._setupExpander();
      this.panels = this._setupPanels();
      this.scroller = this._setupChaptersPanel();
      this.resizer = this._setupResizer();

      this._setupPointerDownCollapsing();
      this._setupMouseExpanding();
      this._setupFocusExpanding();
      this._setupGlobalSkipLinks();
      this._setupButtonsPanel();
    },

    _setupExpander: function() {
      var widget = this;

      return new pageflow.outlineNavigationBar.Expander({
        enabled: function() {
          return !widget._isFixed();
        },

        expand: function(options) {
          widget.resizer.expand();
          widget.scroller.expand();

          if (mobileLayout()) {
            hidePageContent();
          }
        },

        collapse: function(options) {
          widget.panels.reset();
          widget.resizer.collapse();
          widget.scroller.collapse();

          showPageContent();
        }
      });
    },

    _setupResizer: function() {
      var element = this.element;

      element.outlineNavigationBarResizer({
        isFixed: this._isFixed()
      });

      return this.element.outlineNavigationBarResizer('instance');
    },

    _setupPanels: function() {
      var element = this.element;

      return element
        .outlineNavigationBarPanels({
          expander: this.expander,
          panels: element.find('.panel'),
          toggles: element.find('.toggle'),
        })
        .outlineNavigationBarPanels('instance');
    },

    _setupPointerDownCollapsing: function() {
      var expander = this.expander;
      var element = this.element;

      $('body').on(events.pointerDown, function(event) {
        if (!$(event.target).parents().filter(element).length) {
          expander.collapse();
        }
      });
    },

    _setupMouseExpanding: function() {
      var expander = this.expander;

      if (!pageflow.browser.has('mobile platform')) {
        this.element.on({
          mouseenter: function() {
            if (!mobileLayout()) {
              expander.expand({by: 'mouse'});
            }
          },

          mouseleave: function() {
            if (!mobileLayout()) {
              expander.collapse({by: 'mouse'});
            }
          }
        });
      }
    },

    _setupFocusExpanding: function() {
      var expander = this.expander;

      this.element.find('a, *[tabindex]').on({
        focus: function() {
          expander.expand({by: 'focus'});
        },

        blur: function() {
          expander.scheduleCollapse({by: 'focus'});
        }
      });
    },

    _setupButtonsPanel: function() {
      var element = this.element;

      element.find('.toggle.buttons a').on('click', function() {
        $('.header').toggleClass('active');
        element.toggleClass('buttons_active');
      });

      element.find('.menu_item').outlineNavigationBarMenuItem();
      element.find('.top a').topButton();
      element.find('.fullscreen a').fullscreenButton();
      element.find('.hide_text a').outlineNavigationBarHideTextButton();
      element.find('.navigation_volume_box').volumeSlider({
        orientation: 'v'
      });

      var shareBox = $('.share_box', this.element),
          shareLinks = $('a', shareBox);

      shareBox.shareMenu({
        insertAfter: shareLinks.parent().last(),
        closeOnMouseLeaving: shareBox
      });
    },

    _setupChaptersPanel: function() {
      var element = this.element;
      var scroller = element.find('.scroller')
        .outlineNavigationBarScroller({isFixed: this._isFixed()})
        .outlineNavigationBarScroller('instance');

      element.find('.scroller').outlineNavigationBarNavigator({
        scroller: scroller
      });

      return scroller;
    },

    _setupGlobalSkipLinks: function() {
      $('a[href="#header"], a[href="#search"]', '#skipLinks').click(function() {
        $('.header').addClass('active');
        $(this.getAttribute('href')).select();
      });
    },

    _isFixed: function() {
      return (this.element.data('widget') === 'outline_navigation_bar_fixed' &&
              !mobileLayout());
    }
  });

  function mobileLayout() {
    return ($('body').width() <= 900);
  }

  function hidePageContent() {
    $('section.page').addClass('hidden_by_overlay');
  }

  function showPageContent() {
    $('section.page').removeClass('hidden_by_overlay');
  }
}(jQuery));
