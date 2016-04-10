// Generated by CoffeeScript 1.10.0
(function() {
  'use strict';
  var Runtime, report, text, total;

  Runtime = (function() {
    function Runtime() {}

    Runtime.components = {};

    Runtime.getComponent = function(name) {
      return this.components[name];
    };

    Runtime.registerComponent = function(comp) {
      return this.components[comp.getClassName()] = comp;
    };

    return Runtime;

  })();

  module.exports = Runtime;

  report = require('./report');

  text = require('./text');

  total = require('./total');

}).call(this);

//# sourceMappingURL=runtime.js.map
