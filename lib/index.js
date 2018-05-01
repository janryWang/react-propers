"use strict";

exports.__esModule = true;
exports.default = exports.Propers = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _inheritsLoose(subClass, superClass) { subClass.prototype.__proto__ = superClass && superClass.prototype; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var isArr = function isArr(val) {
  return Array.isArray(val);
};

var isStr = function isStr(val) {
  return typeof val === "string";
};

var isFn = function isFn(fn) {
  return typeof fn === "function";
};

var getPathSegments = function getPathSegments(path) {
  if (isArr(path)) return path;

  if (isStr(path) && path) {
    return (path || "").trim().split(/\s*\.\s*/);
  }

  return [];
};

var _createElement = _react.default.createElement;

var getSelector = function getSelector(props, selector) {
  selector = Array.isArray(selector) ? selector : [selector];

  for (var i = 0; i < selector.length; i++) {
    var item = props[selector[i]];
    if (item !== undefined || item !== null) return item;
  }
};

var Propers =
/*#__PURE__*/
function (_React$Component) {
  function Propers() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = Propers.prototype;

  _proto.buildCreateElement = function buildCreateElement() {
    var _this$props = this.props,
        traverse = _this$props.traverse,
        selector = _this$props.selector,
        state = _this$props.state;
    return function (component, props) {
      for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        children[_key - 2] = arguments[_key];
      }

      if (!isFn(traverse)) return _createElement.apply(null, arguments);
      var $selector = props && getSelector(props, selector);
      var $props = $selector ? traverse(props, Object.defineProperties({}, {
        path: {
          get: function get() {
            return getPathSegments(String($selector));
          }
        },
        key: {
          value: $selector,
          writable: false
        },
        payload: {
          value: props,
          writable: false
        },
        index: {
          value: $selector,
          writable: false
        },
        component: {
          value: component,
          writable: false
        },
        state: {
          value: state,
          writable: false
        }
      })) : props;

      if ($selector) {
        if ($props) {
          return _createElement.apply(void 0, [component, $props].concat(children));
        }
      } else {
        return _createElement.apply(void 0, [component, $props].concat(children));
      }
    };
  };

  _proto.render = function render() {
    var children = this.props.children;
    if (!isFn(children)) return children;
    this.react = this.react || _extends({}, _react.default, {
      createElement: this.buildCreateElement()
    });
    return children(this.react);
  };

  _inheritsLoose(Propers, _React$Component);

  return Propers;
}(_react.default.Component);

exports.Propers = Propers;

_defineProperty(Propers, "defaultProps", {
  selector: "id"
});

var _default = Propers;
exports.default = _default;