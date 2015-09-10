/*global IScroll*/

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
        that.element.find('.scroller, .buttons').toggleClass('active');
      });

      /* keyboard / skiplinks */

      that.element.find('a, *[tabindex]').on('blur', function() {
        that.element.removeClass('focus');
      });

      that.element.find('a, *[tabindex]').on('focus', function() {
        that.element.addClass('focus');
      });

      /* open header through skiplinks */

      $('a[href="#header"], a[href="#search"]', '#skipLinks').click(function() {
        $('.header').addClass('active');
        $(this.getAttribute('href')).select();
      });

      /* share-button */

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

      pageLinks.each(function(index) {
        $(this).on({
          'mousedown touchstart': registerHandler,
          'click': goToPage
        });
      });

      $('.scroller', this.element).each(function () {
        var scrollerOptions = {
          mouseWheel: true,
          bounce    : false,
          probeType : 2
        };

        /*
          This is just a quick fix to detect IE10. We should
          refactor this condition if we decide to use Modernizr
          or another more global detection.
         */
        if (window.navigator.msPointerEnabled) {
          scrollerOptions.preventDefault = false;
        }

        var scroller = new IScroll(this, scrollerOptions);

        $('.scroller ul', that.element).pageNavigationList({
          scroller: scroller,
          scrollToActive: true
        });
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
