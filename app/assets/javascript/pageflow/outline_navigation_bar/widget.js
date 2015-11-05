//= require ./expandable
//= require ./scroller

(function($) {
  $.widget('pageflow.outlineNavigationBar', {
    _create: function() {
      var that = this;

      ///////// TERRIBLE HACK
      // Ensure all storylines inherit the parent navigation bar for highlighting when this widget is enabled.

      pageflow.HighlightedPage.prototype.getNavigationBarMode = function(storylineId) {
        if (!pageflow.entryData.getStorylineConfiguration(storylineId).main) {
          return 'inherit_from_parent';
        }
      };

      /////////

      $('.top a', this.element).topButton();

      that.element.find('.navigation_volume_box').volumeSlider({
        orientation: 'v'
      });

      /* toggle */

      this.element.find('.toggle a').on('click', function() {
        $(this).toggleClass('active');
        $('.header').toggleClass('active');
        that.element.find('.panel').toggleClass('active');
        that.element.toggleClass('buttons_active');
      });

      /* open header through skiplinks */

      $('a[href="#header"], a[href="#search"]', '#skipLinks').click(function() {
        $('.header').addClass('active');
        $(this.getAttribute('href')).select();
      });

      /* menu boxes */

      $('.menu_box a', this.element)
        .focus(function() {
          $(this).parents('.menu_item').addClass('focused');
        })
        .blur(function() {
          $(this).parents('.menu_item').removeClass('focused');
        });

      var shareBox = $('.share_box', this.element),
          shareLinks = $('a', shareBox);

      shareBox.shareMenu({
        subMenu: $('.sub_share', shareBox),
        links: shareLinks,
        insertAfter: shareLinks.parent().last(),
        closeOnMouseLeaving: shareBox
      });

      /* chapters */

      var pageLinks = $('.scroller a', that.element),
          target;

      function registerHandler() {
        target = $(this);
        target.one('mouseup touchend', goToPage);
      }

      function closeOverview() {
        $('.overview').removeClass("active");
        $('.open_overview', that.element).removeClass("active");
        $('.page .content').removeClass('hidden_by_overlay');
        $('.scroll_indicator').removeClass('hidden');
      }

      function goToPage(e) {
        if (target && target[0] != e.currentTarget) {
          return;
        }

        closeOverview();

        pageflow.slides.goToById(this.getAttribute("data-link"));
        e.preventDefault();
      }

      pageLinks.each(function() {
        $(this).on({
          'mousedown touchstart': registerHandler,
          'click': goToPage
        });
      });

      /* scroller */
      var isFixed = !this.element.hasClass('expandable');
      var scroller = this.element.find('.scroller')
                         .outlineNavigationBarScroller({isFixed: isFixed})
                         .outlineNavigationBarScroller('instance');

      this.element.outlineNavigationBarExpandable({
        isFixed: isFixed,

        expanded: function() {
          scroller.expand();
        },

        collapsed: function() {
          scroller.collapse();
        }
      });

      /* keyboard / skiplinks */

      that.element.find('a, *[tabindex]').on('focus', function() {
        that.element.addClass('focus');
        that.element.outlineNavigationBarExpandable('expand');
      });

      that.element.find('a, *[tabindex]').on('blur', function() {
        that.element.removeClass('focus');
        that.element.outlineNavigationBarExpandable('collapse');
      });

      /* hide text button */
      var hideText = $('.hide_text a', this.element);

      hideText.click(function() {
        pageflow.hideText.toggle();
      });

      pageflow.hideText.on('activate deactivate', function() {
        hideText.toggleClass('active', pageflow.hideText.isActive()).updateTitle();
      });

      /* fullscreen button */

      if ($.support.fullscreen) {
        var fs = $('.fullscreen a', this.element),
            fullscreenCallback = function(isFullScreen) {
              fs
                .toggleClass('active', !!isFullScreen)
                .updateTitle();
            };

        fs.click(function() {
          fs.toggleClass('fs').updateTitle();
          $('#outer_wrapper').fullScreen({callback: fullscreenCallback});
        });
      }
      else {
        $('.fullscreen', this.element).hide();
      }

      $('.menu_item > a', this.element).on({
        'touchstart mousedown': function() {
          $(this).addClass('pressed');
        },
        'touchend mouseup': function() {
          $(this).removeClass('pressed');
        }
      });

      $('.share > a, .credits > a', this.element).on({
        'touchstart': function() {
          var element = $(this).parent().parent();
          element.addClass('open');

          function close(e) {
            if (!element.find(e.target).length) {
              element.removeClass('open');
              $('body').off('touchstart', close);
            }
          }

          $('body').one('touchstart', close);
        }
      });
    }
  });
}(jQuery));
