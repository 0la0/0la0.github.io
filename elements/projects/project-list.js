'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var hello = 'world';
(function () {
  'use strict';

  // class Test {
  //   constructor(){console.log('Test!');}
  // }
  // new Test();

  // Http.get('api/dataTest.json')
  //   .then((response) => {
  //     console.log('promise data!', response);
  //   });

  //console.log('app?', app);
  //console.log('http?', window.Http);

  // function getData () {
  //   var xhr = new XMLHttpRequest();
  //   xhr.addEventListener('readystatechange', function() {
  //     if (xhr.readyState === 4 && xhr.status === 200) {
  //       console.log('got data:', xhr.responseText);
  //     }
  //   }, true);
  //
  //   xhr.open('GET', '/api/dataTest.json');
  //   xhr.send();
  // }

  var MyBehavior = {};

  var ProjectList = (function () {
    function ProjectList() {
      _classCallCheck(this, ProjectList);
    }

    _createClass(ProjectList, [{
      key: 'beforeRegister',

      // Element setup goes in beforeRegister instead of createdCallback.
      value: function beforeRegister() {
        //console.log('before register?', Http);
        this.is = 'project-list';

        // Define the properties object in beforeRegister.
        this.properties = {
          objList: {
            type: Array,
            value: [],
            observable: '_listChange'
          }
        };
      }

      // Define other lifecycle methods as you need.

    }, {
      key: 'ready',
      value: function ready() {
        // this.objList = projectList2;
        this.objList = app.projectList;
        //this._shuffleList();
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
    }, {
      key: 'behaviors',

      // Define behaviors with a getter.
      get: function get() {
        return [MyBehavior];
      }
    }]);

    return ProjectList;
  })();

  // Register the element using Polymer's constructor.

  Polymer(ProjectList);
})();