/*global IScroll*/

(function($) {
  var MIN_LINK_HEIGHT = 0;
  var MAX_LINK_HEIGHT = 35;
  var EXPANDED_OUTER_LINK_HEIGHT = 42;
  var LINK_MARGIN = 2;

  $.widget('pageflow.outlineNavigationBarScroller', {
    _create: function() {
      this.list = this.element.find('ul');
      this.pageLinks = this.element.find('li a');

      this.setupScroller();
      this.setupResizing();
    },

    _destroy: function() {
      this.teardownResizing();
    },

    on: function(event, handler) {
      this.iscroll.on(event, handler);
    },

    setupScroller: function() {
      var scrollerOptions = {
        mouseWheel: true,
        bounce: false,
        probeType: 2
      };

      if (window.navigator.msPointerEnabled) {
        scrollerOptions.preventDefault = false;
      }

      this.iscroll = new IScroll(this.element[0], scrollerOptions);

      if (!this.options.isFixed) {
        this.iscroll.disable();
      }

      this.list.pageNavigationList({
        scroller: this.iscroll,
        scrollToActive: this.options.isFixed,
      });
    },

    setupResizing: function() {
      this.resizeHandler = this.resizeHandler || _.bind(function() {
        setTimeout(_.bind(this.refresh, this), 200);
      }, this);

      $(window).on('resize', this.resizeHandler);
      this.refresh();
    },

    teardownResizing: function() {
      $(window).off('resize', this.resizeHandler);
    },

    refresh: function() {
      var height = this.element.parent().height() - 5;
      var linkCount = this.pageLinks.length;
      var linkHeight = (height / linkCount) - 2;

      linkHeight = Math.min(Math.max(linkHeight, MIN_LINK_HEIGHT), MAX_LINK_HEIGHT);
      this.collapsedOuterLinkHeight = linkHeight + LINK_MARGIN;

      var collapsedListHeight = this.collapsedOuterLinkHeight * linkCount;
      var expandedListHeight = EXPANDED_OUTER_LINK_HEIGHT * linkCount;

      this.isOverflowing = (height < expandedListHeight);
      this.collapsedTop = (height - collapsedListHeight) / 2;
      this.expandedTop = (height - expandedListHeight) / 2;
      this.maxTop = height - linkCount * EXPANDED_OUTER_LINK_HEIGHT;

      this.setTop(this.collapsedTop);
      this.pageLinks.css('height', linkHeight + 'px');
    },

    expand: function() {
      var activeItemIndex = this.pageLinks.filter('.in_active_chapter').parent().index();
      var top;

      if (this.isOverflowing) {
        if (activeItemIndex < this.pageLinks.length - 1) {
          top = activeItemIndex * (this.collapsedOuterLinkHeight - EXPANDED_OUTER_LINK_HEIGHT);
        }
        else {
          top = this.maxTop;
        }

        this.animateTop(top);

        this.scrollTimeout = setTimeout(_.bind(function() {
          this.setTop(0);

          this.iscroll.refresh();
          this.iscroll.scrollTo(0, Math.max(Math.min(0, top), this.iscroll.maxScrollY));
          this.iscroll.enable();
        }, this), 500);
      }
      else {
        this.animateTop(this.expandedTop);
      }
    },

    collapse: function() {
      clearTimeout(this.scrollTimeout);

      if (this.isOverflowing && this.iscroll.enabled) {
        this.setTop(this.iscroll.y);
        this.triggerRepaint();
      }

      this.iscroll.disable();
      this.iscroll.scrollTo(0, 0, 0);

      this.animateTop(this.collapsedTop);
    },

    animateTop: function(top) {
      this.element.addClass('animated');
      this.element.css('top', top);
    },

    setTop: function(top) {
      this.element.removeClass('animated');
      this.element.css('top', top);
    },

    triggerRepaint: function() {
      this.element[0].offsetWidth
    }
  });
}(jQuery));
