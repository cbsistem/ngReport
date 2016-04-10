// Generated by CoffeeScript 1.10.0
(function() {
  'use strict';
  var BaseObject, BaseView, Runtime,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Runtime = require('./runtime');

  BaseObject = (function() {
    function BaseObject(parent) {
      this.name = null;
      this.parent = parent;
      this.children = [];
      this.exportable = true;
      this.printable = true;
      this.height = 0;
      this.report = parent.report;
    }

    BaseObject.prototype.addObject = function(obj) {
      this.children.push(obj);
      return obj.parent = this;
    };

    BaseObject.prototype.clearCache = function() {
      if (this._cachedData) {
        return delete this._cachedData;
      }
    };

    BaseObject.prototype._build = function(page) {
      var PreparedObject, obj;
      PreparedObject = require('./engine').PreparedObject;
      obj = new PreparedObject(page, this.constructor.getClassName());
      obj.target = this;
      obj.height = this.height;
      return obj;
    };

    BaseObject.prototype.load = function(obj) {
      var child, cls, i, k, len, ref, results, v;
      for (k in obj) {
        v = obj[k];
        if (k !== 'children') {
          this[k] = v;
        }
      }
      if (obj.children) {
        ref = obj.children;
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          child = ref[i];
          cls = Runtime.getComponent(child.type);
          obj = new cls(this);
          obj.load(child);
          results.push(this.addObject(obj));
        }
        return results;
      }
    };

    BaseObject.prototype.render = function(page) {
      var child, i, len, ref;
      this._obj = this._build(page);
      ref = this.children;
      for (i = 0, len = ref.length; i < len; i++) {
        child = ref[i];
        child.render(page);
      }
      return this._obj;
    };

    BaseObject.prototype.toHtml = function(obj) {
      return '';
    };

    return BaseObject;

  })();

  BaseView = (function(superClass) {
    extend(BaseView, superClass);

    function BaseView(parent) {
      BaseView.__super__.constructor.call(this, parent);
      this.left = 0;
      this.top = 0;
      this.width = 0;
      this.shiftMode = 'Always';
      this.visible = true;
    }

    BaseView.prototype._build = function(page) {
      var obj;
      obj = BaseView.__super__._build.call(this, page);
      obj.width = this.width;
      obj.top = this.top + page._y;
      obj.bottom = this.top + this.height;
      obj.left = this.left + page._x;
      return obj;
    };

    BaseView.prototype.load = function(obj) {
      return BaseView.__super__.load.call(this, obj);
    };

    return BaseView;

  })(BaseObject);

  module.exports = {
    BaseObject: BaseObject,
    BaseView: BaseView
  };

}).call(this);

//# sourceMappingURL=base.js.map
