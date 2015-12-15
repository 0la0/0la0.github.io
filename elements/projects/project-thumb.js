'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {

  var ProjectBehavior = {};

  var ProjectThumb = (function () {
    function ProjectThumb() {
      _classCallCheck(this, ProjectThumb);
    }

    _createClass(ProjectThumb, [{
      key: 'beforeRegister',

      // Element setup goes in beforeRegister instead of createdCallback.
      value: function beforeRegister() {
        this.is = 'project-thumb';

        // Define the properties object in beforeRegister.
        this.properties = {
          ele: {
            type: String,
            value: 'default value'
          }
        };
      }

      // Define other lifecycle methods as you need.

    }, {
      key: 'ready',
      value: function ready() {}
    }, {
      key: 'attached',
      value: function attached() {}
    }, {
      key: 'detached',
      value: function detached() {}
    }, {
      key: 'attributeChanged',
      value: function attributeChanged() {}

      //_updateQuotes() {}

    }, {
      key: 'behaviors',

      // Define behaviors with a getter.
      get: function get() {
        return [ProjectBehavior];
      }
    }]);

    return ProjectThumb;
  })();

  // Register the element using Polymer's constructor.

  Polymer(ProjectThumb);
})();