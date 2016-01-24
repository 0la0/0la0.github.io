'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  'use strict';

  var SimulatedAnnealing = (function () {
    function SimulatedAnnealing() {
      _classCallCheck(this, SimulatedAnnealing);
    }

    _createClass(SimulatedAnnealing, [{
      key: 'beforeRegister',
      value: function beforeRegister() {
        this.is = 'simulated-annealing';
        this.properties = {};
      }
    }, {
      key: 'ready',
      value: function ready() {
        this.hasBeenStarted = false;
        this.isRunning = false;
        this.canvasContainer = this.$$('div');
        this.visibleCanvasElement = this.$$('canvas');
        this.visibleContext = this.visibleCanvasElement.getContext('2d');

        this.hiddenCanvasElement = document.createElement('canvas');
        this.hiddenContext = this.hiddenCanvasElement.getContext('2d');
      }
    }, {
      key: 'attached',
      value: function attached() {
        var _this = this;

        var goalImage = new Image();
        goalImage.src = 'images/sketchSrc/trees.jpg';

        goalImage.onload = function (event) {
          _this.width = goalImage.width;
          _this.height = goalImage.height;

          _this.visibleCanvasElement.width = _this.width;
          _this.visibleCanvasElement.height = _this.height;

          _this.hiddenCanvasElement.width = _this.width;
          _this.hiddenCanvasElement.height = _this.height;
          _this.hiddenContext.fillStyle = 'rgb(238, 238, 238)';
          _this.hiddenContext.fillRect(0, 0, _this.width, _this.height);

          _this.goalState = getGoalState(goalImage, _this.width, _this.height);

          _this._initAnnealing();
        };
      }
    }, {
      key: 'detached',
      value: function detached() {}
    }, {
      key: 'attributeChanged',
      value: function attributeChanged() {}
    }, {
      key: 'start',
      value: function start() {
        this.isRunning = true;
        if (this.hasBeenStarted) {
          this._runIteration();
        }
      }
    }, {
      key: 'stop',
      value: function stop() {
        this.isRunning = false;
      }
    }, {
      key: '_runIteration',
      value: function _runIteration() {
        var _this2 = this;

        this.visibleContext.drawImage(this.hiddenCanvasElement, 0, 0);

        if (isRunningInitialBatch && searchSpaceList.length < terminalLength) {
          isRunningInitialBatch = false;
          terminalLength = Number.MAX_VALUE;
          var searchSize = this.goalState.length / 4;
          searchSpaceList = createSearchSpace(searchSize);
        }

        this.candidates.forEach(function (candidate) {
          var isSettled = candidate.runAnnealingInteration(_this2.goalState);
          var x = candidate.position % _this2.width;
          var y = Math.floor(candidate.position / _this2.width);

          if (isSettled) {
            //permament paint:
            if (isRunningInitialBatch) {
              searchSpaceList.splice(candidate.position, 1);
            }
            _this2.hiddenContext.fillStyle = candidate.fillString;
            _this2.hiddenContext.fillRect(x, y, 1, 1);
            candidate.regenerate(_this2.goalState);
          } else {
            //temporary paint
            _this2.visibleContext.fillStyle = candidate.fillString;
            _this2.visibleContext.fillRect(x, y, 1, 1);
          }
        });

        if (this.isRunning) {
          requestAnimationFrame(this._runIteration.bind(this));
        }
      }
    }, {
      key: '_initAnnealing',
      value: function _initAnnealing() {
        var NUM_CANDIDATES = 500;

        var searchSize = this.goalState.length / 4;
        searchSpaceList = createSearchSpace(searchSize);
        terminalLength = searchSpaceList.length / 2;

        this.candidates = [];
        for (var i = 0; i < NUM_CANDIDATES; i++) {
          this.candidates.push(new AnnealingSolution(this.goalState));
        }
        this.hasBeenStarted = true;

        if (this.isRunning) {
          this._runIteration();
        }
      }
    }, {
      key: 'behaviors',
      get: function get() {
        return [];
      }
    }]);

    return SimulatedAnnealing;
  })();

  Polymer(SimulatedAnnealing);

  var terminalLength = undefined;
  var searchSpaceList = [];
  var isRunningInitialBatch = true;

  function createSearchSpace(length) {
    var tempList = [];
    for (var i = 0; i < length; i++) {
      tempList.push(i);
    }
    return tempList;
  }

  var AnnealingSolution = (function () {
    function AnnealingSolution(pixelMap) {
      _classCallCheck(this, AnnealingSolution);

      this.ACCEPTANCE_THRESHOLD = 10;
      this.regenerate(pixelMap);
    }

    _createClass(AnnealingSolution, [{
      key: 'runAnnealingInteration',
      value: function runAnnealingInteration(pixelMap) {
        if (this.temperature <= 0.1 || this.currentDistance <= this.ACCEPTANCE_THRESHOLD) {
          return true;
        } else {
          this._iterate(pixelMap);
          return false;
        }
      }
    }, {
      key: 'regenerate',
      value: function regenerate(pixelMap) {
        this.pixelValue = Math.floor(255 * Math.random());
        this.temperature = 10;
        var currentPosition = this._generateRandomPosition();
        var currentDistance = this._getPixelDistance(pixelMap, currentPosition);
        this._setNewPosition(currentPosition, currentDistance);
        this.fillString = 'rgb(' + this.pixelValue + ',' + this.pixelValue + ',' + this.pixelValue + ')';
      }
    }, {
      key: '_iterate',
      value: function _iterate(pixelMap) {
        var proposedPosition = this._generateRandomPosition();
        var proposedDistance = this._getPixelDistance(pixelMap, proposedPosition);

        if (proposedDistance <= this.currentDistance) {
          this._setNewPosition(proposedPosition, proposedDistance);
        } else {
          var normalizedDistance = (this.currentDistance - proposedDistance) / 10;
          var exponentValue = normalizedDistance / this.temperature;
          var probabilityOfAcceptance = Math.exp(exponentValue);
          if (Math.random() < probabilityOfAcceptance) {
            this._setNewPosition(proposedPosition, proposedDistance);
          }
        }
        this.temperature *= 0.93;
      }
    }, {
      key: '_setNewPosition',
      value: function _setNewPosition(proposedPosition, proposedDistance) {
        this.position = proposedPosition;
        this.currentDistance = proposedDistance;
      }
    }, {
      key: '_getPixelDistance',
      value: function _getPixelDistance(pixelMap, index) {
        var r = pixelMap[index * 4 + 0];
        var g = pixelMap[index * 4 + 1];
        var b = pixelMap[index * 4 + 2];
        var greyScaleValue = (r + g + b) / 3;
        return Math.abs(this.pixelValue - greyScaleValue);
      }
    }, {
      key: '_generateRandomPosition',
      value: function _generateRandomPosition() {
        var index = Math.floor(searchSpaceList.length * Math.random());
        return searchSpaceList[index];
      }
    }]);

    return AnnealingSolution;
  })();

  function getGoalState(goalImage, width, height) {
    var goalCanvas = document.createElement('canvas');
    goalCanvas.width = width;
    goalCanvas.height = height;
    var goalContext = goalCanvas.getContext('2d');
    goalContext.drawImage(goalImage, 0, 0);
    return goalContext.getImageData(0, 0, width, height).data;
  }
})();