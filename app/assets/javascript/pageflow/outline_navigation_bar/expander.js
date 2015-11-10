pageflow.outlineNavigationBar.Expander = pageflow.Object.extend({
  initialize: function(options) {
    this.options = options;
    this.expandedBy = {};
  },

  expand: function(options) {
    this.expandedBy[(options && options.by) || 'button'] = true;
    clearTimeout(this.collapseTimeout);

    if (!this.expanded && this.options.enabled()) {
      this.expanded = true;
      this.options.expand();
    }
  },

  collapse: function(options) {
    delete this.expandedBy[(options && options.by) || 'button'];
    clearTimeout(this.collapseTimeout);

    if (this.expanded && _.keys(this.expandedBy).length === 0) {
      this.expanded = false;
      this.options.collapse();
    }
  },

  scheduleCollapse: function(options) {
    var that = this;

    this.collapseTimeout = setTimeout(function() {
      that.collapse(options);
    }, 200);
  }
});