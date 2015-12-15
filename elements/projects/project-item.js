'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {

  //let ProjectBehavior = {};
  var articleMap = new Map();

  var ProjectItem = (function () {
    function ProjectItem() {
      _classCallCheck(this, ProjectItem);
    }

    _createClass(ProjectItem, [{
      key: 'beforeRegister',

      // Define behaviors with a getter.
      // get behaviors() {
      //   return [ProjectBehavior];
      // }

      value: function beforeRegister() {
        this.is = 'project-item';

        //clearly, change id to something else
        this.properties = {
          projectId: {
            type: String,
            value: undefined,
            observer: '_newId'
          }
        };
      }
    }, {
      key: 'ready',
      value: function ready() {
        this.contentContainer = Polymer.dom(this.$.contentContainer);
      }
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
      key: '_newId',
      value: function _newId(newVal, oldVal) {
        this._loadTemplate();
      }
    }, {
      key: '_loadTemplate',
      value: function _loadTemplate() {
        var _this = this;

        if (!this.projectId) {
          this.contentContainer.innerHTML = '';
          Polymer.dom.flush();
          return;
        }
        var url = 'templates/' + this.projectId + '.html';
        this.importHref(url, function (response) {
          var responseArticle;
          if (articleMap.has(_this.projectId)) {
            responseArticle = articleMap.get(_this.projectId);
          } else {
            responseArticle = Polymer.dom(response.target.import).querySelector('article');
            articleMap.set(_this.projectId, responseArticle);
          }
          _this.contentContainer.innerHTML = '';
          _this.contentContainer.appendChild(responseArticle);
          Polymer.dom.flush();
        }, function (error) {
          console.warn('template load error:', error);
        });
      }
    }]);

    return ProjectItem;
  })();

  Polymer(ProjectItem);
})();