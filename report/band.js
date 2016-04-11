// Generated by CoffeeScript 1.10.0
(function() {
  'use strict';
  var Band, ChildBand, DataBand, PageFooter, PageHeader, ReportTitle, Runtime, base,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  base = require('./base');

  Runtime = require('./runtime');

  Band = (function(superClass) {
    extend(Band, superClass);

    Band.getClassName = function() {
      return 'Band';
    };

    function Band(parent) {
      Band.__super__.constructor.call(this, parent);
      this.canShrink = false;
      this.canBreak = false;
      this.childrenBands = [];
      this.startNewPage = false;
      this._fixed = false;
      this._staticBand = false;
      this._childBand = false;
    }

    Band.prototype.render = function(page, caller) {
      var band, child, h, i, j, k, l, len, len1, len2, len3, ny, obj, oy, ref, ref1, ref2, ref3;
      if (this.name) {
        page.document.engine.scope[this.name] = this;
      }
      if (this.childrenBands) {
        ref = this.childrenBands;
        for (i = 0, len = ref.length; i < len; i++) {
          band = ref[i];
          if (band._printBefore && band.parentNotification) {
            page = band.parentNotification(this, page);
          }
        }
      }
      h = 0;
      ref1 = this.children;
      for (j = 0, len1 = ref1.length; j < len1; j++) {
        child = ref1[j];
        obj = child.render(page);
        if (this._fixed) {
          page.addObject(child._obj);
        }
        h = Math.max(h, obj.bottom);
      }
      h = Math.max(h, this.height);
      if (this._fixed === false) {
        ny = 0;
        if ((h + page._y) > page._maxHeight) {
          oy = page._y;
          page = page.newPage(page.document, caller);
          ny = page._y;
        }
        ref2 = this.children;
        for (k = 0, len2 = ref2.length; k < len2; k++) {
          child = ref2[k];
          if (ny > 0) {
            child._obj.top -= oy;
            child._obj.top += ny;
          }
          page.addObject(child._obj);
          delete child._obj;
        }
      }
      page._y += h;
      if (this.childrenBands) {
        ref3 = this.childrenBands;
        for (l = 0, len3 = ref3.length; l < len3; l++) {
          band = ref3[l];
          if (!band._printBefore && band.parentNotification) {
            page = band.parentNotification(this, page);
          }
        }
      }
      return page;
    };

    return Band;

  })(base.BaseObject);

  DataBand = (function(superClass) {
    extend(DataBand, superClass);

    DataBand.getClassName = function() {
      return 'DataBand';
    };

    function DataBand(parent) {
      DataBand.__super__.constructor.call(this, parent);
      this.maxRows = 0;
      this.rowCount = 1;
      this.data = null;
      this.keepTogether = false;
      this._y = 0;
    }

    DataBand.prototype._calcHeight = function() {
      return this.height;
    };

    DataBand.prototype.render = function(page) {
      var c, i, j, k, len, len1, ref, ref1, results, results1, row, rows, total;
      if (this.data) {
        rows = this.data;
      } else if (this.rowCount) {
        rows = (function() {
          results = [];
          for (var i = 1, ref = this.rowCount; 1 <= ref ? i <= ref : i >= ref; 1 <= ref ? i++ : i--){ results.push(i); }
          return results;
        }).apply(this);
      }
      c = 0;
      results1 = [];
      for (j = 0, len = rows.length; j < len; j++) {
        row = rows[j];
        c++;
        page.document.engine.scope['row'] = c;
        ref1 = page.document.report.totals;
        for (k = 0, len1 = ref1.length; k < len1; k++) {
          total = ref1[k];
          if (total.band === this) {
            total.compute(this, page);
          }
        }
        page = DataBand.__super__.render.call(this, page, true);
        if (this.maxRows && c >= this.maxRows) {
          break;
        } else {
          results1.push(void 0);
        }
      }
      return results1;
    };

    return DataBand;

  })(Band);

  ChildBand = (function(superClass) {
    extend(ChildBand, superClass);

    ChildBand.getClassName(function() {
      return 'Child';
    });

    function ChildBand(parent) {
      ChildBand.__super__.constructor.call(this, parent);
      this.parentBand = null;
      this._childBand = true;
      this._printBefore = false;
    }

    return ChildBand;

  })(Band);

  ReportTitle = (function(superClass) {
    extend(ReportTitle, superClass);

    ReportTitle.getClassName = function() {
      return 'ReportTitle';
    };

    function ReportTitle(parent) {
      ReportTitle.__super__.constructor.call(this, parent);
      this._fixed = true;
      this._staticBand = true;
    }

    return ReportTitle;

  })(Band);

  PageHeader = (function(superClass) {
    extend(PageHeader, superClass);

    PageHeader.getClassName(function() {
      return 'PageHeader';
    });

    function PageHeader(parent) {
      PageHeader.__super__.constructor.call(this, parent);
      this._fixed = true;
      this._staticBand = true;
    }

    return PageHeader;

  })(Band);

  PageFooter = (function(superClass) {
    extend(PageFooter, superClass);

    PageFooter.getClassName = function() {
      return 'PageFooter';
    };

    function PageFooter(parent) {
      PageFooter.__super__.constructor.call(this, parent);
      this._fixed = true;
      this._staticBand = true;
    }

    PageFooter.prototype.render = function(page) {
      var oy;
      oy = page._y;
      page._y = page._maxHeight - this.height;
      PageFooter.__super__.render.call(this, page);
      page._maxHeight -= this.height;
      return page._y = oy;
    };

    return PageFooter;

  })(Band);

  Runtime.registerComponent(ChildBand);

  Runtime.registerComponent(DataBand);

  Runtime.registerComponent(ReportTitle);

  Runtime.registerComponent(PageHeader);

  Runtime.registerComponent(PageFooter);

  module.exports = {
    Band: Band,
    DataBand: DataBand,
    ChildBand: ChildBand,
    PageHeader: PageHeader,
    PageFooter: PageFooter
  };

}).call(this);

//# sourceMappingURL=band.js.map
