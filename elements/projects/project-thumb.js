'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  var ProjectThumb = (function () {
    function ProjectThumb() {
      _classCallCheck(this, ProjectThumb);
    }

    _createClass(ProjectThumb, [{
      key: 'beforeRegister',
      value: function beforeRegister() {
        this.is = 'project-thumb';

        this.properties = {
          ele: {
            type: String
          }
        };
      }
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
    }, {
      key: 'behaviors',
      get: function get() {
        return [];
      }
    }]);

    return ProjectThumb;
  })();

  Polymer(ProjectThumb);
})();