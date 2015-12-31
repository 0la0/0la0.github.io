'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var hello = 'world';
(function () {
  'use strict';

  var ProjectList = (function () {
    function ProjectList() {
      _classCallCheck(this, ProjectList);
    }

    _createClass(ProjectList, [{
      key: 'beforeRegister',
      value: function beforeRegister() {
        this.is = 'project-list';

        this.properties = {
          objList: {
            type: Array,
            value: [],
            observable: '_listChange'
          }
        };
      }
    }, {
      key: 'ready',
      value: function ready() {
        this.objList = app.projectList;
      }
    }, {
      key: 'attached',
      value: function attached() {}
    }, {
      key: 'detached',
      value: function detached() {}

      //turn off and on the timer here

    }, {
      key: 'attributeChanged',
      value: function attributeChanged() {}
    }, {
      key: '_shuffleList',
      value: function _shuffleList() {
        var _this = this;

        var objListLength = this.objList.length;
        var rand1 = Math.floor(objListLength * Math.random());
        var rand2 = Math.floor(objListLength * Math.random());

        var tempElement = this.objList[rand1];
        this.objList[rand1] = this.objList[rand2];
        this.objList[rand2] = tempElement;
        this._listChange(this.objList);

        setTimeout(function () {
          _this._shuffleList();
        }, 3000);
      }
    }, {
      key: '_listChange',
      value: function _listChange(newVal) {
        this.objList = newVal;
        this.getElementsByTagName('template')[0].render();
      }
    }]);

    return ProjectList;
  })();

  Polymer(ProjectList);
})();