/*global IScroll*/

(function($) {
  var o = pageflow.outlineNavigationBar;
  var events = o.events;

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
      this._setupPageChangeCollapsing();
      this._setupMouseExpanding();
      this._setupFocusExpanding();
      this._setupGlobalSkipLinks();
      this._setupButtonsPanel();
      this._setupMobilePanels();
    },

    _destroy: function() {
      this._teardownPageChangeCollapsing();
    },

    _setupExpander: function() {
      var widget = this;

      return new o.Expander({
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
          if (!widget.element.hasClass('buttons_active')) {
            widget.panels.reset();
          }

          widget.resizer.collapse();
          widget.scroller.collapse();

          showPageContent();
        }
      });
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

    _setupResizer: function() {
      return new o.Resizer(this.element, {
        isFixed: this._isFixed()
      });
    },

    _setupPointerDownCollapsing: function() {
      var expander = this.expander;
      var element = this.element;

      $('body').on(events.pointerDown, function(event) {
        if (!$(event.target).parents().andSelf().filter(element).length) {
          expander.collapse();
        }
      });
    },

    _setupPageChangeCollapsing: function() {
      var expander = this.expander;

      pageflow.events.on('page:change', function() {
        expander.collapse();
      }, this);
    },

    _teardownPageChangeCollapsing: function() {
      pageflow.events.off('page:change', null, this);
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

    _setupMobilePanels: function() {
      var element = this.element;

      element.find('.mobile_panel').each(function() {
        var sharingBox = $(this).filter('.mobile_sharing');
        var scroller = new IScroll($(this).find('.wrapper')[0], {
          mouseWheel: true,
          bounce: false,
          probeType: 3
        });

        element.on(events.pointerDown, '.toggle.mobile_only a', function() {
          scroller.refresh();
        });

        sharingBox.shareMenu({
          scroller: scroller
        });
      });

      $('.mobile_panel a', element).on('click touchstart', function(event) {
        event.stopPropagation();
      });
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
    $('.scroll_indicator').addClass('hidden');
  }

  function showPageContent() {
    $('section.page').removeClass('hidden_by_overlay');
    $('.scroll_indicator').removeClass('hidden');
  }
}(jQuery));
