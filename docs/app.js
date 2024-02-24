import { render, html } from 'lit-html';
import Chart from 'chart.js/auto';

function _callSuper(t, o, e) {
  return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e));
}
function _construct(t, e, r) {
  if (_isNativeReflectConstruct()) return Reflect.construct.apply(null, arguments);
  var o = [null];
  o.push.apply(o, e);
  var p = new (t.bind.apply(t, o))();
  return r && _setPrototypeOf(p, r.prototype), p;
}
function _isNativeReflectConstruct() {
  try {
    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
  } catch (t) {}
  return (_isNativeReflectConstruct = function () {
    return !!t;
  })();
}
function _toPrimitive(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == typeof i ? i : String(i);
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  Object.defineProperty(subClass, "prototype", {
    writable: false
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}
function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };
  return _setPrototypeOf(o, p);
}
function _isNativeFunction(fn) {
  try {
    return Function.toString.call(fn).indexOf("[native code]") !== -1;
  } catch (e) {
    return typeof fn === "function";
  }
}
function _wrapNativeSuper(Class) {
  var _cache = typeof Map === "function" ? new Map() : undefined;
  _wrapNativeSuper = function _wrapNativeSuper(Class) {
    if (Class === null || !_isNativeFunction(Class)) return Class;
    if (typeof Class !== "function") {
      throw new TypeError("Super expression must either be null or a function");
    }
    if (typeof _cache !== "undefined") {
      if (_cache.has(Class)) return _cache.get(Class);
      _cache.set(Class, Wrapper);
    }
    function Wrapper() {
      return _construct(Class, arguments, _getPrototypeOf(this).constructor);
    }
    Wrapper.prototype = Object.create(Class.prototype, {
      constructor: {
        value: Wrapper,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    return _setPrototypeOf(Wrapper, Class);
  };
  return _wrapNativeSuper(Class);
}
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }
  return _assertThisInitialized(self);
}
function _taggedTemplateLiteral(strings, raw) {
  if (!raw) {
    raw = strings.slice(0);
  }
  return Object.freeze(Object.defineProperties(strings, {
    raw: {
      value: Object.freeze(raw)
    }
  }));
}

var prefix = 'walhalla-';
function getItem(key) {
  var defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  return JSON.parse(localStorage.getItem("".concat(prefix).concat(key))) || defaultValue;
}
function setItem(key, value) {
  localStorage.setItem("".concat(prefix).concat(key), JSON.stringify(value));
}

function getSpeed(meter, tickTime, startTime) {
  return meter / ((tickTime - startTime) / 60);
}
function asSpeed(speed) {
  return speed == null ? 0.0.toFixed(2) : speed.toFixed(2);
}
function asTime(totalSeconds) {
  return new Date(totalSeconds * 1000).toISOString().substring(11, 19);
  // const hours = Math.floor(totalSeconds / 3600);
  // const minutes = Math.floor(totalSeconds % 3600 / 60);
  // const seconds = totalSeconds % 3600 % 60;
  // return `${hours}:${minutes}:${seconds}`
}

var _templateObject$1, _templateObject2$1, _templateObject3$1, _templateObject4$1;
var HomeStart = /*#__PURE__*/function (_HTMLElement) {
  _inherits(HomeStart, _HTMLElement);
  function HomeStart() {
    var _this;
    _classCallCheck(this, HomeStart);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _callSuper(this, HomeStart, [].concat(args));
    _defineProperty(_assertThisInitialized(_this), "totalTime", 8 * 60 * 60);
    _defineProperty(_assertThisInitialized(_this), "totalMeter", 1300);
    _defineProperty(_assertThisInitialized(_this), "aimedSpeed", _this.totalMeter / (_this.totalTime / 60));
    _defineProperty(_assertThisInitialized(_this), "started", null);
    _defineProperty(_assertThisInitialized(_this), "tickedRoutes", []);
    _defineProperty(_assertThisInitialized(_this), "speedData", []);
    _defineProperty(_assertThisInitialized(_this), "chart", null);
    return _this;
  }
  _createClass(HomeStart, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      this.load();
      this.render();
      this.setupChart();
      window.addEventListener("resize", this.onResize.bind(this));
    }
  }, {
    key: "onResize",
    value: function onResize(e) {
      this.setCanvasSize();
    }
  }, {
    key: "load",
    value: function load() {
      this.started = getItem('started');
      this.totalTime = getItem('totalTime', 8 * 60 * 60);
      this.totalMeter = getItem('totalMeter', 1300);
      this.aimedSpeed = this.totalMeter / (this.totalTime / 60);
      this.tickedRoutes = getItem('tickedRoutes', []);
      this.speedData = getItem('speedData', []);
      if (this.started) this.startInterval();
    }
  }, {
    key: "meterDone",
    get: function get() {
      return this.speedData.length > 0 ? this.speedData[this.speedData.length - 1].meter : 0;
    }
  }, {
    key: "getSpeed",
    value: function getSpeed() {
      var i = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      var current = this.speedData.length >= i ? this.speedData[this.speedData.length - i] : null;
      return current ? current.speed : 0.0;
    }
  }, {
    key: "render",
    value: function render$1() {
      var _this2 = this;
      var timeGone = this.started ? Math.floor(new Date().getTime() / 1000) - this.started : 0;
      var currentSpeed = this.getSpeed(1);
      var lastSpeed = this.getSpeed(2);
      var speedChange = currentSpeed - lastSpeed;
      render(html(_templateObject$1 || (_templateObject$1 = _taggedTemplateLiteral(["\n             <tick-routes @ticked=\"", "\"></tick-routes>\n            \n             <div class=\"overview-grid\">\n                <span class=\"green\">", "</span>\n                <span class=\"red\">", "</span>\n                \n                <span class=\"green\">", " m</span>\n                <span class=\"red\">", " m</span>\n\n                 <span class=\"", "\">", "</span>\n                 <span class=\"", "\">\n                     <span>", "</span>\n                     <span class=\"", "\">(", ")</span>\n                 </span>\n             </div>\n\n             <div id=\"chart\" style=\"\"><canvas></canvas></div>\n            \n             <div>\n                 ", "\n             </div>\n            \n            ", "\n        "])), function (e) {
        return _this2.routeTicked(e.detail);
      }, asTime(timeGone), asTime(this.totalTime - timeGone), this.meterDone, this.totalMeter - this.meterDone, currentSpeed > this.aimedSpeed ? 'green' : 'red', asSpeed(currentSpeed), lastSpeed > this.aimedSpeed ? 'green' : 'red', asSpeed(lastSpeed), speedChange >= 0 ? 'green' : 'red', asSpeed(speedChange), this.tickedRoutes.map(function (route) {
        return html(_templateObject2$1 || (_templateObject2$1 = _taggedTemplateLiteral(["\n                         <div class=\"route ticked\">\n                             <span>", "</span>\n                             <span>", "</span>\n                             <span>", "</span>\n                             <span>", "m</span>\n                         </div>\n                 "])), route.line.substring(0, 3), route['route-links'], route['vr-grade'], route.height);
      }), this.started ? html(_templateObject3$1 || (_templateObject3$1 = _taggedTemplateLiteral(["\n                <button @click=\"", "\">reset</button>"])), function (_) {
        return _this2.reset();
      }) : html(_templateObject4$1 || (_templateObject4$1 = _taggedTemplateLiteral(["\n                <button @click=\"", "\">start</button>\n            "])), function (_) {
        return _this2.start();
      })), this);
    }
  }, {
    key: "routeTicked",
    value: function routeTicked(route) {
      this.tickedRoutes.push(route);
      setItem('tickedRoutes', this.tickedRoutes);
      var meterDone = this.meterDone + parseFloat(route.height);
      var meterDoneAt = Math.floor(new Date().getTime() / 1000);
      var speed = getSpeed(meterDone, meterDoneAt, this.started);
      this.speedData.push({
        meter: meterDone,
        time: meterDoneAt,
        speed: speed
      });
      setItem('speedData', this.speedData);
      this.chart.data.labels.push(asTime(meterDoneAt - this.started));
      this.chart.data.datasets[0].data.push(speed);
      this.chart.data.datasets[1].data.push(meterDone);
      this.chart.update();
      this.render();
    }
  }, {
    key: "start",
    value: function start() {
      this.started = Math.floor(new Date().getTime() / 1000);
      setItem('started', this.started);
      setItem('totalTime', this.totalTime);
      setItem('totalMeter', this.totalMeter);
      this.startInterval();
    }
  }, {
    key: "reset",
    value: function reset() {
      if (confirm('Really reset?')) {
        this.started = null;
        this.speedData = [];
        this.tickedRoutes = [];
        setItem('started', this.started);
        setItem('speedData', this.speedData);
        setItem('tickedRoutes', this.tickedRoutes);
        clearInterval(this.intervalTimer);
        this.render();
      }
    }
  }, {
    key: "startInterval",
    value: function startInterval() {
      var _this3 = this;
      this.intervalTimer = setInterval(function () {
        return _this3.render();
      }, 1000);
    }
  }, {
    key: "setCanvasSize",
    value: function setCanvasSize() {
      if (this.canvas) {
        var width = Math.floor(Math.min(window.innerWidth * 0.9, 800.0));
        var height = Math.floor(width * 0.5);
        this.canvas.style.width = width + 'px';
        this.canvas.style.height = height + 'px';
      }
      if (this.chart) this.chart.update();
    }
  }, {
    key: "setupChart",
    value: function setupChart() {
      var _this4 = this;
      this.canvas = this.querySelector('#chart canvas');
      this.setCanvasSize();
      this.chart = new Chart(this.canvas, {
        type: 'line',
        data: {
          labels: this.speedData.map(function (item) {
            return asTime(item.time - _this4.started);
          }),
          datasets: [{
            label: 'Speed',
            data: this.speedData.map(function (item) {
              return item.speed;
            }),
            yAxisID: 'y'
          }, {
            label: 'Total Meter',
            data: this.speedData.map(function (item) {
              return item.meter;
            }),
            yAxisID: 'y1'
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              type: 'linear',
              display: true,
              position: 'left'
            },
            y1: {
              type: 'linear',
              display: true,
              position: 'right',
              grid: {
                drawOnChartArea: false
              }
            }
          }
        }
      });
    }
  }]);
  return HomeStart;
}( /*#__PURE__*/_wrapNativeSuper(HTMLElement));
customElements.define("home-start", HomeStart);

