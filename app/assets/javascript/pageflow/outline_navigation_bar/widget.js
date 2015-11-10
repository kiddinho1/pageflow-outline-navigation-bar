(function($) {
  var events = pageflow.outlineNavigationBar.events;

  $.widget('pageflow.outlineNavigationBar', {
    _create: function() {
      this.expandedBy = {};

      ///////// TERRIBLE HACK
      // Ensure all storylines inherit the parent navigation bar for highlighting when this widget is enabled.

      pageflow.HighlightedPage.prototype.getNavigationBarMode = function(storylineId) {
        if (!pageflow.entryData.getStorylineConfiguration(storylineId).main) {
          return 'inherit_from_parent';
        }
      };

      /////////

      this.element.toggleClass('expandable', !this._isFixed());

      this.panels = this._setupPanels();
      this.scroller = this._setupChaptersPanel();
      this.expandable = this._setupExpandable();

      this._setupPointerDownCollapsing();
      this._setupMouseExpanding();
      this._setupFocusExpanding();
      this._setupGlobalSkipLinks();
      this._setupButtonsPanel();
    },

    expand: function(options) {
      this.expandedBy[(options && options.by) || 'button'] = true;

      if (!this.expanded && !this._isFixed()) {
        this.expanded = true;

        this.expandable.expand();
        this.scroller.expand();

        if (mobileLayout()) {
          hidePageContent();
        }
      }
    },

    collapse: function(options) {
      delete this.expandedBy[(options && options.by) || 'button'];

      if (this.expanded && _.keys(this.expandedBy).length === 0) {
        this.expanded = false;

        this.panels.reset();
        this.expandable.collapse();
        this.scroller.collapse();

        showPageContent();
      }
    },

    _setupExpandable: function() {
      var element = this.element;

      element.outlineNavigationBarExpandable({
        isFixed: this._isFixed()
      });

      return this.element.outlineNavigationBarExpandable('instance');
    },

    _setupPanels: function() {
      var element = this.element;

      return element
        .outlineNavigationBarPanels({
          expandable: this,
          panels: element.find('.panel'),
          toggles: element.find('.toggle'),
        })
        .outlineNavigationBarPanels('instance');
    },

    _setupPointerDownCollapsing: function() {
      var widget = this;
      var element = this.element;

      $('body').on(events.pointerDown, function(event) {
        if (!$(event.target).parents().filter(element).length) {
          widget.collapse();
        }
      });
    },

    _setupMouseExpanding: function() {
      var widget = this;

      if (!pageflow.browser.has('mobile platform')) {
        this.element.on({
          mouseenter: function() {
            if (!mobileLayout()) {
              widget.expand({by: 'mouse'});
            }
          },

          mouseleave: function() {
            if (!mobileLayout()) {
              widget.collapse({by: 'mouse'});
            }
          }
        });
      }
    },

    _setupFocusExpanding: function() {
      var widget = this;

      this.element.find('a, *[tabindex]').on({
        focus: function() {
          widget.expand({by: 'focus'});
        },

        blur: function() {
          widget.collapse({by: 'focus'});
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