var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5;
var TickRoutes = /*#__PURE__*/function (_HTMLElement) {
  _inherits(TickRoutes, _HTMLElement);
  function TickRoutes() {
    var _this;
    _classCallCheck(this, TickRoutes);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _callSuper(this, TickRoutes, [].concat(args));
    _defineProperty(_assertThisInitialized(_this), "routes", []);
    _defineProperty(_assertThisInitialized(_this), "foundRoutes", []);
    _defineProperty(_assertThisInitialized(_this), "tickedRoutes", new Set());
    _defineProperty(_assertThisInitialized(_this), "selectedRoute", null);
    return _this;
  }
  _createClass(TickRoutes, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      this.load();
      this.render();
    }
  }, {
    key: "load",
    value: function load() {
      var _this2 = this;
      fetch("/assets/routes.json").then(function (r) {
        return r.json();
      }).then(function (routes) {
        _this2.routes = routes;
        _this2.render();
      });
      getItem('tickedRoutes', []).forEach(function (r) {
        return _this2.tickedRoutes.add(r['route-links-href']);
      });
    }
  }, {
    key: "render",
    value: function render$1() {
      var _this3 = this;
      render(html(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n            <div>\n                <label>LineNr</label>\n                <input class=\"search\" name=\"search\" @keyup=\"", "\" type=\"number\" placeholder=\"search\">\n            </div>\n            ", "\n        "])), function (e) {
        return _this3.search(e.target.value);
      }, this.selectedRoute ? html(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n                <div class=\"route\">\n                    <span>", "</span>\n                    <span>", "</span>\n                    <span>", "</span>\n                    <span>", "m</span>\n                </div>\n                <button @click=\"", "\">TICK</button>\n                <button @click=\"", "\">CANCEL</button>\n            "])), this.selectedRoute.line.substring(0, 3), this.selectedRoute['route-links'], this.selectedRoute['vr-grade'], this.selectedRoute.height, function (_) {
        return _this3.tickRoute();
      }, function (_) {
        return _this3.cancelSelection();
      }) : html(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n                <div id=\"routeResult\">\n                    ", "\n                </div>\n            "])), this.foundRoutes.length > 0 ? html(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n                    <div @click=\"", "\" class=\"route cancel\">CANCEL</div>\n                    ", "\n                "])), function (_) {
        return _this3.clear();
      }, this.foundRoutes.map(function (route) {
        return html(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["\n                        <div class=\"route ", "\" @click=\"", "\">\n                            <span>", "</span>\n                            <span>", "</span>\n                            <span>", "</span>\n                            <span>", "m</span>\n                        </div>\n                    "])), _this3.tickedRoutes.has(route['route-links-href']) ? 'ticked' : '', function (e) {
          return _this3.selectRoute(e, route);
        }, route.line.substring(0, 3), route['route-links'], route['vr-grade'], route.height);
      })) : '')), this);
    }
  }, {
    key: "clear",
    value: function clear() {
      this.selectedRoute = null;
      this.querySelector('input[name=search]').value = '';
      this.search('');
    }
  }, {
    key: "cancelSelection",
    value: function cancelSelection() {
      this.selectedRoute = null;
      this.render();
    }
  }, {
    key: "selectRoute",
    value: function selectRoute(e, route) {
      e.stopPropagation();
      if (!this.tickedRoutes.has(route['route-links-href'])) {
        this.selectedRoute = route;
        this.render();
      }
    }
  }, {
    key: "tickRoute",
    value: function tickRoute() {
      this.tickedRoutes.add(this.selectedRoute['route-links-href']);
      this.dispatchEvent(new CustomEvent('ticked', {
        detail: this.selectedRoute
      }));
      this.clear();
    }
  }, {
    key: "search",
    value: function search(searchStr) {
      if (searchStr.length > 0) this.foundRoutes = this.routes.filter(function (route) {
        return route.line.startsWith(searchStr);
      });else this.foundRoutes = [];
      this.render();
    }
  }]);
  return TickRoutes;
}( /*#__PURE__*/_wrapNativeSuper(HTMLElement));
customElements.define("tick-routes", TickRoutes);

// if (config.mode === 'PROD') {
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    navigator.serviceWorker.register('/service-worker.js', {
      scope: '/',
      type: "module"
    }).then(function (registration) {
      // Registration was successful
      console.log('Registered!');
    }, function (err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    })["catch"](function (err) {
      console.log(err);
    });
  });
} else {
  console.log('service worker is not supported');
}
// }
