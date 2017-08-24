webpackJsonp([3],{

/***/ "./node_modules/classnames/index.js":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
  Copyright (c) 2016 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
/* global define */

(function () {
	'use strict';

	var hasOwn = {}.hasOwnProperty;

	function classNames () {
		var classes = [];

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) continue;

			var argType = typeof arg;

			if (argType === 'string' || argType === 'number') {
				classes.push(arg);
			} else if (Array.isArray(arg)) {
				classes.push(classNames.apply(null, arg));
			} else if (argType === 'object') {
				for (var key in arg) {
					if (hasOwn.call(arg, key) && arg[key]) {
						classes.push(key);
					}
				}
			}
		}

		return classes.join(' ');
	}

	if (typeof module !== 'undefined' && module.exports) {
		module.exports = classNames;
	} else if (true) {
		// register as 'classnames', consistent with npm package name
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
			return classNames;
		}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {
		window.classNames = classNames;
	}
}());


/***/ }),

/***/ "./node_modules/deep-equal/index.js":
/***/ (function(module, exports, __webpack_require__) {

var pSlice = Array.prototype.slice;
var objectKeys = __webpack_require__("./node_modules/deep-equal/lib/keys.js");
var isArguments = __webpack_require__("./node_modules/deep-equal/lib/is_arguments.js");

var deepEqual = module.exports = function (actual, expected, opts) {
  if (!opts) opts = {};
  // 7.1. All identical values are equivalent, as determined by ===.
  if (actual === expected) {
    return true;

  } else if (actual instanceof Date && expected instanceof Date) {
    return actual.getTime() === expected.getTime();

  // 7.3. Other pairs that do not both pass typeof value == 'object',
  // equivalence is determined by ==.
  } else if (!actual || !expected || typeof actual != 'object' && typeof expected != 'object') {
    return opts.strict ? actual === expected : actual == expected;

  // 7.4. For all other Object pairs, including Array objects, equivalence is
  // determined by having the same number of owned properties (as verified
  // with Object.prototype.hasOwnProperty.call), the same set of keys
  // (although not necessarily the same order), equivalent values for every
  // corresponding key, and an identical 'prototype' property. Note: this
  // accounts for both named and indexed properties on Arrays.
  } else {
    return objEquiv(actual, expected, opts);
  }
}

function isUndefinedOrNull(value) {
  return value === null || value === undefined;
}

function isBuffer (x) {
  if (!x || typeof x !== 'object' || typeof x.length !== 'number') return false;
  if (typeof x.copy !== 'function' || typeof x.slice !== 'function') {
    return false;
  }
  if (x.length > 0 && typeof x[0] !== 'number') return false;
  return true;
}

function objEquiv(a, b, opts) {
  var i, key;
  if (isUndefinedOrNull(a) || isUndefinedOrNull(b))
    return false;
  // an identical 'prototype' property.
  if (a.prototype !== b.prototype) return false;
  //~~~I've managed to break Object.keys through screwy arguments passing.
  //   Converting to array solves the problem.
  if (isArguments(a)) {
    if (!isArguments(b)) {
      return false;
    }
    a = pSlice.call(a);
    b = pSlice.call(b);
    return deepEqual(a, b, opts);
  }
  if (isBuffer(a)) {
    if (!isBuffer(b)) {
      return false;
    }
    if (a.length !== b.length) return false;
    for (i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }
  try {
    var ka = objectKeys(a),
        kb = objectKeys(b);
  } catch (e) {//happens when one is a string literal and the other isn't
    return false;
  }
  // having the same number of owned properties (keys incorporates
  // hasOwnProperty)
  if (ka.length != kb.length)
    return false;
  //the same set of keys (although not necessarily the same order),
  ka.sort();
  kb.sort();
  //~~~cheap key test
  for (i = ka.length - 1; i >= 0; i--) {
    if (ka[i] != kb[i])
      return false;
  }
  //equivalent values for every corresponding key, and
  //~~~possibly expensive deep test
  for (i = ka.length - 1; i >= 0; i--) {
    key = ka[i];
    if (!deepEqual(a[key], b[key], opts)) return false;
  }
  return typeof a === typeof b;
}


/***/ }),

/***/ "./node_modules/deep-equal/lib/is_arguments.js":
/***/ (function(module, exports) {

var supportsArgumentsClass = (function(){
  return Object.prototype.toString.call(arguments)
})() == '[object Arguments]';

exports = module.exports = supportsArgumentsClass ? supported : unsupported;

exports.supported = supported;
function supported(object) {
  return Object.prototype.toString.call(object) == '[object Arguments]';
};

exports.unsupported = unsupported;
function unsupported(object){
  return object &&
    typeof object == 'object' &&
    typeof object.length == 'number' &&
    Object.prototype.hasOwnProperty.call(object, 'callee') &&
    !Object.prototype.propertyIsEnumerable.call(object, 'callee') ||
    false;
};


/***/ }),

/***/ "./node_modules/deep-equal/lib/keys.js":
/***/ (function(module, exports) {

exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}


/***/ }),

/***/ "./node_modules/dom-helpers/events/off.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _inDOM = __webpack_require__("./node_modules/dom-helpers/util/inDOM.js");

var _inDOM2 = _interopRequireDefault(_inDOM);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var off = function off() {};
if (_inDOM2.default) {
  off = function () {
    if (document.addEventListener) return function (node, eventName, handler, capture) {
      return node.removeEventListener(eventName, handler, capture || false);
    };else if (document.attachEvent) return function (node, eventName, handler) {
      return node.detachEvent('on' + eventName, handler);
    };
  }();
}

exports.default = off;
module.exports = exports['default'];

/***/ }),

/***/ "./node_modules/dom-helpers/events/on.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _inDOM = __webpack_require__("./node_modules/dom-helpers/util/inDOM.js");

var _inDOM2 = _interopRequireDefault(_inDOM);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var on = function on() {};
if (_inDOM2.default) {
  on = function () {

    if (document.addEventListener) return function (node, eventName, handler, capture) {
      return node.addEventListener(eventName, handler, capture || false);
    };else if (document.attachEvent) return function (node, eventName, handler) {
      return node.attachEvent('on' + eventName, function (e) {
        e = e || window.event;
        e.target = e.target || e.srcElement;
        e.currentTarget = node;
        handler.call(node, e);
      });
    };
  }();
}

exports.default = on;
module.exports = exports['default'];

/***/ }),

/***/ "./node_modules/dom-helpers/query/contains.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _inDOM = __webpack_require__("./node_modules/dom-helpers/util/inDOM.js");

var _inDOM2 = _interopRequireDefault(_inDOM);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  // HTML DOM and SVG DOM may have different support levels,
  // so we need to check on context instead of a document root element.
  return _inDOM2.default ? function (context, node) {
    if (context.contains) {
      return context.contains(node);
    } else if (context.compareDocumentPosition) {
      return context === node || !!(context.compareDocumentPosition(node) & 16);
    } else {
      return fallback(context, node);
    }
  } : fallback;
}();

function fallback(context, node) {
  if (node) do {
    if (node === context) return true;
  } while (node = node.parentNode);

  return false;
}
module.exports = exports['default'];

/***/ }),

/***/ "./node_modules/dom-helpers/util/inDOM.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = !!(typeof window !== 'undefined' && window.document && window.document.createElement);
module.exports = exports['default'];

/***/ }),

/***/ "./node_modules/exenv/index.js":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/*!
  Copyright (c) 2015 Jed Watson.
  Based on code that is Copyright 2013-2015, Facebook, Inc.
  All rights reserved.
*/
/* global define */

(function () {
	'use strict';

	var canUseDOM = !!(
		typeof window !== 'undefined' &&
		window.document &&
		window.document.createElement
	);

	var ExecutionEnvironment = {

		canUseDOM: canUseDOM,

		canUseWorkers: typeof Worker !== 'undefined',

		canUseEventListeners:
			canUseDOM && !!(window.addEventListener || window.attachEvent),

		canUseViewport: canUseDOM && !!window.screen

	};

	if (true) {
		!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
			return ExecutionEnvironment;
		}.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else if (typeof module !== 'undefined' && module.exports) {
		module.exports = ExecutionEnvironment;
	} else {
		window.ExecutionEnvironment = ExecutionEnvironment;
	}

}());


/***/ }),

/***/ "./node_modules/keycode/index.js":
/***/ (function(module, exports) {

// Source: http://jsfiddle.net/vWx8V/
// http://stackoverflow.com/questions/5603195/full-list-of-javascript-keycodes

/**
 * Conenience method returns corresponding value for given keyName or keyCode.
 *
 * @param {Mixed} keyCode {Number} or keyName {String}
 * @return {Mixed}
 * @api public
 */

exports = module.exports = function(searchInput) {
  // Keyboard Events
  if (searchInput && 'object' === typeof searchInput) {
    var hasKeyCode = searchInput.which || searchInput.keyCode || searchInput.charCode
    if (hasKeyCode) searchInput = hasKeyCode
  }

  // Numbers
  if ('number' === typeof searchInput) return names[searchInput]

  // Everything else (cast to string)
  var search = String(searchInput)

  // check codes
  var foundNamedKey = codes[search.toLowerCase()]
  if (foundNamedKey) return foundNamedKey

  // check aliases
  var foundNamedKey = aliases[search.toLowerCase()]
  if (foundNamedKey) return foundNamedKey

  // weird character?
  if (search.length === 1) return search.charCodeAt(0)

  return undefined
}

/**
 * Get by name
 *
 *   exports.code['enter'] // => 13
 */

var codes = exports.code = exports.codes = {
  'backspace': 8,
  'tab': 9,
  'enter': 13,
  'shift': 16,
  'ctrl': 17,
  'alt': 18,
  'pause/break': 19,
  'caps lock': 20,
  'esc': 27,
  'space': 32,
  'page up': 33,
  'page down': 34,
  'end': 35,
  'home': 36,
  'left': 37,
  'up': 38,
  'right': 39,
  'down': 40,
  'insert': 45,
  'delete': 46,
  'command': 91,
  'left command': 91,
  'right command': 93,
  'numpad *': 106,
  'numpad +': 107,
  'numpad -': 109,
  'numpad .': 110,
  'numpad /': 111,
  'num lock': 144,
  'scroll lock': 145,
  'my computer': 182,
  'my calculator': 183,
  ';': 186,
  '=': 187,
  ',': 188,
  '-': 189,
  '.': 190,
  '/': 191,
  '`': 192,
  '[': 219,
  '\\': 220,
  ']': 221,
  "'": 222
}

// Helper aliases

var aliases = exports.aliases = {
  'windows': 91,
  '⇧': 16,
  '⌥': 18,
  '⌃': 17,
  '⌘': 91,
  'ctl': 17,
  'control': 17,
  'option': 18,
  'pause': 19,
  'break': 19,
  'caps': 20,
  'return': 13,
  'escape': 27,
  'spc': 32,
  'pgup': 33,
  'pgdn': 34,
  'ins': 45,
  'del': 46,
  'cmd': 91
}


/*!
 * Programatically add the following
 */

// lower case chars
for (i = 97; i < 123; i++) codes[String.fromCharCode(i)] = i - 32

// numbers
for (var i = 48; i < 58; i++) codes[i - 48] = i

// function keys
for (i = 1; i < 13; i++) codes['f'+i] = i + 111

// numpad keys
for (i = 0; i < 10; i++) codes['numpad '+i] = i + 96

/**
 * Get by code
 *
 *   exports.name[13] // => 'Enter'
 */

var names = exports.names = exports.title = {} // title for backward compat

// Create reverse mapping
for (i in codes) names[codes[i]] = i

// Add aliases
for (var alias in aliases) {
  codes[alias] = aliases[alias]
}


/***/ }),

/***/ "./node_modules/lodash/debounce.js":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("./node_modules/lodash/isObject.js"),
    now = __webpack_require__("./node_modules/lodash/now.js"),
    toNumber = __webpack_require__("./node_modules/lodash/toNumber.js");

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max,
    nativeMin = Math.min;

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel);
 */
function debounce(func, wait, options) {
  var lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  wait = toNumber(wait) || 0;
  if (isObject(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    var args = lastArgs,
        thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        result = wait - timeSinceLastCall;

    return maxing ? nativeMin(result, maxWait - timeSinceLastInvoke) : result;
  }

  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
  }

  function timerExpired() {
    var time = now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(now());
  }

  function debounced() {
    var time = now(),
        isInvoking = shouldInvoke(time);

    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}

module.exports = debounce;


/***/ }),

/***/ "./node_modules/lodash/now.js":
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__("./node_modules/lodash/_root.js");

/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => Logs the number of milliseconds it took for the deferred invocation.
 */
var now = function() {
  return root.Date.now();
};

module.exports = now;


/***/ }),

/***/ "./node_modules/lodash/toNumber.js":
/***/ (function(module, exports) {

/**
 * This method returns the first argument it receives.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'a': 1 };
 *
 * console.log(_.identity(object) === object);
 * // => true
 */
function identity(value) {
  return value;
}

module.exports = identity;


/***/ }),

/***/ "./node_modules/material-ui/Button/Button.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.styles = undefined;

var _defineProperty2 = __webpack_require__("./node_modules/babel-runtime/helpers/defineProperty.js");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _objectWithoutProperties2 = __webpack_require__("./node_modules/babel-runtime/helpers/objectWithoutProperties.js");

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _extends2 = __webpack_require__("./node_modules/babel-runtime/helpers/extends.js");

var _extends3 = _interopRequireDefault(_extends2);

var _ref;
// @inheritedComponent ButtonBase

var _react = __webpack_require__("./node_modules/react/react.js");

var _react2 = _interopRequireDefault(_react);

var _classnames = __webpack_require__("./node_modules/classnames/index.js");

var _classnames2 = _interopRequireDefault(_classnames);

var _withStyles = __webpack_require__("./node_modules/material-ui/styles/withStyles.js");

var _withStyles2 = _interopRequireDefault(_withStyles);

var _colorManipulator = __webpack_require__("./node_modules/material-ui/styles/colorManipulator.js");

var _ButtonBase = __webpack_require__("./node_modules/material-ui/ButtonBase/index.js");

var _ButtonBase2 = _interopRequireDefault(_ButtonBase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var babelPluginFlowReactPropTypes_proptype_Element = __webpack_require__("./node_modules/react/react.js").babelPluginFlowReactPropTypes_proptype_Element || __webpack_require__("./node_modules/prop-types/index.js").any;

var styles = exports.styles = function styles(theme) {
  return {
    root: (0, _extends3.default)({}, theme.typography.button, {
      lineHeight: '1em',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxSizing: 'border-box',
      minWidth: 88,
      minHeight: 36,
      padding: '11px ' + theme.spacing.unit * 2 + 'px',
      borderRadius: 2,
      color: theme.palette.text.primary,
      backgroundColor: 'transparent',
      transition: theme.transitions.create(['background-color', 'box-shadow'], {
        duration: theme.transitions.duration.short
      }),
      '&:hover': {
        textDecoration: 'none',
        // Reset on mouse devices
        backgroundColor: (0, _colorManipulator.fade)(theme.palette.text.primary, 0.12),
        '@media (hover: none)': {
          backgroundColor: 'transparent'
        },
        '&$disabled': {
          backgroundColor: 'transparent'
        }
      }
    }),
    dense: {
      padding: '10px ' + theme.spacing.unit + 'px',
      minWidth: 64,
      minHeight: 32,
      fontSize: theme.typography.fontSize - 1
    },
    label: {
      width: '100%',
      display: 'inherit',
      alignItems: 'inherit',
      justifyContent: 'inherit'
    },
    flatPrimary: {
      color: theme.palette.primary[500],
      '&:hover': {
        backgroundColor: (0, _colorManipulator.fade)(theme.palette.primary[500], 0.12),
        // Reset on mouse devices
        '@media (hover: none)': {
          backgroundColor: 'transparent'
        }
      }
    },
    flatAccent: {
      color: theme.palette.accent.A200,
      '&:hover': {
        backgroundColor: (0, _colorManipulator.fade)(theme.palette.accent.A200, 0.12),
        // Reset on mouse devices
        '@media (hover: none)': {
          backgroundColor: 'transparent'
        }
      }
    },
    flatContrast: {
      color: theme.palette.getContrastText(theme.palette.primary[500]),
      '&:hover': {
        backgroundColor: (0, _colorManipulator.fade)(theme.palette.getContrastText(theme.palette.primary[500]), 0.12),
        // Reset on mouse devices
        '@media (hover: none)': {
          backgroundColor: 'transparent'
        }
      }
    },
    colorInherit: {
      color: 'inherit'
    },
    raised: {
      color: theme.palette.getContrastText(theme.palette.grey[300]),
      backgroundColor: theme.palette.grey[300],
      boxShadow: theme.shadows[2],
      '&$keyboardFocused': {
        boxShadow: theme.shadows[6]
      },
      '&:active': {
        boxShadow: theme.shadows[8]
      },
      '&$disabled': {
        boxShadow: theme.shadows[0],
        backgroundColor: theme.palette.text.divider
      },
      '&:hover': {
        backgroundColor: theme.palette.grey.A100,
        // Reset on mouse devices
        '@media (hover: none)': {
          backgroundColor: theme.palette.grey[300]
        },
        '&$disabled': {
          backgroundColor: theme.palette.text.divider,
          // Reset on mouse devices
          '@media (hover: none)': {
            backgroundColor: theme.palette.grey[300]
          }
        }
      }
    },
    keyboardFocused: {},
    raisedPrimary: {
      color: theme.palette.getContrastText(theme.palette.primary[500]),
      backgroundColor: theme.palette.primary[500],
      '&:hover': {
        backgroundColor: theme.palette.primary[700],
        // Reset on mouse devices
        '@media (hover: none)': {
          backgroundColor: theme.palette.primary[500]
        }
      }
    },
    raisedAccent: {
      color: theme.palette.getContrastText(theme.palette.accent.A200),
      backgroundColor: theme.palette.accent.A200,
      '&:hover': {
        backgroundColor: theme.palette.accent.A400,
        // Reset on mouse devices
        '@media (hover: none)': {
          backgroundColor: theme.palette.accent.A200
        }
      }
    },
    raisedContrast: {
      color: theme.palette.getContrastText(theme.palette.primary[500])
    },
    disabled: {
      color: theme.palette.action.disabled
    },
    fab: {
      borderRadius: '50%',
      padding: 0,
      minWidth: 0,
      width: 56,
      height: 56,
      boxShadow: theme.shadows[6],
      '&:active': {
        boxShadow: theme.shadows[12]
      }
    }
  };
};

var babelPluginFlowReactPropTypes_proptype_Props = {
  children: typeof babelPluginFlowReactPropTypes_proptype_Element === 'function' ? babelPluginFlowReactPropTypes_proptype_Element.isRequired ? babelPluginFlowReactPropTypes_proptype_Element.isRequired : babelPluginFlowReactPropTypes_proptype_Element : __webpack_require__("./node_modules/prop-types/index.js").shape(babelPluginFlowReactPropTypes_proptype_Element).isRequired,
  classes: __webpack_require__("./node_modules/prop-types/index.js").object,
  className: __webpack_require__("./node_modules/prop-types/index.js").string,
  color: __webpack_require__("./node_modules/prop-types/index.js").oneOf(['default', 'inherit', 'primary', 'accent', 'contrast']),
  component: __webpack_require__("./node_modules/prop-types/index.js").oneOfType([__webpack_require__("./node_modules/prop-types/index.js").string, __webpack_require__("./node_modules/prop-types/index.js").func]),
  dense: __webpack_require__("./node_modules/prop-types/index.js").bool,
  disabled: __webpack_require__("./node_modules/prop-types/index.js").bool,
  disableFocusRipple: __webpack_require__("./node_modules/prop-types/index.js").bool,
  disableRipple: __webpack_require__("./node_modules/prop-types/index.js").bool,
  fab: __webpack_require__("./node_modules/prop-types/index.js").bool,
  href: __webpack_require__("./node_modules/prop-types/index.js").string,
  raised: __webpack_require__("./node_modules/prop-types/index.js").bool,
  type: __webpack_require__("./node_modules/prop-types/index.js").string
};


function Button(props) {
  var _classNames;

  var children = props.children,
      classes = props.classes,
      classNameProp = props.className,
      color = props.color,
      dense = props.dense,
      disabled = props.disabled,
      disableFocusRipple = props.disableFocusRipple,
      fab = props.fab,
      raised = props.raised,
      other = (0, _objectWithoutProperties3.default)(props, ['children', 'classes', 'className', 'color', 'dense', 'disabled', 'disableFocusRipple', 'fab', 'raised']);


  var flat = !raised && !fab;
  var className = (0, _classnames2.default)((_classNames = {}, (0, _defineProperty3.default)(_classNames, classes.root, true), (0, _defineProperty3.default)(_classNames, classes.raised, raised || fab), (0, _defineProperty3.default)(_classNames, classes.fab, fab), (0, _defineProperty3.default)(_classNames, classes.colorInherit, color === 'inherit'), (0, _defineProperty3.default)(_classNames, classes.flatPrimary, flat && color === 'primary'), (0, _defineProperty3.default)(_classNames, classes.flatAccent, flat && color === 'accent'), (0, _defineProperty3.default)(_classNames, classes.flatContrast, flat && color === 'contrast'), (0, _defineProperty3.default)(_classNames, classes.raisedPrimary, !flat && color === 'primary'), (0, _defineProperty3.default)(_classNames, classes.raisedAccent, !flat && color === 'accent'), (0, _defineProperty3.default)(_classNames, classes.raisedContrast, !flat && color === 'contrast'), (0, _defineProperty3.default)(_classNames, classes.dense, dense), (0, _defineProperty3.default)(_classNames, classes.disabled, disabled), _classNames), classNameProp);

  return _react2.default.createElement(
    _ButtonBase2.default,
    (0, _extends3.default)({
      className: className,
      disabled: disabled,
      focusRipple: !disableFocusRipple,
      keyboardFocusedClassName: classes.keyboardFocused
    }, other),
    _react2.default.createElement(
      'span',
      { className: classes.label },
      children
    )
  );
}

Button.propTypes =  true ? (_ref = {
  classes: __webpack_require__("./node_modules/prop-types/index.js").object.isRequired,
  color: __webpack_require__("./node_modules/prop-types/index.js").oneOf(['default']).isRequired,
  dense: __webpack_require__("./node_modules/prop-types/index.js").bool.isRequired,
  disabled: __webpack_require__("./node_modules/prop-types/index.js").bool.isRequired,
  fab: __webpack_require__("./node_modules/prop-types/index.js").bool.isRequired,
  disableFocusRipple: __webpack_require__("./node_modules/prop-types/index.js").bool.isRequired,
  raised: __webpack_require__("./node_modules/prop-types/index.js").bool.isRequired,
  disableRipple: __webpack_require__("./node_modules/prop-types/index.js").bool.isRequired,
  type: __webpack_require__("./node_modules/prop-types/index.js").oneOf(['button']).isRequired,
  children: typeof babelPluginFlowReactPropTypes_proptype_Element === 'function' ? babelPluginFlowReactPropTypes_proptype_Element.isRequired ? babelPluginFlowReactPropTypes_proptype_Element.isRequired : babelPluginFlowReactPropTypes_proptype_Element : __webpack_require__("./node_modules/prop-types/index.js").shape(babelPluginFlowReactPropTypes_proptype_Element).isRequired
}, (0, _defineProperty3.default)(_ref, 'classes', __webpack_require__("./node_modules/prop-types/index.js").object), (0, _defineProperty3.default)(_ref, 'className', __webpack_require__("./node_modules/prop-types/index.js").string), (0, _defineProperty3.default)(_ref, 'color', __webpack_require__("./node_modules/prop-types/index.js").oneOf(['default', 'inherit', 'primary', 'accent', 'contrast'])), (0, _defineProperty3.default)(_ref, 'component', __webpack_require__("./node_modules/prop-types/index.js").oneOfType([__webpack_require__("./node_modules/prop-types/index.js").string, __webpack_require__("./node_modules/prop-types/index.js").func])), (0, _defineProperty3.default)(_ref, 'dense', __webpack_require__("./node_modules/prop-types/index.js").bool), (0, _defineProperty3.default)(_ref, 'disabled', __webpack_require__("./node_modules/prop-types/index.js").bool), (0, _defineProperty3.default)(_ref, 'disableFocusRipple', __webpack_require__("./node_modules/prop-types/index.js").bool), (0, _defineProperty3.default)(_ref, 'disableRipple', __webpack_require__("./node_modules/prop-types/index.js").bool), (0, _defineProperty3.default)(_ref, 'fab', __webpack_require__("./node_modules/prop-types/index.js").bool), (0, _defineProperty3.default)(_ref, 'href', __webpack_require__("./node_modules/prop-types/index.js").string), (0, _defineProperty3.default)(_ref, 'raised', __webpack_require__("./node_modules/prop-types/index.js").bool), (0, _defineProperty3.default)(_ref, 'type', __webpack_require__("./node_modules/prop-types/index.js").string), _ref) : {};
Button.defaultProps = {
  color: 'default',
  dense: false,
  disabled: false,
  fab: false,
  disableFocusRipple: false,
  raised: false,
  disableRipple: false,
  type: 'button'
};

exports.default = (0, _withStyles2.default)(styles, { name: 'MuiButton' })(Button);

/***/ }),

/***/ "./node_modules/material-ui/Button/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Button = __webpack_require__("./node_modules/material-ui/Button/Button.js");

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Button).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),

/***/ "./node_modules/material-ui/ButtonBase/ButtonBase.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.styles = undefined;

var _extends2 = __webpack_require__("./node_modules/babel-runtime/helpers/extends.js");

var _extends3 = _interopRequireDefault(_extends2);

var _defineProperty2 = __webpack_require__("./node_modules/babel-runtime/helpers/defineProperty.js");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _objectWithoutProperties2 = __webpack_require__("./node_modules/babel-runtime/helpers/objectWithoutProperties.js");

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _getPrototypeOf = __webpack_require__("./node_modules/babel-runtime/core-js/object/get-prototype-of.js");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__("./node_modules/babel-runtime/helpers/classCallCheck.js");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__("./node_modules/babel-runtime/helpers/createClass.js");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__("./node_modules/babel-runtime/helpers/possibleConstructorReturn.js");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__("./node_modules/babel-runtime/helpers/inherits.js");

var _inherits3 = _interopRequireDefault(_inherits2);

var _ref2, _ref3; //  weak

var _react = __webpack_require__("./node_modules/react/react.js");

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__("./node_modules/react-dom/index.js");

var _warning = __webpack_require__("./node_modules/warning/browser.js");

var _warning2 = _interopRequireDefault(_warning);

var _classnames = __webpack_require__("./node_modules/classnames/index.js");

var _classnames2 = _interopRequireDefault(_classnames);

var _keycode = __webpack_require__("./node_modules/keycode/index.js");

var _keycode2 = _interopRequireDefault(_keycode);

var _withStyles = __webpack_require__("./node_modules/material-ui/styles/withStyles.js");

var _withStyles2 = _interopRequireDefault(_withStyles);

var _keyboardFocus = __webpack_require__("./node_modules/material-ui/utils/keyboardFocus.js");

var _TouchRipple = __webpack_require__("./node_modules/material-ui/ButtonBase/TouchRipple.js");

var _TouchRipple2 = _interopRequireDefault(_TouchRipple);

var _createRippleHandler = __webpack_require__("./node_modules/material-ui/ButtonBase/createRippleHandler.js");

var _createRippleHandler2 = _interopRequireDefault(_createRippleHandler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var babelPluginFlowReactPropTypes_proptype_Element = __webpack_require__("./node_modules/react/react.js").babelPluginFlowReactPropTypes_proptype_Element || __webpack_require__("./node_modules/prop-types/index.js").any;

var styles = exports.styles = function styles(theme) {
  return {
    root: {
      position: 'relative',
      // Remove grey highlight
      WebkitTapHighlightColor: theme.palette.common.transparent,
      outline: 'none',
      border: 0,
      cursor: 'pointer',
      userSelect: 'none',
      appearance: 'none',
      textDecoration: 'none',
      // So we take precedent over the style of a native <a /> element.
      color: 'inherit'
    },
    disabled: {
      pointerEvents: 'none', // Disable link interactions
      cursor: 'default'
    }
  };
};

var babelPluginFlowReactPropTypes_proptype_Props = {
  centerRipple: __webpack_require__("./node_modules/prop-types/index.js").bool,
  children: typeof babelPluginFlowReactPropTypes_proptype_Element === 'function' ? babelPluginFlowReactPropTypes_proptype_Element : __webpack_require__("./node_modules/prop-types/index.js").shape(babelPluginFlowReactPropTypes_proptype_Element),
  classes: __webpack_require__("./node_modules/prop-types/index.js").object,
  className: __webpack_require__("./node_modules/prop-types/index.js").string,
  component: __webpack_require__("./node_modules/prop-types/index.js").oneOfType([__webpack_require__("./node_modules/prop-types/index.js").string, __webpack_require__("./node_modules/prop-types/index.js").func]),
  disabled: __webpack_require__("./node_modules/prop-types/index.js").bool,
  disableRipple: __webpack_require__("./node_modules/prop-types/index.js").bool,
  focusRipple: __webpack_require__("./node_modules/prop-types/index.js").bool,
  keyboardFocusedClassName: __webpack_require__("./node_modules/prop-types/index.js").string,
  onBlur: __webpack_require__("./node_modules/prop-types/index.js").func,
  onClick: __webpack_require__("./node_modules/prop-types/index.js").func,
  onFocus: __webpack_require__("./node_modules/prop-types/index.js").func,
  onKeyboardFocus: __webpack_require__("./node_modules/prop-types/index.js").func,
  onKeyDown: __webpack_require__("./node_modules/prop-types/index.js").func,
  onKeyUp: __webpack_require__("./node_modules/prop-types/index.js").func,
  onMouseDown: __webpack_require__("./node_modules/prop-types/index.js").func,
  onMouseLeave: __webpack_require__("./node_modules/prop-types/index.js").func,
  onMouseUp: __webpack_require__("./node_modules/prop-types/index.js").func,
  onTouchEnd: __webpack_require__("./node_modules/prop-types/index.js").func,
  onTouchStart: __webpack_require__("./node_modules/prop-types/index.js").func,
  role: __webpack_require__("./node_modules/prop-types/index.js").string,
  tabIndex: __webpack_require__("./node_modules/prop-types/index.js").string,
  type: __webpack_require__("./node_modules/prop-types/index.js").string.isRequired
};

var ButtonBase = function (_Component) {
  (0, _inherits3.default)(ButtonBase, _Component);

  function ButtonBase() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, ButtonBase);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = ButtonBase.__proto__ || (0, _getPrototypeOf2.default)(ButtonBase)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      keyboardFocused: false
    }, _this.ripple = null, _this.keyDown = false, _this.button = null, _this.keyboardFocusTimeout = null, _this.keyboardFocusCheckTime = 40, _this.keyboardFocusMaxCheckTimes = 5, _this.focus = function () {
      _this.button.focus();
    }, _this.handleKeyDown = function (event) {
      var _this$props = _this.props,
          component = _this$props.component,
          focusRipple = _this$props.focusRipple,
          onKeyDown = _this$props.onKeyDown,
          onClick = _this$props.onClick;

      var key = (0, _keycode2.default)(event);

      // Check if key is already down to avoid repeats being counted as multiple activations
      if (focusRipple && !_this.keyDown && _this.state.keyboardFocused && key === 'space') {
        _this.keyDown = true;
        event.persist();
        _this.ripple.stop(event, function () {
          _this.ripple.start(event);
        });
      }

      if (onKeyDown) {
        onKeyDown(event);
      }

      // Keyboard accessibility for non interactive elements
      if (event.target === _this.button && onClick && component && component !== 'a' && component !== 'button' && (key === 'space' || key === 'enter')) {
        event.preventDefault();
        onClick(event);
      }
    }, _this.handleKeyUp = function (event) {
      if (_this.props.focusRipple && (0, _keycode2.default)(event) === 'space' && _this.state.keyboardFocused) {
        _this.keyDown = false;
        event.persist();
        _this.ripple.stop(event, function () {
          return _this.ripple.pulsate(event);
        });
      }
      if (_this.props.onKeyUp) {
        _this.props.onKeyUp(event);
      }
    }, _this.handleMouseDown = (0, _createRippleHandler2.default)(_this, 'MouseDown', 'start', function () {
      clearTimeout(_this.keyboardFocusTimeout);
      (0, _keyboardFocus.focusKeyPressed)(false);
      if (_this.state.keyboardFocused) {
        _this.setState({ keyboardFocused: false });
      }
    }), _this.handleMouseUp = (0, _createRippleHandler2.default)(_this, 'MouseUp', 'stop'), _this.handleMouseLeave = (0, _createRippleHandler2.default)(_this, 'MouseLeave', 'stop', function (event) {
      if (_this.state.keyboardFocused) {
        event.preventDefault();
      }
    }), _this.handleTouchStart = (0, _createRippleHandler2.default)(_this, 'TouchStart', 'start'), _this.handleTouchEnd = (0, _createRippleHandler2.default)(_this, 'TouchEnd', 'stop'), _this.handleBlur = (0, _createRippleHandler2.default)(_this, 'Blur', 'stop', function () {
      _this.setState({ keyboardFocused: false });
    }), _this.handleFocus = function (event) {
      if (_this.props.disabled) {
        return;
      }

      if (_this.button) {
        event.persist();

        var keyboardFocusCallback = _this.onKeyboardFocusHandler.bind(_this, event);
        (0, _keyboardFocus.detectKeyboardFocus)(_this, (0, _reactDom.findDOMNode)(_this.button), keyboardFocusCallback);
      }

      if (_this.props.onFocus) {
        _this.props.onFocus(event);
      }
    }, _this.onKeyboardFocusHandler = function (event) {
      _this.keyDown = false;
      _this.setState({ keyboardFocused: true });

      if (_this.props.onKeyboardFocus) {
        _this.props.onKeyboardFocus(event);
      }
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(ButtonBase, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      (0, _keyboardFocus.listenForFocusKeys)();

       true ? (0, _warning2.default)(this.button, 'Material-UI: please provide a class to the component property.\n      The keyboard focus logic needs a reference to work correctly.') : void 0;
    }
  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps, nextState) {
      if (this.props.focusRipple && nextState.keyboardFocused && !this.state.keyboardFocused && !this.props.disableRipple) {
        this.ripple.pulsate();
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      clearTimeout(this.keyboardFocusTimeout);
    } // Used to help track keyboard activation keyDown

  }, {
    key: 'renderRipple',
    value: function renderRipple() {
      var _this2 = this;

      if (!this.props.disableRipple && !this.props.disabled) {
        return _react2.default.createElement(_TouchRipple2.default, {
          innerRef: function innerRef(node) {
            _this2.ripple = node;
          },
          center: this.props.centerRipple
        });
      }

      return null;
    }
  }, {
    key: 'render',
    value: function render() {
      var _classNames,
          _this3 = this;

      var _props = this.props,
          centerRipple = _props.centerRipple,
          children = _props.children,
          classes = _props.classes,
          classNameProp = _props.className,
          component = _props.component,
          disabled = _props.disabled,
          disableRipple = _props.disableRipple,
          focusRipple = _props.focusRipple,
          keyboardFocusedClassName = _props.keyboardFocusedClassName,
          onBlur = _props.onBlur,
          onFocus = _props.onFocus,
          onKeyboardFocus = _props.onKeyboardFocus,
          onKeyDown = _props.onKeyDown,
          onKeyUp = _props.onKeyUp,
          onMouseDown = _props.onMouseDown,
          onMouseLeave = _props.onMouseLeave,
          onMouseUp = _props.onMouseUp,
          onTouchEnd = _props.onTouchEnd,
          onTouchStart = _props.onTouchStart,
          tabIndex = _props.tabIndex,
          type = _props.type,
          other = (0, _objectWithoutProperties3.default)(_props, ['centerRipple', 'children', 'classes', 'className', 'component', 'disabled', 'disableRipple', 'focusRipple', 'keyboardFocusedClassName', 'onBlur', 'onFocus', 'onKeyboardFocus', 'onKeyDown', 'onKeyUp', 'onMouseDown', 'onMouseLeave', 'onMouseUp', 'onTouchEnd', 'onTouchStart', 'tabIndex', 'type']);


      var className = (0, _classnames2.default)(classes.root, (_classNames = {}, (0, _defineProperty3.default)(_classNames, classes.disabled, disabled), (0, _defineProperty3.default)(_classNames, keyboardFocusedClassName, keyboardFocusedClassName && this.state.keyboardFocused), _classNames), classNameProp);

      var buttonProps = {};

      var ComponentProp = component;

      if (!ComponentProp) {
        if (other.href) {
          ComponentProp = 'a';
        } else {
          ComponentProp = 'button';
        }
      }

      if (ComponentProp === 'button') {
        buttonProps.type = type || 'button';
      }

      if (ComponentProp !== 'a') {
        buttonProps.role = buttonProps.role || 'button';
        buttonProps.disabled = disabled;
      }

      return _react2.default.createElement(
        ComponentProp,
        (0, _extends3.default)({
          ref: function ref(node) {
            _this3.button = node;
          },
          onBlur: this.handleBlur,
          onFocus: this.handleFocus,
          onKeyDown: this.handleKeyDown,
          onKeyUp: this.handleKeyUp,
          onMouseDown: this.handleMouseDown,
          onMouseLeave: this.handleMouseLeave,
          onMouseUp: this.handleMouseUp,
          onTouchEnd: this.handleTouchEnd,
          onTouchStart: this.handleTouchStart,
          tabIndex: disabled ? '-1' : tabIndex,
          className: className
        }, buttonProps, other),
        children,
        this.renderRipple()
      );
    }
  }]);
  return ButtonBase;
}(_react.Component);

ButtonBase.defaultProps = {
  centerRipple: false,
  classes: {},
  focusRipple: false,
  disableRipple: false,
  tabIndex: '0',
  type: 'button'
};
ButtonBase.propTypes =  true ? (_ref2 = {
  centerRipple: __webpack_require__("./node_modules/prop-types/index.js").bool.isRequired,
  classes: __webpack_require__("./node_modules/prop-types/index.js").object.isRequired,
  focusRipple: __webpack_require__("./node_modules/prop-types/index.js").bool.isRequired,
  disableRipple: __webpack_require__("./node_modules/prop-types/index.js").bool.isRequired,
  tabIndex: __webpack_require__("./node_modules/prop-types/index.js").string.isRequired,
  type: __webpack_require__("./node_modules/prop-types/index.js").string.isRequired
}, (0, _defineProperty3.default)(_ref2, 'centerRipple', __webpack_require__("./node_modules/prop-types/index.js").bool), (0, _defineProperty3.default)(_ref2, 'children', typeof babelPluginFlowReactPropTypes_proptype_Element === 'function' ? babelPluginFlowReactPropTypes_proptype_Element : __webpack_require__("./node_modules/prop-types/index.js").shape(babelPluginFlowReactPropTypes_proptype_Element)), (0, _defineProperty3.default)(_ref2, 'classes', __webpack_require__("./node_modules/prop-types/index.js").object), (0, _defineProperty3.default)(_ref2, 'className', __webpack_require__("./node_modules/prop-types/index.js").string), (0, _defineProperty3.default)(_ref2, 'component', __webpack_require__("./node_modules/prop-types/index.js").oneOfType([__webpack_require__("./node_modules/prop-types/index.js").string, __webpack_require__("./node_modules/prop-types/index.js").func])), (0, _defineProperty3.default)(_ref2, 'disabled', __webpack_require__("./node_modules/prop-types/index.js").bool), (0, _defineProperty3.default)(_ref2, 'disableRipple', __webpack_require__("./node_modules/prop-types/index.js").bool), (0, _defineProperty3.default)(_ref2, 'focusRipple', __webpack_require__("./node_modules/prop-types/index.js").bool), (0, _defineProperty3.default)(_ref2, 'keyboardFocusedClassName', __webpack_require__("./node_modules/prop-types/index.js").string), (0, _defineProperty3.default)(_ref2, 'onBlur', __webpack_require__("./node_modules/prop-types/index.js").func), (0, _defineProperty3.default)(_ref2, 'onClick', __webpack_require__("./node_modules/prop-types/index.js").func), (0, _defineProperty3.default)(_ref2, 'onFocus', __webpack_require__("./node_modules/prop-types/index.js").func), (0, _defineProperty3.default)(_ref2, 'onKeyboardFocus', __webpack_require__("./node_modules/prop-types/index.js").func), (0, _defineProperty3.default)(_ref2, 'onKeyDown', __webpack_require__("./node_modules/prop-types/index.js").func), (0, _defineProperty3.default)(_ref2, 'onKeyUp', __webpack_require__("./node_modules/prop-types/index.js").func), (0, _defineProperty3.default)(_ref2, 'onMouseDown', __webpack_require__("./node_modules/prop-types/index.js").func), (0, _defineProperty3.default)(_ref2, 'onMouseLeave', __webpack_require__("./node_modules/prop-types/index.js").func), (0, _defineProperty3.default)(_ref2, 'onMouseUp', __webpack_require__("./node_modules/prop-types/index.js").func), (0, _defineProperty3.default)(_ref2, 'onTouchEnd', __webpack_require__("./node_modules/prop-types/index.js").func), (0, _defineProperty3.default)(_ref2, 'onTouchStart', __webpack_require__("./node_modules/prop-types/index.js").func), (0, _defineProperty3.default)(_ref2, 'role', __webpack_require__("./node_modules/prop-types/index.js").string), (0, _defineProperty3.default)(_ref2, 'tabIndex', __webpack_require__("./node_modules/prop-types/index.js").string), (0, _defineProperty3.default)(_ref2, 'type', __webpack_require__("./node_modules/prop-types/index.js").string.isRequired), _ref2) : {};
ButtonBase.propTypes =  true ? (_ref3 = {
  centerRipple: __webpack_require__("./node_modules/prop-types/index.js").bool.isRequired,
  classes: __webpack_require__("./node_modules/prop-types/index.js").object.isRequired,
  focusRipple: __webpack_require__("./node_modules/prop-types/index.js").bool.isRequired,
  disableRipple: __webpack_require__("./node_modules/prop-types/index.js").bool.isRequired,
  tabIndex: __webpack_require__("./node_modules/prop-types/index.js").string.isRequired,
  type: __webpack_require__("./node_modules/prop-types/index.js").string.isRequired
}, (0, _defineProperty3.default)(_ref3, 'centerRipple', __webpack_require__("./node_modules/prop-types/index.js").bool), (0, _defineProperty3.default)(_ref3, 'children', typeof babelPluginFlowReactPropTypes_proptype_Element === 'function' ? babelPluginFlowReactPropTypes_proptype_Element : __webpack_require__("./node_modules/prop-types/index.js").shape(babelPluginFlowReactPropTypes_proptype_Element)), (0, _defineProperty3.default)(_ref3, 'classes', __webpack_require__("./node_modules/prop-types/index.js").object), (0, _defineProperty3.default)(_ref3, 'className', __webpack_require__("./node_modules/prop-types/index.js").string), (0, _defineProperty3.default)(_ref3, 'component', __webpack_require__("./node_modules/prop-types/index.js").oneOfType([__webpack_require__("./node_modules/prop-types/index.js").string, __webpack_require__("./node_modules/prop-types/index.js").func])), (0, _defineProperty3.default)(_ref3, 'disabled', __webpack_require__("./node_modules/prop-types/index.js").bool), (0, _defineProperty3.default)(_ref3, 'disableRipple', __webpack_require__("./node_modules/prop-types/index.js").bool), (0, _defineProperty3.default)(_ref3, 'focusRipple', __webpack_require__("./node_modules/prop-types/index.js").bool), (0, _defineProperty3.default)(_ref3, 'keyboardFocusedClassName', __webpack_require__("./node_modules/prop-types/index.js").string), (0, _defineProperty3.default)(_ref3, 'onBlur', __webpack_require__("./node_modules/prop-types/index.js").func), (0, _defineProperty3.default)(_ref3, 'onClick', __webpack_require__("./node_modules/prop-types/index.js").func), (0, _defineProperty3.default)(_ref3, 'onFocus', __webpack_require__("./node_modules/prop-types/index.js").func), (0, _defineProperty3.default)(_ref3, 'onKeyboardFocus', __webpack_require__("./node_modules/prop-types/index.js").func), (0, _defineProperty3.default)(_ref3, 'onKeyDown', __webpack_require__("./node_modules/prop-types/index.js").func), (0, _defineProperty3.default)(_ref3, 'onKeyUp', __webpack_require__("./node_modules/prop-types/index.js").func), (0, _defineProperty3.default)(_ref3, 'onMouseDown', __webpack_require__("./node_modules/prop-types/index.js").func), (0, _defineProperty3.default)(_ref3, 'onMouseLeave', __webpack_require__("./node_modules/prop-types/index.js").func), (0, _defineProperty3.default)(_ref3, 'onMouseUp', __webpack_require__("./node_modules/prop-types/index.js").func), (0, _defineProperty3.default)(_ref3, 'onTouchEnd', __webpack_require__("./node_modules/prop-types/index.js").func), (0, _defineProperty3.default)(_ref3, 'onTouchStart', __webpack_require__("./node_modules/prop-types/index.js").func), (0, _defineProperty3.default)(_ref3, 'role', __webpack_require__("./node_modules/prop-types/index.js").string), (0, _defineProperty3.default)(_ref3, 'tabIndex', __webpack_require__("./node_modules/prop-types/index.js").string), (0, _defineProperty3.default)(_ref3, 'type', __webpack_require__("./node_modules/prop-types/index.js").string.isRequired), _ref3) : {};
exports.default = (0, _withStyles2.default)(styles, { name: 'MuiButtonBase' })(ButtonBase);

/***/ }),

/***/ "./node_modules/material-ui/ButtonBase/Ripple.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = __webpack_require__("./node_modules/babel-runtime/helpers/extends.js");

var _extends3 = _interopRequireDefault(_extends2);

var _defineProperty2 = __webpack_require__("./node_modules/babel-runtime/helpers/defineProperty.js");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _objectWithoutProperties2 = __webpack_require__("./node_modules/babel-runtime/helpers/objectWithoutProperties.js");

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _getPrototypeOf = __webpack_require__("./node_modules/babel-runtime/core-js/object/get-prototype-of.js");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__("./node_modules/babel-runtime/helpers/classCallCheck.js");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__("./node_modules/babel-runtime/helpers/createClass.js");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__("./node_modules/babel-runtime/helpers/possibleConstructorReturn.js");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__("./node_modules/babel-runtime/helpers/inherits.js");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__("./node_modules/react/react.js");

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__("./node_modules/prop-types/index.js");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = __webpack_require__("./node_modules/classnames/index.js");

var _classnames2 = _interopRequireDefault(_classnames);

var _Transition = __webpack_require__("./node_modules/react-transition-group/Transition.js");

var _Transition2 = _interopRequireDefault(_Transition);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @ignore - internal component.
 */
//  weak

var Ripple = function (_Component) {
  (0, _inherits3.default)(Ripple, _Component);

  function Ripple() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, Ripple);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Ripple.__proto__ || (0, _getPrototypeOf2.default)(Ripple)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      rippleVisible: false
    }, _this.handleEnter = function () {
      _this.setState({
        rippleVisible: true
      });
    }, _this.handleExit = function () {
      _this.setState({
        rippleLeaving: true
      });
    }, _this.getRippleStyles = function (props) {
      var rippleSize = props.rippleSize,
          rippleX = props.rippleX,
          rippleY = props.rippleY;


      return {
        width: rippleSize,
        height: rippleSize,
        top: -(rippleSize / 2) + rippleY,
        left: -(rippleSize / 2) + rippleX
      };
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(Ripple, [{
    key: 'render',
    value: function render() {
      var _classNames, _classNames2;

      var _props = this.props,
          classes = _props.classes,
          classNameProp = _props.className,
          pulsate = _props.pulsate,
          rippleX = _props.rippleX,
          rippleY = _props.rippleY,
          rippleSize = _props.rippleSize,
          other = (0, _objectWithoutProperties3.default)(_props, ['classes', 'className', 'pulsate', 'rippleX', 'rippleY', 'rippleSize']);
      var _state = this.state,
          rippleVisible = _state.rippleVisible,
          rippleLeaving = _state.rippleLeaving;


      var className = (0, _classnames2.default)(classes.wrapper, (_classNames = {}, (0, _defineProperty3.default)(_classNames, classes.wrapperLeaving, rippleLeaving), (0, _defineProperty3.default)(_classNames, classes.wrapperPulsating, pulsate), _classNames), classNameProp);

      var rippleClassName = (0, _classnames2.default)(classes.ripple, (_classNames2 = {}, (0, _defineProperty3.default)(_classNames2, classes.rippleVisible, rippleVisible), (0, _defineProperty3.default)(_classNames2, classes.rippleFast, pulsate), _classNames2));

      return _react2.default.createElement(
        _Transition2.default,
        (0, _extends3.default)({ onEnter: this.handleEnter, onExit: this.handleExit }, other),
        _react2.default.createElement(
          'span',
          { className: className },
          _react2.default.createElement('span', { className: rippleClassName, style: this.getRippleStyles(this.props) })
        )
      );
    }
  }]);
  return Ripple;
}(_react.Component);

Ripple.defaultProps = {
  pulsate: false
};


Ripple.propTypes =  true ? {
  /**
   * Useful to extend the style applied to components.
   */
  classes: _propTypes2.default.object.isRequired,
  /**
   * @ignore
   */
  className: _propTypes2.default.string,
  /**
   * If `true`, the ripple pulsates, typically indicating the keyboard focus state of an element.
   */
  pulsate: _propTypes2.default.bool,
  /**
   * Diameter of the ripple.
   */
  rippleSize: _propTypes2.default.number.isRequired,
  /**
   * Horizontal position of the ripple center.
   */
  rippleX: _propTypes2.default.number.isRequired,
  /**
   * Vertical position of the ripple center.
   */
  rippleY: _propTypes2.default.number.isRequired
} : {};

exports.default = Ripple;

/***/ }),

/***/ "./node_modules/material-ui/ButtonBase/TouchRipple.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.styles = undefined;

var _extends2 = __webpack_require__("./node_modules/babel-runtime/helpers/extends.js");

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = __webpack_require__("./node_modules/babel-runtime/helpers/objectWithoutProperties.js");

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _toConsumableArray2 = __webpack_require__("./node_modules/babel-runtime/helpers/toConsumableArray.js");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _getPrototypeOf = __webpack_require__("./node_modules/babel-runtime/core-js/object/get-prototype-of.js");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__("./node_modules/babel-runtime/helpers/classCallCheck.js");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__("./node_modules/babel-runtime/helpers/createClass.js");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__("./node_modules/babel-runtime/helpers/possibleConstructorReturn.js");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__("./node_modules/babel-runtime/helpers/inherits.js");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__("./node_modules/react/react.js");

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__("./node_modules/prop-types/index.js");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = __webpack_require__("./node_modules/react-dom/index.js");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _TransitionGroup = __webpack_require__("./node_modules/react-transition-group/TransitionGroup.js");

var _TransitionGroup2 = _interopRequireDefault(_TransitionGroup);

var _classnames = __webpack_require__("./node_modules/classnames/index.js");

var _classnames2 = _interopRequireDefault(_classnames);

var _withStyles = __webpack_require__("./node_modules/material-ui/styles/withStyles.js");

var _withStyles2 = _interopRequireDefault(_withStyles);

var _Ripple = __webpack_require__("./node_modules/material-ui/ButtonBase/Ripple.js");

var _Ripple2 = _interopRequireDefault(_Ripple);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DURATION = 550; //  weak

var styles = exports.styles = function styles(theme) {
  return {
    root: {
      display: 'block',
      position: 'absolute',
      overflow: 'hidden',
      borderRadius: 'inherit',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      pointerEvents: 'none',
      zIndex: 0
    },
    wrapper: {
      opacity: 1
    },
    wrapperLeaving: {
      opacity: 0,
      animation: 'mui-ripple-exit ' + DURATION + 'ms ' + theme.transitions.easing.easeInOut
    },
    wrapperPulsating: {
      position: 'absolute',
      left: 0,
      top: 0,
      display: 'block',
      width: '100%',
      height: '100%',
      animation: 'mui-ripple-pulsate 1500ms ' + theme.transitions.easing.easeInOut + ' 200ms infinite',
      rippleVisible: {
        opacity: 0.2
      }
    },
    '@keyframes mui-ripple-enter': {
      '0%': {
        transform: 'scale(0)'
      },
      '100%': {
        transform: 'scale(1)'
      }
    },
    '@keyframes mui-ripple-exit': {
      '0%': {
        opacity: 1
      },
      '100%': {
        opacity: 0
      }
    },
    '@keyframes mui-ripple-pulsate': {
      '0%': {
        transform: 'scale(1)'
      },
      '50%': {
        transform: 'scale(0.9)'
      },
      '100%': {
        transform: 'scale(1)'
      }
    },
    ripple: {
      width: 50,
      height: 50,
      left: 0,
      top: 0,
      opacity: 0,
      position: 'absolute',
      borderRadius: '50%',
      background: 'currentColor'
    },
    rippleVisible: {
      opacity: 0.3,
      transform: 'scale(1)',
      animation: 'mui-ripple-enter ' + DURATION + 'ms ' + theme.transitions.easing.easeInOut
    },
    rippleFast: {
      animationDuration: '200ms'
    }
  };
};

/**
 * @ignore - internal component.
 */

var TouchRipple = function (_Component) {
  (0, _inherits3.default)(TouchRipple, _Component);

  function TouchRipple() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, TouchRipple);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = TouchRipple.__proto__ || (0, _getPrototypeOf2.default)(TouchRipple)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      nextKey: 0,
      ripples: []
    }, _this.ignoringMouseDown = false, _this.pulsate = function () {
      _this.start({}, { pulsate: true });
    }, _this.start = function () {
      var event = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var cb = arguments[2];
      var _options$pulsate = options.pulsate,
          pulsate = _options$pulsate === undefined ? false : _options$pulsate,
          _options$center = options.center,
          center = _options$center === undefined ? _this.props.center || options.pulsate : _options$center;


      if (event.type === 'mousedown' && _this.ignoringMouseDown) {
        _this.ignoringMouseDown = false;
        return;
      }

      if (event.type === 'touchstart') {
        _this.ignoringMouseDown = true;
      }

      var ripples = _this.state.ripples;

      var element = _reactDom2.default.findDOMNode(_this);
      var rect = element ? // $FlowFixMe
      element.getBoundingClientRect() : {
        width: 0,
        height: 0,
        left: 0,
        top: 0
      };

      // Get the size of the ripple
      var rippleX = void 0;
      var rippleY = void 0;
      var rippleSize = void 0;

      if (center || event.clientX === 0 && event.clientY === 0 || !event.clientX && !event.touches) {
        rippleX = Math.round(rect.width / 2);
        rippleY = Math.round(rect.height / 2);
      } else {
        var clientX = event.clientX ? event.clientX : event.touches[0].clientX;
        var clientY = event.clientY ? event.clientY : event.touches[0].clientY;
        rippleX = Math.round(clientX - rect.left);
        rippleY = Math.round(clientY - rect.top);
      }

      if (center) {
        rippleSize = Math.sqrt((2 * Math.pow(rect.width, 2) + Math.pow(rect.height, 2)) / 3);

        // For some reason the animation is broken on Mobile Chrome if the size if even.
        if (rippleSize % 2 === 0) {
          rippleSize += 1;
        }
      } else {
        var sizeX = Math.max(
        // $FlowFixMe
        Math.abs((element ? element.clientWidth : 0) - rippleX), rippleX) * 2 + 2;
        var sizeY = Math.max(
        // $FlowFixMe
        Math.abs((element ? element.clientHeight : 0) - rippleY), rippleY) * 2 + 2;
        rippleSize = Math.sqrt(Math.pow(sizeX, 2) + Math.pow(sizeY, 2));
      }

      // Add a ripple to the ripples array
      ripples = [].concat((0, _toConsumableArray3.default)(ripples), [_react2.default.createElement(_Ripple2.default, {
        key: _this.state.nextKey,
        classes: _this.props.classes,
        timeout: {
          exit: DURATION,
          enter: DURATION
        },
        pulsate: pulsate,
        rippleX: rippleX,
        rippleY: rippleY,
        rippleSize: rippleSize
      })]);

      _this.setState({
        nextKey: _this.state.nextKey + 1,
        ripples: ripples
      }, cb);
    }, _this.stop = function (event, cb) {
      var ripples = _this.state.ripples;

      if (ripples && ripples.length) {
        _this.setState({
          ripples: ripples.slice(1)
        }, cb);
      }
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  // Used to filter out mouse emulated events on mobile.


  (0, _createClass3.default)(TouchRipple, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          center = _props.center,
          classes = _props.classes,
          className = _props.className,
          other = (0, _objectWithoutProperties3.default)(_props, ['center', 'classes', 'className']);


      return _react2.default.createElement(
        _TransitionGroup2.default,
        (0, _extends3.default)({
          component: 'span',
          enter: true,
          exit: true,
          className: (0, _classnames2.default)(classes.root, className)
        }, other),
        this.state.ripples
      );
    }
  }]);
  return TouchRipple;
}(_react.Component);

TouchRipple.defaultProps = {
  center: false
};


TouchRipple.propTypes =  true ? {
  /**
   * If `true`, the ripple starts at the center of the component
   * rather than at the point of interaction.
   */
  center: _propTypes2.default.bool,
  /**
   * Useful to extend the style applied to components.
   */
  classes: _propTypes2.default.object.isRequired,
  /**
   * @ignore
   */
  className: _propTypes2.default.string
} : {};

exports.default = (0, _withStyles2.default)(styles, { name: 'MuiTouchRipple' })(TouchRipple);

/***/ }),

/***/ "./node_modules/material-ui/ButtonBase/createRippleHandler.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
function createRippleHandler(instance, eventName, action, cb) {
  return function handleEvent(event) {
    if (cb) {
      cb.call(instance, event);
    }

    if (event.defaultPrevented) {
      return false;
    }

    if (instance.ripple) {
      instance.ripple[action](event);
    }

    if (instance.props && typeof instance.props['on' + eventName] === 'function') {
      instance.props['on' + eventName](event);
    }

    return true;
  };
}

exports.default = createRippleHandler;

/***/ }),

/***/ "./node_modules/material-ui/ButtonBase/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ButtonBase = __webpack_require__("./node_modules/material-ui/ButtonBase/ButtonBase.js");

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_ButtonBase).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),

/***/ "./node_modules/material-ui/Form/FormControl.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.styles = undefined;

var _extends2 = __webpack_require__("./node_modules/babel-runtime/helpers/extends.js");

var _extends3 = _interopRequireDefault(_extends2);

var _defineProperty2 = __webpack_require__("./node_modules/babel-runtime/helpers/defineProperty.js");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _objectWithoutProperties2 = __webpack_require__("./node_modules/babel-runtime/helpers/objectWithoutProperties.js");

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _getPrototypeOf = __webpack_require__("./node_modules/babel-runtime/core-js/object/get-prototype-of.js");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__("./node_modules/babel-runtime/helpers/classCallCheck.js");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__("./node_modules/babel-runtime/helpers/createClass.js");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__("./node_modules/babel-runtime/helpers/possibleConstructorReturn.js");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__("./node_modules/babel-runtime/helpers/inherits.js");

var _inherits3 = _interopRequireDefault(_inherits2);

var _ref2, _ref3;

var _react = __webpack_require__("./node_modules/react/react.js");

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__("./node_modules/prop-types/index.js");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = __webpack_require__("./node_modules/classnames/index.js");

var _classnames2 = _interopRequireDefault(_classnames);

var _withStyles = __webpack_require__("./node_modules/material-ui/styles/withStyles.js");

var _withStyles2 = _interopRequireDefault(_withStyles);

var _Input = __webpack_require__("./node_modules/material-ui/Input/Input.js");

var _reactHelpers = __webpack_require__("./node_modules/material-ui/utils/reactHelpers.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var babelPluginFlowReactPropTypes_proptype_Element = __webpack_require__("./node_modules/react/react.js").babelPluginFlowReactPropTypes_proptype_Element || __webpack_require__("./node_modules/prop-types/index.js").any;

var styles = exports.styles = function styles(theme) {
  return {
    root: {
      display: 'inline-flex',
      flexDirection: 'column',
      position: 'relative',
      // Reset fieldset default style
      minWidth: 0,
      padding: 0,
      margin: 0,
      border: 0
    },
    marginNormal: {
      marginTop: theme.spacing.unit * 2,
      marginBottom: theme.spacing.unit
    },
    marginDense: {
      marginTop: theme.spacing.unit,
      marginBottom: theme.spacing.unit / 2
    },
    fullWidth: {
      width: '100%'
    }
  };
};

var babelPluginFlowReactPropTypes_proptype_Props = {
  children: typeof babelPluginFlowReactPropTypes_proptype_Element === 'function' ? babelPluginFlowReactPropTypes_proptype_Element : __webpack_require__("./node_modules/prop-types/index.js").shape(babelPluginFlowReactPropTypes_proptype_Element),
  classes: __webpack_require__("./node_modules/prop-types/index.js").object,
  className: __webpack_require__("./node_modules/prop-types/index.js").string,
  component: __webpack_require__("./node_modules/prop-types/index.js").oneOfType([__webpack_require__("./node_modules/prop-types/index.js").string, __webpack_require__("./node_modules/prop-types/index.js").func]),
  disabled: __webpack_require__("./node_modules/prop-types/index.js").bool,
  error: __webpack_require__("./node_modules/prop-types/index.js").bool,
  fullWidth: __webpack_require__("./node_modules/prop-types/index.js").bool,
  onBlur: __webpack_require__("./node_modules/prop-types/index.js").func,
  onFocus: __webpack_require__("./node_modules/prop-types/index.js").func,
  required: __webpack_require__("./node_modules/prop-types/index.js").bool,
  margin: __webpack_require__("./node_modules/prop-types/index.js").oneOf(['none', 'dense', 'normal'])
};

/**
 * Provides context such as dirty/focused/error/required for form inputs.
 */
var FormControl = function (_Component) {
  (0, _inherits3.default)(FormControl, _Component);

  function FormControl() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, FormControl);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = FormControl.__proto__ || (0, _getPrototypeOf2.default)(FormControl)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      dirty: false,
      focused: false
    }, _this.handleFocus = function (event) {
      if (_this.props.onFocus) {
        _this.props.onFocus(event);
      }
      if (!_this.state.focused) {
        _this.setState({ focused: true });
      }
    }, _this.handleBlur = function (event) {
      if (_this.props.onBlur) {
        _this.props.onBlur(event);
      }
      if (_this.state.focused) {
        _this.setState({ focused: false });
      }
    }, _this.handleDirty = function () {
      if (!_this.state.dirty) {
        _this.setState({ dirty: true });
      }
    }, _this.handleClean = function () {
      if (_this.state.dirty) {
        _this.setState({ dirty: false });
      }
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(FormControl, [{
    key: 'getChildContext',
    value: function getChildContext() {
      var _props = this.props,
          disabled = _props.disabled,
          error = _props.error,
          required = _props.required,
          margin = _props.margin;
      var _state = this.state,
          dirty = _state.dirty,
          focused = _state.focused;


      return {
        muiFormControl: {
          dirty: dirty,
          disabled: disabled,
          error: error,
          focused: focused,
          margin: margin,
          required: required,
          onDirty: this.handleDirty,
          onClean: this.handleClean,
          onFocus: this.handleFocus,
          onBlur: this.handleBlur
        }
      };
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _this2 = this;

      // We need to iterate through the children and find the Input in order
      // to fully support server side rendering.
      _react.Children.forEach(this.props.children, function (child) {
        if ((0, _reactHelpers.isMuiComponent)(child, 'Input') && (0, _Input.isDirty)(child.props, true)) {
          _this2.setState({ dirty: true });
        }
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _classNames;

      var _props2 = this.props,
          children = _props2.children,
          classes = _props2.classes,
          className = _props2.className,
          ComponentProp = _props2.component,
          disabled = _props2.disabled,
          error = _props2.error,
          fullWidth = _props2.fullWidth,
          margin = _props2.margin,
          other = (0, _objectWithoutProperties3.default)(_props2, ['children', 'classes', 'className', 'component', 'disabled', 'error', 'fullWidth', 'margin']);


      return _react2.default.createElement(
        ComponentProp,
        (0, _extends3.default)({
          className: (0, _classnames2.default)(classes.root, (_classNames = {}, (0, _defineProperty3.default)(_classNames, classes.marginNormal, margin === 'normal'), (0, _defineProperty3.default)(_classNames, classes.marginDense, margin === 'dense'), (0, _defineProperty3.default)(_classNames, classes.fullWidth, fullWidth), _classNames), className)
        }, other, {
          onFocus: this.handleFocus,
          onBlur: this.handleBlur
        }),
        children
      );
    }
  }]);
  return FormControl;
}(_react.Component);

FormControl.defaultProps = {
  classes: {},
  component: 'div',
  disabled: false,
  error: false,
  fullWidth: false,
  margin: 'none',
  required: false
};
FormControl.childContextTypes = {
  muiFormControl: _propTypes2.default.object.isRequired
};
FormControl.propTypes =  true ? (_ref2 = {
  disabled: __webpack_require__("./node_modules/prop-types/index.js").bool.isRequired,
  classes: __webpack_require__("./node_modules/prop-types/index.js").object.isRequired,
  component: __webpack_require__("./node_modules/prop-types/index.js").string.isRequired,
  error: __webpack_require__("./node_modules/prop-types/index.js").bool.isRequired,
  fullWidth: __webpack_require__("./node_modules/prop-types/index.js").bool.isRequired,
  margin: __webpack_require__("./node_modules/prop-types/index.js").oneOf(['none']).isRequired,
  required: __webpack_require__("./node_modules/prop-types/index.js").bool.isRequired,
  children: typeof babelPluginFlowReactPropTypes_proptype_Element === 'function' ? babelPluginFlowReactPropTypes_proptype_Element : __webpack_require__("./node_modules/prop-types/index.js").shape(babelPluginFlowReactPropTypes_proptype_Element)
}, (0, _defineProperty3.default)(_ref2, 'classes', __webpack_require__("./node_modules/prop-types/index.js").object), (0, _defineProperty3.default)(_ref2, 'className', __webpack_require__("./node_modules/prop-types/index.js").string), (0, _defineProperty3.default)(_ref2, 'component', __webpack_require__("./node_modules/prop-types/index.js").oneOfType([__webpack_require__("./node_modules/prop-types/index.js").string, __webpack_require__("./node_modules/prop-types/index.js").func])), (0, _defineProperty3.default)(_ref2, 'disabled', __webpack_require__("./node_modules/prop-types/index.js").bool), (0, _defineProperty3.default)(_ref2, 'error', __webpack_require__("./node_modules/prop-types/index.js").bool), (0, _defineProperty3.default)(_ref2, 'fullWidth', __webpack_require__("./node_modules/prop-types/index.js").bool), (0, _defineProperty3.default)(_ref2, 'onBlur', __webpack_require__("./node_modules/prop-types/index.js").func), (0, _defineProperty3.default)(_ref2, 'onFocus', __webpack_require__("./node_modules/prop-types/index.js").func), (0, _defineProperty3.default)(_ref2, 'required', __webpack_require__("./node_modules/prop-types/index.js").bool), (0, _defineProperty3.default)(_ref2, 'margin', __webpack_require__("./node_modules/prop-types/index.js").oneOf(['none', 'dense', 'normal'])), _ref2) : {};
FormControl.propTypes =  true ? (_ref3 = {
  disabled: __webpack_require__("./node_modules/prop-types/index.js").bool.isRequired,
  classes: __webpack_require__("./node_modules/prop-types/index.js").object.isRequired,
  component: __webpack_require__("./node_modules/prop-types/index.js").string.isRequired,
  error: __webpack_require__("./node_modules/prop-types/index.js").bool.isRequired,
  fullWidth: __webpack_require__("./node_modules/prop-types/index.js").bool.isRequired,
  margin: __webpack_require__("./node_modules/prop-types/index.js").oneOf(['none']).isRequired,
  required: __webpack_require__("./node_modules/prop-types/index.js").bool.isRequired,
  children: typeof babelPluginFlowReactPropTypes_proptype_Element === 'function' ? babelPluginFlowReactPropTypes_proptype_Element : __webpack_require__("./node_modules/prop-types/index.js").shape(babelPluginFlowReactPropTypes_proptype_Element)
}, (0, _defineProperty3.default)(_ref3, 'classes', __webpack_require__("./node_modules/prop-types/index.js").object), (0, _defineProperty3.default)(_ref3, 'className', __webpack_require__("./node_modules/prop-types/index.js").string), (0, _defineProperty3.default)(_ref3, 'component', __webpack_require__("./node_modules/prop-types/index.js").oneOfType([__webpack_require__("./node_modules/prop-types/index.js").string, __webpack_require__("./node_modules/prop-types/index.js").func])), (0, _defineProperty3.default)(_ref3, 'disabled', __webpack_require__("./node_modules/prop-types/index.js").bool), (0, _defineProperty3.default)(_ref3, 'error', __webpack_require__("./node_modules/prop-types/index.js").bool), (0, _defineProperty3.default)(_ref3, 'fullWidth', __webpack_require__("./node_modules/prop-types/index.js").bool), (0, _defineProperty3.default)(_ref3, 'onBlur', __webpack_require__("./node_modules/prop-types/index.js").func), (0, _defineProperty3.default)(_ref3, 'onFocus', __webpack_require__("./node_modules/prop-types/index.js").func), (0, _defineProperty3.default)(_ref3, 'required', __webpack_require__("./node_modules/prop-types/index.js").bool), (0, _defineProperty3.default)(_ref3, 'margin', __webpack_require__("./node_modules/prop-types/index.js").oneOf(['none', 'dense', 'normal'])), _ref3) : {};
exports.default = (0, _withStyles2.default)(styles, { name: 'MuiFormControl' })(FormControl);

/***/ }),

/***/ "./node_modules/material-ui/Form/FormControlLabel.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.styles = undefined;

var _extends2 = __webpack_require__("./node_modules/babel-runtime/helpers/extends.js");

var _extends3 = _interopRequireDefault(_extends2);

var _defineProperty2 = __webpack_require__("./node_modules/babel-runtime/helpers/defineProperty.js");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _objectWithoutProperties2 = __webpack_require__("./node_modules/babel-runtime/helpers/objectWithoutProperties.js");

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _ref;
/* eslint-disable jsx-a11y/label-has-for */

var _react = __webpack_require__("./node_modules/react/react.js");

var _react2 = _interopRequireDefault(_react);

var _classnames = __webpack_require__("./node_modules/classnames/index.js");

var _classnames2 = _interopRequireDefault(_classnames);

var _withStyles = __webpack_require__("./node_modules/material-ui/styles/withStyles.js");

var _withStyles2 = _interopRequireDefault(_withStyles);

var _Typography = __webpack_require__("./node_modules/material-ui/Typography/index.js");

var _Typography2 = _interopRequireDefault(_Typography);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var babelPluginFlowReactPropTypes_proptype_Element = __webpack_require__("./node_modules/react/react.js").babelPluginFlowReactPropTypes_proptype_Element || __webpack_require__("./node_modules/prop-types/index.js").any;

var styles = exports.styles = function styles(theme) {
  return {
    root: {
      display: 'inline-flex',
      alignItems: 'center',
      cursor: 'pointer',
      // Remove grey highlight
      WebkitTapHighlightColor: theme.palette.common.transparent
    },
    disabled: {
      color: theme.palette.text.disabled,
      cursor: 'default'
    },
    hasLabel: {
      marginLeft: -12,
      marginRight: theme.spacing.unit * 2 // used for row presentation of radio/checkbox
    },
    label: {
      userSelect: 'none'
    }
  };
};

var babelPluginFlowReactPropTypes_proptype_Props = {
  checked: __webpack_require__("./node_modules/prop-types/index.js").oneOfType([__webpack_require__("./node_modules/prop-types/index.js").bool, __webpack_require__("./node_modules/prop-types/index.js").string]),
  classes: __webpack_require__("./node_modules/prop-types/index.js").object,
  className: __webpack_require__("./node_modules/prop-types/index.js").string,
  control: typeof babelPluginFlowReactPropTypes_proptype_Element === 'function' ? babelPluginFlowReactPropTypes_proptype_Element.isRequired ? babelPluginFlowReactPropTypes_proptype_Element.isRequired : babelPluginFlowReactPropTypes_proptype_Element : __webpack_require__("./node_modules/prop-types/index.js").shape(babelPluginFlowReactPropTypes_proptype_Element).isRequired,
  disabled: __webpack_require__("./node_modules/prop-types/index.js").bool,
  inputRef: __webpack_require__("./node_modules/prop-types/index.js").func,
  label: __webpack_require__("./node_modules/prop-types/index.js").string.isRequired,
  name: __webpack_require__("./node_modules/prop-types/index.js").string,
  onChange: __webpack_require__("./node_modules/prop-types/index.js").func,
  value: __webpack_require__("./node_modules/prop-types/index.js").string
};


function FormControlLabel(props) {
  var _classNames;

  var checked = props.checked,
      classes = props.classes,
      classNameProp = props.className,
      control = props.control,
      disabled = props.disabled,
      inputRef = props.inputRef,
      label = props.label,
      name = props.name,
      onChange = props.onChange,
      value = props.value,
      other = (0, _objectWithoutProperties3.default)(props, ['checked', 'classes', 'className', 'control', 'disabled', 'inputRef', 'label', 'name', 'onChange', 'value']);


  var className = (0, _classnames2.default)(classes.root, (_classNames = {}, (0, _defineProperty3.default)(_classNames, classes.hasLabel, label && label.length), (0, _defineProperty3.default)(_classNames, classes.disabled, disabled), _classNames), classNameProp);

  return _react2.default.createElement(
    'label',
    (0, _extends3.default)({ className: className }, other),
    (0, _react.cloneElement)(control, {
      disabled: typeof control.props.disabled === 'undefined' ? disabled : control.props.disabled,
      checked: typeof control.props.checked === 'undefined' ? checked : control.props.checked,
      name: control.props.name || name,
      onChange: control.props.onChange || onChange,
      value: control.props.value || value,
      inputRef: control.props.inputRef || inputRef
    }),
    _react2.default.createElement(
      _Typography2.default,
      { className: classes.label },
      label
    )
  );
}

FormControlLabel.propTypes =  true ? (_ref = {
  classes: __webpack_require__("./node_modules/prop-types/index.js").object.isRequired,
  checked: __webpack_require__("./node_modules/prop-types/index.js").oneOfType([__webpack_require__("./node_modules/prop-types/index.js").bool, __webpack_require__("./node_modules/prop-types/index.js").string])
}, (0, _defineProperty3.default)(_ref, 'classes', __webpack_require__("./node_modules/prop-types/index.js").object), (0, _defineProperty3.default)(_ref, 'className', __webpack_require__("./node_modules/prop-types/index.js").string), (0, _defineProperty3.default)(_ref, 'control', typeof babelPluginFlowReactPropTypes_proptype_Element === 'function' ? babelPluginFlowReactPropTypes_proptype_Element.isRequired ? babelPluginFlowReactPropTypes_proptype_Element.isRequired : babelPluginFlowReactPropTypes_proptype_Element : __webpack_require__("./node_modules/prop-types/index.js").shape(babelPluginFlowReactPropTypes_proptype_Element).isRequired), (0, _defineProperty3.default)(_ref, 'disabled', __webpack_require__("./node_modules/prop-types/index.js").bool), (0, _defineProperty3.default)(_ref, 'inputRef', __webpack_require__("./node_modules/prop-types/index.js").func), (0, _defineProperty3.default)(_ref, 'label', __webpack_require__("./node_modules/prop-types/index.js").string.isRequired), (0, _defineProperty3.default)(_ref, 'name', __webpack_require__("./node_modules/prop-types/index.js").string), (0, _defineProperty3.default)(_ref, 'onChange', __webpack_require__("./node_modules/prop-types/index.js").func), (0, _defineProperty3.default)(_ref, 'value', __webpack_require__("./node_modules/prop-types/index.js").string), _ref) : {};
FormControlLabel.defaultProps = {
  disabled: false
};

exports.default = (0, _withStyles2.default)(styles, { name: 'MuiFormControlLabel' })(FormControlLabel);

/***/ }),

/***/ "./node_modules/material-ui/Form/FormGroup.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.styles = undefined;

var _extends2 = __webpack_require__("./node_modules/babel-runtime/helpers/extends.js");

var _extends3 = _interopRequireDefault(_extends2);

var _defineProperty2 = __webpack_require__("./node_modules/babel-runtime/helpers/defineProperty.js");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _objectWithoutProperties2 = __webpack_require__("./node_modules/babel-runtime/helpers/objectWithoutProperties.js");

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _ref;

var _react = __webpack_require__("./node_modules/react/react.js");

var _react2 = _interopRequireDefault(_react);

var _classnames = __webpack_require__("./node_modules/classnames/index.js");

var _classnames2 = _interopRequireDefault(_classnames);

var _withStyles = __webpack_require__("./node_modules/material-ui/styles/withStyles.js");

var _withStyles2 = _interopRequireDefault(_withStyles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var babelPluginFlowReactPropTypes_proptype_Element = __webpack_require__("./node_modules/react/react.js").babelPluginFlowReactPropTypes_proptype_Element || __webpack_require__("./node_modules/prop-types/index.js").any;

var styles = exports.styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap'
  },
  row: {
    flexDirection: 'row'
  }
};

var babelPluginFlowReactPropTypes_proptype_Props = {
  children: typeof babelPluginFlowReactPropTypes_proptype_Element === 'function' ? babelPluginFlowReactPropTypes_proptype_Element : __webpack_require__("./node_modules/prop-types/index.js").shape(babelPluginFlowReactPropTypes_proptype_Element),
  classes: __webpack_require__("./node_modules/prop-types/index.js").object,
  className: __webpack_require__("./node_modules/prop-types/index.js").string,
  row: __webpack_require__("./node_modules/prop-types/index.js").bool
};


/**
 * FormGroup wraps controls such as Checkbox and Switch.
 * It provides compact row layout and FormLabel awareness.
 */
function FormGroup(props) {
  var classes = props.classes,
      className = props.className,
      children = props.children,
      row = props.row,
      other = (0, _objectWithoutProperties3.default)(props, ['classes', 'className', 'children', 'row']);

  var rootClassName = (0, _classnames2.default)(classes.root, (0, _defineProperty3.default)({}, classes.row, row), className);

  return _react2.default.createElement(
    'div',
    (0, _extends3.default)({ className: rootClassName }, other),
    children
  );
}

FormGroup.propTypes =  true ? (_ref = {
  classes: __webpack_require__("./node_modules/prop-types/index.js").object.isRequired,
  children: typeof babelPluginFlowReactPropTypes_proptype_Element === 'function' ? babelPluginFlowReactPropTypes_proptype_Element : __webpack_require__("./node_modules/prop-types/index.js").shape(babelPluginFlowReactPropTypes_proptype_Element)
}, (0, _defineProperty3.default)(_ref, 'classes', __webpack_require__("./node_modules/prop-types/index.js").object), (0, _defineProperty3.default)(_ref, 'className', __webpack_require__("./node_modules/prop-types/index.js").string), (0, _defineProperty3.default)(_ref, 'row', __webpack_require__("./node_modules/prop-types/index.js").bool), _ref) : {};
FormGroup.defaultProps = {
  row: false
};

exports.default = (0, _withStyles2.default)(styles, { name: 'MuiFormGroup' })(FormGroup);

/***/ }),

/***/ "./node_modules/material-ui/Form/FormHelperText.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.styles = undefined;

var _extends2 = __webpack_require__("./node_modules/babel-runtime/helpers/extends.js");

var _extends3 = _interopRequireDefault(_extends2);

var _defineProperty2 = __webpack_require__("./node_modules/babel-runtime/helpers/defineProperty.js");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _objectWithoutProperties2 = __webpack_require__("./node_modules/babel-runtime/helpers/objectWithoutProperties.js");

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _ref;

var _react = __webpack_require__("./node_modules/react/react.js");

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__("./node_modules/prop-types/index.js");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = __webpack_require__("./node_modules/classnames/index.js");

var _classnames2 = _interopRequireDefault(_classnames);

var _withStyles = __webpack_require__("./node_modules/material-ui/styles/withStyles.js");

var _withStyles2 = _interopRequireDefault(_withStyles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var babelPluginFlowReactPropTypes_proptype_Element = __webpack_require__("./node_modules/react/react.js").babelPluginFlowReactPropTypes_proptype_Element || __webpack_require__("./node_modules/prop-types/index.js").any;

var styles = exports.styles = function styles(theme) {
  return {
    root: {
      color: theme.palette.input.helperText,
      fontFamily: theme.typography.fontFamily,
      fontSize: 12,
      textAlign: 'left',
      marginTop: theme.spacing.unit,
      lineHeight: '1em',
      minHeight: '1em',
      margin: 0
    },
    dense: {
      marginTop: theme.spacing.unit / 2
    },
    error: {
      color: theme.palette.error.A400
    },
    disabled: {
      color: theme.palette.input.disabled
    }
  };
};

var babelPluginFlowReactPropTypes_proptype_Props = {
  children: typeof babelPluginFlowReactPropTypes_proptype_Element === 'function' ? babelPluginFlowReactPropTypes_proptype_Element : __webpack_require__("./node_modules/prop-types/index.js").shape(babelPluginFlowReactPropTypes_proptype_Element),
  classes: __webpack_require__("./node_modules/prop-types/index.js").object,
  className: __webpack_require__("./node_modules/prop-types/index.js").string,
  disabled: __webpack_require__("./node_modules/prop-types/index.js").bool,
  error: __webpack_require__("./node_modules/prop-types/index.js").bool,
  margin: __webpack_require__("./node_modules/prop-types/index.js").oneOf(['dense'])
};


function FormHelperText(props, context) {
  var _classNames;

  var children = props.children,
      classes = props.classes,
      classNameProp = props.className,
      disabledProp = props.disabled,
      errorProp = props.error,
      marginProp = props.margin,
      other = (0, _objectWithoutProperties3.default)(props, ['children', 'classes', 'className', 'disabled', 'error', 'margin']);
  var muiFormControl = context.muiFormControl;


  var disabled = disabledProp;
  var error = errorProp;
  var margin = marginProp;

  if (muiFormControl) {
    if (typeof disabled === 'undefined') {
      disabled = muiFormControl.disabled;
    }

    if (typeof error === 'undefined') {
      error = muiFormControl.error;
    }

    if (typeof margin === 'undefined') {
      margin = muiFormControl.margin;
    }
  }

  var className = (0, _classnames2.default)(classes.root, (_classNames = {}, (0, _defineProperty3.default)(_classNames, classes.disabled, disabled), (0, _defineProperty3.default)(_classNames, classes.error, error), (0, _defineProperty3.default)(_classNames, classes.dense, margin === 'dense'), _classNames), classNameProp);

  return _react2.default.createElement(
    'p',
    (0, _extends3.default)({ className: className }, other),
    children
  );
}

FormHelperText.propTypes =  true ? (_ref = {
  classes: __webpack_require__("./node_modules/prop-types/index.js").object.isRequired,
  children: typeof babelPluginFlowReactPropTypes_proptype_Element === 'function' ? babelPluginFlowReactPropTypes_proptype_Element : __webpack_require__("./node_modules/prop-types/index.js").shape(babelPluginFlowReactPropTypes_proptype_Element)
}, (0, _defineProperty3.default)(_ref, 'classes', __webpack_require__("./node_modules/prop-types/index.js").object), (0, _defineProperty3.default)(_ref, 'className', __webpack_require__("./node_modules/prop-types/index.js").string), (0, _defineProperty3.default)(_ref, 'disabled', __webpack_require__("./node_modules/prop-types/index.js").bool), (0, _defineProperty3.default)(_ref, 'error', __webpack_require__("./node_modules/prop-types/index.js").bool), (0, _defineProperty3.default)(_ref, 'margin', __webpack_require__("./node_modules/prop-types/index.js").oneOf(['dense'])), _ref) : {};
FormHelperText.contextTypes = {
  muiFormControl: _propTypes2.default.object
};

exports.default = (0, _withStyles2.default)(styles, { name: 'MuiFormHelperText' })(FormHelperText);

/***/ }),

/***/ "./node_modules/material-ui/Form/FormLabel.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.styles = undefined;

var _extends2 = __webpack_require__("./node_modules/babel-runtime/helpers/extends.js");

var _extends3 = _interopRequireDefault(_extends2);

var _defineProperty2 = __webpack_require__("./node_modules/babel-runtime/helpers/defineProperty.js");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _objectWithoutProperties2 = __webpack_require__("./node_modules/babel-runtime/helpers/objectWithoutProperties.js");

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _ref;

var _react = __webpack_require__("./node_modules/react/react.js");

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__("./node_modules/prop-types/index.js");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = __webpack_require__("./node_modules/classnames/index.js");

var _classnames2 = _interopRequireDefault(_classnames);

var _withStyles = __webpack_require__("./node_modules/material-ui/styles/withStyles.js");

var _withStyles2 = _interopRequireDefault(_withStyles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var babelPluginFlowReactPropTypes_proptype_Element = __webpack_require__("./node_modules/react/react.js").babelPluginFlowReactPropTypes_proptype_Element || __webpack_require__("./node_modules/prop-types/index.js").any;

var styles = exports.styles = function styles(theme) {
  var focusColor = theme.palette.primary[theme.palette.type === 'light' ? 'A700' : 'A200'];
  return {
    root: {
      fontFamily: theme.typography.fontFamily,
      color: theme.palette.input.labelText,
      lineHeight: 1
    },
    focused: {
      color: focusColor
    },
    error: {
      color: theme.palette.error.A400
    },
    disabled: {
      color: theme.palette.input.disabled
    }
  };
};

var babelPluginFlowReactPropTypes_proptype_Props = {
  children: typeof babelPluginFlowReactPropTypes_proptype_Element === 'function' ? babelPluginFlowReactPropTypes_proptype_Element : __webpack_require__("./node_modules/prop-types/index.js").shape(babelPluginFlowReactPropTypes_proptype_Element),
  classes: __webpack_require__("./node_modules/prop-types/index.js").object,
  className: __webpack_require__("./node_modules/prop-types/index.js").string,
  component: __webpack_require__("./node_modules/prop-types/index.js").oneOfType([__webpack_require__("./node_modules/prop-types/index.js").string, __webpack_require__("./node_modules/prop-types/index.js").func]),
  disabled: __webpack_require__("./node_modules/prop-types/index.js").bool,
  error: __webpack_require__("./node_modules/prop-types/index.js").bool,
  focused: __webpack_require__("./node_modules/prop-types/index.js").bool,
  required: __webpack_require__("./node_modules/prop-types/index.js").bool
};


function FormLabel(props, context) {
  var _classNames;

  var children = props.children,
      classes = props.classes,
      classNameProp = props.className,
      Component = props.component,
      disabledProp = props.disabled,
      errorProp = props.error,
      focusedProp = props.focused,
      requiredProp = props.required,
      other = (0, _objectWithoutProperties3.default)(props, ['children', 'classes', 'className', 'component', 'disabled', 'error', 'focused', 'required']);
  var muiFormControl = context.muiFormControl;


  var required = requiredProp;
  var focused = focusedProp;
  var disabled = disabledProp;
  var error = errorProp;

  if (muiFormControl) {
    if (typeof required === 'undefined') {
      required = muiFormControl.required;
    }
    if (typeof focused === 'undefined') {
      focused = muiFormControl.focused;
    }
    if (typeof disabled === 'undefined') {
      disabled = muiFormControl.disabled;
    }
    if (typeof error === 'undefined') {
      error = muiFormControl.error;
    }
  }

  var className = (0, _classnames2.default)(classes.root, (_classNames = {}, (0, _defineProperty3.default)(_classNames, classes.focused, focused), (0, _defineProperty3.default)(_classNames, classes.disabled, disabled), (0, _defineProperty3.default)(_classNames, classes.error, error), _classNames), classNameProp);

  var asteriskClassName = (0, _classnames2.default)((0, _defineProperty3.default)({}, classes.error, error));

  return _react2.default.createElement(
    Component,
    (0, _extends3.default)({ className: className }, other),
    children,
    required && _react2.default.createElement(
      'span',
      { className: asteriskClassName },
      '\u2009*'
    )
  );
}

FormLabel.propTypes =  true ? (_ref = {
  classes: __webpack_require__("./node_modules/prop-types/index.js").object.isRequired,
  component: __webpack_require__("./node_modules/prop-types/index.js").string.isRequired,
  children: typeof babelPluginFlowReactPropTypes_proptype_Element === 'function' ? babelPluginFlowReactPropTypes_proptype_Element : __webpack_require__("./node_modules/prop-types/index.js").shape(babelPluginFlowReactPropTypes_proptype_Element)
}, (0, _defineProperty3.default)(_ref, 'classes', __webpack_require__("./node_modules/prop-types/index.js").object), (0, _defineProperty3.default)(_ref, 'className', __webpack_require__("./node_modules/prop-types/index.js").string), (0, _defineProperty3.default)(_ref, 'component', __webpack_require__("./node_modules/prop-types/index.js").oneOfType([__webpack_require__("./node_modules/prop-types/index.js").string, __webpack_require__("./node_modules/prop-types/index.js").func])), (0, _defineProperty3.default)(_ref, 'disabled', __webpack_require__("./node_modules/prop-types/index.js").bool), (0, _defineProperty3.default)(_ref, 'error', __webpack_require__("./node_modules/prop-types/index.js").bool), (0, _defineProperty3.default)(_ref, 'focused', __webpack_require__("./node_modules/prop-types/index.js").bool), (0, _defineProperty3.default)(_ref, 'required', __webpack_require__("./node_modules/prop-types/index.js").bool), _ref) : {};
FormLabel.defaultProps = {
  component: 'label'
};

FormLabel.contextTypes = {
  muiFormControl: _propTypes2.default.object
};

exports.default = (0, _withStyles2.default)(styles, { name: 'MuiFormLabel' })(FormLabel);

/***/ }),

/***/ "./node_modules/material-ui/Form/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _FormGroup = __webpack_require__("./node_modules/material-ui/Form/FormGroup.js");

Object.defineProperty(exports, 'FormGroup', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_FormGroup).default;
  }
});

var _FormLabel = __webpack_require__("./node_modules/material-ui/Form/FormLabel.js");

Object.defineProperty(exports, 'FormLabel', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_FormLabel).default;
  }
});

var _FormControl = __webpack_require__("./node_modules/material-ui/Form/FormControl.js");

Object.defineProperty(exports, 'FormControl', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_FormControl).default;
  }
});

var _FormHelperText = __webpack_require__("./node_modules/material-ui/Form/FormHelperText.js");

Object.defineProperty(exports, 'FormHelperText', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_FormHelperText).default;
  }
});

var _FormControlLabel = __webpack_require__("./node_modules/material-ui/Form/FormControlLabel.js");

Object.defineProperty(exports, 'FormControlLabel', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_FormControlLabel).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),

/***/ "./node_modules/material-ui/Input/Input.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.styles = undefined;

var _extends2 = __webpack_require__("./node_modules/babel-runtime/helpers/extends.js");

var _extends3 = _interopRequireDefault(_extends2);

var _defineProperty2 = __webpack_require__("./node_modules/babel-runtime/helpers/defineProperty.js");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _objectWithoutProperties2 = __webpack_require__("./node_modules/babel-runtime/helpers/objectWithoutProperties.js");

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _getPrototypeOf = __webpack_require__("./node_modules/babel-runtime/core-js/object/get-prototype-of.js");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__("./node_modules/babel-runtime/helpers/classCallCheck.js");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__("./node_modules/babel-runtime/helpers/createClass.js");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__("./node_modules/babel-runtime/helpers/possibleConstructorReturn.js");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__("./node_modules/babel-runtime/helpers/inherits.js");

var _inherits3 = _interopRequireDefault(_inherits2);

var _ref2, _ref3; //  weak

exports.hasValue = hasValue;
exports.isDirty = isDirty;

var _react = __webpack_require__("./node_modules/react/react.js");

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__("./node_modules/prop-types/index.js");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = __webpack_require__("./node_modules/classnames/index.js");

var _classnames2 = _interopRequireDefault(_classnames);

var _withStyles = __webpack_require__("./node_modules/material-ui/styles/withStyles.js");

var _withStyles2 = _interopRequireDefault(_withStyles);

var _Textarea = __webpack_require__("./node_modules/material-ui/Input/Textarea.js");

var _Textarea2 = _interopRequireDefault(_Textarea);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Supports determination of isControlled().
 * Controlled input accepts its current value as a prop.
 *
 * @see https://facebook.github.io/react/docs/forms.html#controlled-components
 * @param value
 * @returns {boolean} true if string (including '') or number (including zero)
 */
function hasValue(value) {
  return value !== undefined && value !== null && !(Array.isArray(value) && value.length === 0);
}

/**
 * Determine if field is dirty (a.k.a. filled).
 *
 * Response determines if label is presented above field or as placeholder.
 *
 * @param obj
 * @param SSR
 * @returns {boolean} False when not present or empty string.
 *                    True when any number or string with length.
 */
function isDirty(obj) {
  var SSR = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  return obj && (hasValue(obj.value) && obj.value !== '' || SSR && hasValue(obj.defaultValue) && obj.defaultValue !== '');
}

var styles = exports.styles = function styles(theme) {
  var placeholder = {
    color: 'currentColor',
    opacity: theme.palette.type === 'light' ? 0.42 : 0.5
  };
  var placeholderForm = {
    opacity: 0,
    transition: theme.transitions.create('opacity', {
      duration: theme.transitions.duration.shorter,
      easing: theme.transitions.easing.ease
    })
  };
  var placeholderFormFocus = {
    opacity: theme.palette.type === 'light' ? 0.42 : 0.5
  };

  return {
    root: {
      // Mimics the default input display property used by browsers for an input.
      display: 'inline-block',
      position: 'relative',
      fontFamily: theme.typography.fontFamily,
      color: theme.palette.input.inputText
    },
    formControl: {
      'label + &': {
        marginTop: theme.spacing.unit * 2
      }
    },
    inkbar: {
      '&:after': {
        backgroundColor: theme.palette.primary[theme.palette.type === 'light' ? 'A700' : 'A200'],
        left: 0,
        bottom: 0,
        // Doing the other way around crash on IE11 "''" https://github.com/cssinjs/jss/issues/242
        content: '""',
        height: 2,
        position: 'absolute',
        right: 0,
        transform: 'scaleX(0)',
        transition: theme.transitions.create('transform', {
          duration: theme.transitions.duration.shorter,
          easing: theme.transitions.easing.easeOut
        })
      },
      '&$focused:after': {
        transform: 'scaleX(1)'
      }
    },
    error: {
      '&:after': {
        backgroundColor: theme.palette.error.A400,
        transform: 'scaleX(1)' // error is always underlined in red
      }
    },
    input: {
      font: 'inherit',
      color: 'currentColor',
      // slight alteration to spec spacing to match visual spec result
      padding: theme.spacing.unit - 1 + 'px 0',
      border: 0,
      display: 'block',
      boxSizing: 'content-box',
      verticalAlign: 'middle',
      background: 'none',
      margin: 0, // Reset for Safari
      width: '100%',
      '&::-webkit-input-placeholder': placeholder,
      '&::-moz-placeholder': placeholder, // Firefox 19+
      '&:-ms-input-placeholder': placeholder, // IE 11
      '&::-ms-input-placeholder': placeholder, // Edge
      '&:focus': {
        outline: 0
      },
      '&::-webkit-search-decoration': {
        // Remove the padding when type=search.
        appearance: 'none'
      },
      // Show and hide the placeholder logic
      'label + $formControl &': {
        '&::-webkit-input-placeholder': placeholderForm,
        '&::-moz-placeholder': placeholderForm, // Firefox 19+
        '&:-ms-input-placeholder': placeholderForm, // IE 11
        '&::-ms-input-placeholder': placeholderForm, // Edge
        '&:focus::-webkit-input-placeholder': placeholderFormFocus,
        '&:focus::-moz-placeholder': placeholderFormFocus, // Firefox 19+
        '&:focus:-ms-input-placeholder': placeholderFormFocus, // IE 11
        '&:focus::-ms-input-placeholder': placeholderFormFocus // Edge
      }
    },
    inputDense: {
      paddingTop: theme.spacing.unit / 2
    },
    disabled: {
      color: theme.palette.text.disabled
    },
    focused: {},
    underline: {
      paddingBottom: 2,
      '&:before': {
        backgroundColor: theme.palette.input.bottomLine,
        left: 0,
        bottom: 0,
        // Doing the other way around crash on IE11 "''" https://github.com/cssinjs/jss/issues/242
        content: '""',
        height: 1,
        position: 'absolute',
        right: 0,
        transition: theme.transitions.create('backgroundColor', {
          duration: theme.transitions.duration.shorter,
          easing: theme.transitions.easing.ease
        })
      },
      '&:hover:not($disabled):before': {
        backgroundColor: theme.palette.text.primary,
        height: 2
      },
      '&$disabled:before': {
        background: 'transparent',
        backgroundImage: 'linear-gradient(to right, ' + theme.palette.input.bottomLine + ' 33%, transparent 0%)',
        backgroundPosition: 'left top',
        backgroundRepeat: 'repeat-x',
        backgroundSize: '5px 1px'
      }
    },
    multiline: {
      padding: theme.spacing.unit - 2 + 'px 0 ' + (theme.spacing.unit - 1) + 'px'
    },
    inputDisabled: {
      opacity: 1 // Reset iOS opacity
    },
    inputSingleline: {
      height: '1em',
      appearance: 'textfield' // Improve type search style.
    },
    inputMultiline: {
      resize: 'none',
      padding: 0
    },
    fullWidth: {
      width: '100%'
    }
  };
};

var babelPluginFlowReactPropTypes_proptype_Props = {
  autoComplete: __webpack_require__("./node_modules/prop-types/index.js").string,
  autoFocus: __webpack_require__("./node_modules/prop-types/index.js").bool,
  classes: __webpack_require__("./node_modules/prop-types/index.js").object,
  className: __webpack_require__("./node_modules/prop-types/index.js").string,
  component: __webpack_require__("./node_modules/prop-types/index.js").oneOfType([__webpack_require__("./node_modules/prop-types/index.js").string, __webpack_require__("./node_modules/prop-types/index.js").func]),
  defaultValue: __webpack_require__("./node_modules/prop-types/index.js").oneOfType([__webpack_require__("./node_modules/prop-types/index.js").string, __webpack_require__("./node_modules/prop-types/index.js").number]),
  disabled: __webpack_require__("./node_modules/prop-types/index.js").bool,
  disableUnderline: __webpack_require__("./node_modules/prop-types/index.js").bool,
  error: __webpack_require__("./node_modules/prop-types/index.js").bool,
  fullWidth: __webpack_require__("./node_modules/prop-types/index.js").bool,
  id: __webpack_require__("./node_modules/prop-types/index.js").string,
  inputProps: __webpack_require__("./node_modules/prop-types/index.js").object,
  inputRef: __webpack_require__("./node_modules/prop-types/index.js").func,
  margin: __webpack_require__("./node_modules/prop-types/index.js").oneOf(['dense']),
  multiline: __webpack_require__("./node_modules/prop-types/index.js").bool,
  name: __webpack_require__("./node_modules/prop-types/index.js").string,
  onBlur: __webpack_require__("./node_modules/prop-types/index.js").func,
  onChange: __webpack_require__("./node_modules/prop-types/index.js").func,
  onClean: __webpack_require__("./node_modules/prop-types/index.js").func,
  onDirty: __webpack_require__("./node_modules/prop-types/index.js").func,
  onFocus: __webpack_require__("./node_modules/prop-types/index.js").func,
  onKeyDown: __webpack_require__("./node_modules/prop-types/index.js").func,
  onKeyUp: __webpack_require__("./node_modules/prop-types/index.js").func,
  placeholder: __webpack_require__("./node_modules/prop-types/index.js").string,
  rows: __webpack_require__("./node_modules/prop-types/index.js").oneOfType([__webpack_require__("./node_modules/prop-types/index.js").string, __webpack_require__("./node_modules/prop-types/index.js").number]),
  rowsMax: __webpack_require__("./node_modules/prop-types/index.js").oneOfType([__webpack_require__("./node_modules/prop-types/index.js").string, __webpack_require__("./node_modules/prop-types/index.js").number]),
  type: __webpack_require__("./node_modules/prop-types/index.js").string,
  value: __webpack_require__("./node_modules/prop-types/index.js").oneOfType([__webpack_require__("./node_modules/prop-types/index.js").string, __webpack_require__("./node_modules/prop-types/index.js").number])
};

var Input = function (_Component) {
  (0, _inherits3.default)(Input, _Component);

  function Input() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, Input);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Input.__proto__ || (0, _getPrototypeOf2.default)(Input)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      focused: false
    }, _this.input = null, _this.handleFocus = function (event) {
      _this.setState({ focused: true });
      if (_this.props.onFocus) {
        _this.props.onFocus(event);
      }
    }, _this.handleBlur = function (event) {
      _this.setState({ focused: false });
      if (_this.props.onBlur) {
        _this.props.onBlur(event);
      }
    }, _this.handleChange = function (event) {
      if (!_this.isControlled()) {
        _this.checkDirty(_this.input);
      } // else perform in the willUpdate
      if (_this.props.onChange) {
        _this.props.onChange(event);
      }
    }, _this.handleRefInput = function (node) {
      _this.input = node;
      if (_this.props.inputRef) {
        _this.props.inputRef(node);
      }
    }, _this.handleRefTextarea = function (node) {
      _this.input = node;
      if (_this.props.inputRef) {
        _this.props.inputRef(node);
      }
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(Input, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      if (this.isControlled()) {
        this.checkDirty(this.props);
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (!this.isControlled()) {
        this.checkDirty(this.input);
      }
    }
  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps) {
      if (this.isControlled()) {
        this.checkDirty(nextProps);
      } // else performed in the onChange
    }

    // Holds the input reference

  }, {
    key: 'isControlled',


    /**
     * A controlled input accepts its current value as a prop.
     *
     * @see https://facebook.github.io/react/docs/forms.html#controlled-components
     * @returns {boolean} true if string (including '') or number (including zero)
     */
    value: function isControlled() {
      return hasValue(this.props.value);
    }
  }, {
    key: 'checkDirty',
    value: function checkDirty(obj) {
      var muiFormControl = this.context.muiFormControl;


      if (isDirty(obj)) {
        if (muiFormControl && muiFormControl.onDirty) {
          muiFormControl.onDirty();
        }
        if (this.props.onDirty) {
          this.props.onDirty();
        }
        return;
      }

      if (muiFormControl && muiFormControl.onClean) {
        muiFormControl.onClean();
      }
      if (this.props.onClean) {
        this.props.onClean();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _classNames, _classNames2;

      var _props = this.props,
          autoComplete = _props.autoComplete,
          autoFocus = _props.autoFocus,
          classes = _props.classes,
          classNameProp = _props.className,
          component = _props.component,
          defaultValue = _props.defaultValue,
          disabledProp = _props.disabled,
          disableUnderline = _props.disableUnderline,
          errorProp = _props.error,
          fullWidth = _props.fullWidth,
          id = _props.id,
          inputPropsProp = _props.inputProps,
          inputRef = _props.inputRef,
          marginProp = _props.margin,
          multiline = _props.multiline,
          onBlur = _props.onBlur,
          onFocus = _props.onFocus,
          onChange = _props.onChange,
          onClean = _props.onClean,
          onDirty = _props.onDirty,
          onKeyDown = _props.onKeyDown,
          onKeyUp = _props.onKeyUp,
          placeholder = _props.placeholder,
          name = _props.name,
          rows = _props.rows,
          rowsMax = _props.rowsMax,
          type = _props.type,
          value = _props.value,
          other = (0, _objectWithoutProperties3.default)(_props, ['autoComplete', 'autoFocus', 'classes', 'className', 'component', 'defaultValue', 'disabled', 'disableUnderline', 'error', 'fullWidth', 'id', 'inputProps', 'inputRef', 'margin', 'multiline', 'onBlur', 'onFocus', 'onChange', 'onClean', 'onDirty', 'onKeyDown', 'onKeyUp', 'placeholder', 'name', 'rows', 'rowsMax', 'type', 'value']);
      var muiFormControl = this.context.muiFormControl;


      var disabled = disabledProp;
      var error = errorProp;
      var margin = marginProp;

      if (muiFormControl) {
        if (typeof disabled === 'undefined') {
          disabled = muiFormControl.disabled;
        }

        if (typeof error === 'undefined') {
          error = muiFormControl.error;
        }

        if (typeof margin === 'undefined') {
          margin = muiFormControl.margin;
        }
      }

      var className = (0, _classnames2.default)(classes.root, (_classNames = {}, (0, _defineProperty3.default)(_classNames, classes.disabled, disabled), (0, _defineProperty3.default)(_classNames, classes.error, error), (0, _defineProperty3.default)(_classNames, classes.fullWidth, fullWidth), (0, _defineProperty3.default)(_classNames, classes.focused, this.state.focused), (0, _defineProperty3.default)(_classNames, classes.formControl, muiFormControl), (0, _defineProperty3.default)(_classNames, classes.inkbar, !disableUnderline), (0, _defineProperty3.default)(_classNames, classes.multiline, multiline), (0, _defineProperty3.default)(_classNames, classes.underline, !disableUnderline), _classNames), classNameProp);

      var inputClassName = (0, _classnames2.default)(classes.input, (_classNames2 = {}, (0, _defineProperty3.default)(_classNames2, classes.inputDisabled, disabled), (0, _defineProperty3.default)(_classNames2, classes.inputSingleline, !multiline), (0, _defineProperty3.default)(_classNames2, classes.inputMultiline, multiline), (0, _defineProperty3.default)(_classNames2, classes.inputDense, margin === 'dense'), _classNames2));

      var required = muiFormControl && muiFormControl.required === true;

      var InputComponent = 'input';
      var inputProps = (0, _extends3.default)({
        ref: this.handleRefInput
      }, inputPropsProp);

      if (component) {
        InputComponent = component;
      } else if (multiline) {
        if (rows && !rowsMax) {
          InputComponent = 'textarea';
        } else {
          inputProps = (0, _extends3.default)({
            rowsMax: rowsMax,
            textareaRef: this.handleRefTextarea
          }, inputProps, {
            ref: null
          });
          InputComponent = _Textarea2.default;
        }
      }

      return _react2.default.createElement(
        'div',
        (0, _extends3.default)({ className: className }, other),
        _react2.default.createElement(InputComponent, (0, _extends3.default)({
          autoComplete: autoComplete,
          autoFocus: autoFocus,
          className: inputClassName,
          onBlur: this.handleBlur,
          onFocus: this.handleFocus,
          onChange: this.handleChange,
          onKeyUp: onKeyUp,
          onKeyDown: onKeyDown,
          disabled: disabled,
          'aria-required': required ? true : undefined,
          value: value,
          id: id,
          name: name,
          defaultValue: defaultValue,
          placeholder: placeholder,
          type: type,
          rows: rows
        }, inputProps))
      );
    }
  }]);
  return Input;
}(_react.Component);

Input.muiName = 'Input';
Input.defaultProps = {
  disableUnderline: false,
  fullWidth: false,
  multiline: false,
  type: 'text'
};
Input.contextTypes = {
  muiFormControl: _propTypes2.default.object
};
Input.propTypes =  true ? (_ref2 = {
  classes: __webpack_require__("./node_modules/prop-types/index.js").object.isRequired,
  disableUnderline: __webpack_require__("./node_modules/prop-types/index.js").bool.isRequired,
  fullWidth: __webpack_require__("./node_modules/prop-types/index.js").bool.isRequired,
  multiline: __webpack_require__("./node_modules/prop-types/index.js").bool.isRequired,
  type: __webpack_require__("./node_modules/prop-types/index.js").string.isRequired,
  autoComplete: __webpack_require__("./node_modules/prop-types/index.js").string,
  autoFocus: __webpack_require__("./node_modules/prop-types/index.js").bool
}, (0, _defineProperty3.default)(_ref2, 'classes', __webpack_require__("./node_modules/prop-types/index.js").object), (0, _defineProperty3.default)(_ref2, 'className', __webpack_require__("./node_modules/prop-types/index.js").string), (0, _defineProperty3.default)(_ref2, 'component', __webpack_require__("./node_modules/prop-types/index.js").oneOfType([__webpack_require__("./node_modules/prop-types/index.js").string, __webpack_require__("./node_modules/prop-types/index.js").func])), (0, _defineProperty3.default)(_ref2, 'defaultValue', __webpack_require__("./node_modules/prop-types/index.js").oneOfType([__webpack_require__("./node_modules/prop-types/index.js").string, __webpack_require__("./node_modules/prop-types/index.js").number])), (0, _defineProperty3.default)(_ref2, 'disabled', __webpack_require__("./node_modules/prop-types/index.js").bool), (0, _defineProperty3.default)(_ref2, 'disableUnderline', __webpack_require__("./node_modules/prop-types/index.js").bool), (0, _defineProperty3.default)(_ref2, 'error', __webpack_require__("./node_modules/prop-types/index.js").bool), (0, _defineProperty3.default)(_ref2, 'fullWidth', __webpack_require__("./node_modules/prop-types/index.js").bool), (0, _defineProperty3.default)(_ref2, 'id', __webpack_require__("./node_modules/prop-types/index.js").string), (0, _defineProperty3.default)(_ref2, 'inputProps', __webpack_require__("./node_modules/prop-types/index.js").object), (0, _defineProperty3.default)(_ref2, 'inputRef', __webpack_require__("./node_modules/prop-types/index.js").func), (0, _defineProperty3.default)(_ref2, 'margin', __webpack_require__("./node_modules/prop-types/index.js").oneOf(['dense'])), (0, _defineProperty3.default)(_ref2, 'multiline', __webpack_require__("./node_modules/prop-types/index.js").bool), (0, _defineProperty3.default)(_ref2, 'name', __webpack_require__("./node_modules/prop-types/index.js").string), (0, _defineProperty3.default)(_ref2, 'onBlur', __webpack_require__("./node_modules/prop-types/index.js").func), (0, _defineProperty3.default)(_ref2, 'onChange', __webpack_require__("./node_modules/prop-types/index.js").func), (0, _defineProperty3.default)(_ref2, 'onClean', __webpack_require__("./node_modules/prop-types/index.js").func), (0, _defineProperty3.default)(_ref2, 'onDirty', __webpack_require__("./node_modules/prop-types/index.js").func), (0, _defineProperty3.default)(_ref2, 'onFocus', __webpack_require__("./node_modules/prop-types/index.js").func), (0, _defineProperty3.default)(_ref2, 'onKeyDown', __webpack_require__("./node_modules/prop-types/index.js").func), (0, _defineProperty3.default)(_ref2, 'onKeyUp', __webpack_require__("./node_modules/prop-types/index.js").func), (0, _defineProperty3.default)(_ref2, 'placeholder', __webpack_require__("./node_modules/prop-types/index.js").string), (0, _defineProperty3.default)(_ref2, 'rows', __webpack_require__("./node_modules/prop-types/index.js").oneOfType([__webpack_require__("./node_modules/prop-types/index.js").string, __webpack_require__("./node_modules/prop-types/index.js").number])), (0, _defineProperty3.default)(_ref2, 'rowsMax', __webpack_require__("./node_modules/prop-types/index.js").oneOfType([__webpack_require__("./node_modules/prop-types/index.js").string, __webpack_require__("./node_modules/prop-types/index.js").number])), (0, _defineProperty3.default)(_ref2, 'type', __webpack_require__("./node_modules/prop-types/index.js").string), (0, _defineProperty3.default)(_ref2, 'value', __webpack_require__("./node_modules/prop-types/index.js").oneOfType([__webpack_require__("./node_modules/prop-types/index.js").string, __webpack_require__("./node_modules/prop-types/index.js").number])), _ref2) : {};
Input.propTypes =  true ? (_ref3 = {
  classes: __webpack_require__("./node_modules/prop-types/index.js").object.isRequired,
  disableUnderline: __webpack_require__("./node_modules/prop-types/index.js").bool.isRequired,
  fullWidth: __webpack_require__("./node_modules/prop-types/index.js").bool.isRequired,
  multiline: __webpack_require__("./node_modules/prop-types/index.js").bool.isRequired,
  type: __webpack_require__("./node_modules/prop-types/index.js").string.isRequired,
  autoComplete: __webpack_require__("./node_modules/prop-types/index.js").string,
  autoFocus: __webpack_require__("./node_modules/prop-types/index.js").bool
}, (0, _defineProperty3.default)(_ref3, 'classes', __webpack_require__("./node_modules/prop-types/index.js").object), (0, _defineProperty3.default)(_ref3, 'className', __webpack_require__("./node_modules/prop-types/index.js").string), (0, _defineProperty3.default)(_ref3, 'component', __webpack_require__("./node_modules/prop-types/index.js").oneOfType([__webpack_require__("./node_modules/prop-types/index.js").string, __webpack_require__("./node_modules/prop-types/index.js").func])), (0, _defineProperty3.default)(_ref3, 'defaultValue', __webpack_require__("./node_modules/prop-types/index.js").oneOfType([__webpack_require__("./node_modules/prop-types/index.js").string, __webpack_require__("./node_modules/prop-types/index.js").number])), (0, _defineProperty3.default)(_ref3, 'disabled', __webpack_require__("./node_modules/prop-types/index.js").bool), (0, _defineProperty3.default)(_ref3, 'disableUnderline', __webpack_require__("./node_modules/prop-types/index.js").bool), (0, _defineProperty3.default)(_ref3, 'error', __webpack_require__("./node_modules/prop-types/index.js").bool), (0, _defineProperty3.default)(_ref3, 'fullWidth', __webpack_require__("./node_modules/prop-types/index.js").bool), (0, _defineProperty3.default)(_ref3, 'id', __webpack_require__("./node_modules/prop-types/index.js").string), (0, _defineProperty3.default)(_ref3, 'inputProps', __webpack_require__("./node_modules/prop-types/index.js").object), (0, _defineProperty3.default)(_ref3, 'inputRef', __webpack_require__("./node_modules/prop-types/index.js").func), (0, _defineProperty3.default)(_ref3, 'margin', __webpack_require__("./node_modules/prop-types/index.js").oneOf(['dense'])), (0, _defineProperty3.default)(_ref3, 'multiline', __webpack_require__("./node_modules/prop-types/index.js").bool), (0, _defineProperty3.default)(_ref3, 'name', __webpack_require__("./node_modules/prop-types/index.js").string), (0, _defineProperty3.default)(_ref3, 'onBlur', __webpack_require__("./node_modules/prop-types/index.js").func), (0, _defineProperty3.default)(_ref3, 'onChange', __webpack_require__("./node_modules/prop-types/index.js").func), (0, _defineProperty3.default)(_ref3, 'onClean', __webpack_require__("./node_modules/prop-types/index.js").func), (0, _defineProperty3.default)(_ref3, 'onDirty', __webpack_require__("./node_modules/prop-types/index.js").func), (0, _defineProperty3.default)(_ref3, 'onFocus', __webpack_require__("./node_modules/prop-types/index.js").func), (0, _defineProperty3.default)(_ref3, 'onKeyDown', __webpack_require__("./node_modules/prop-types/index.js").func), (0, _defineProperty3.default)(_ref3, 'onKeyUp', __webpack_require__("./node_modules/prop-types/index.js").func), (0, _defineProperty3.default)(_ref3, 'placeholder', __webpack_require__("./node_modules/prop-types/index.js").string), (0, _defineProperty3.default)(_ref3, 'rows', __webpack_require__("./node_modules/prop-types/index.js").oneOfType([__webpack_require__("./node_modules/prop-types/index.js").string, __webpack_require__("./node_modules/prop-types/index.js").number])), (0, _defineProperty3.default)(_ref3, 'rowsMax', __webpack_require__("./node_modules/prop-types/index.js").oneOfType([__webpack_require__("./node_modules/prop-types/index.js").string, __webpack_require__("./node_modules/prop-types/index.js").number])), (0, _defineProperty3.default)(_ref3, 'type', __webpack_require__("./node_modules/prop-types/index.js").string), (0, _defineProperty3.default)(_ref3, 'value', __webpack_require__("./node_modules/prop-types/index.js").oneOfType([__webpack_require__("./node_modules/prop-types/index.js").string, __webpack_require__("./node_modules/prop-types/index.js").number])), _ref3) : {};
exports.default = (0, _withStyles2.default)(styles, { name: 'MuiInput' })(Input);

/***/ }),

/***/ "./node_modules/material-ui/Input/InputLabel.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.styles = undefined;

var _extends2 = __webpack_require__("./node_modules/babel-runtime/helpers/extends.js");

var _extends3 = _interopRequireDefault(_extends2);

var _defineProperty2 = __webpack_require__("./node_modules/babel-runtime/helpers/defineProperty.js");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _objectWithoutProperties2 = __webpack_require__("./node_modules/babel-runtime/helpers/objectWithoutProperties.js");

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _ref;

var _react = __webpack_require__("./node_modules/react/react.js");

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__("./node_modules/prop-types/index.js");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = __webpack_require__("./node_modules/classnames/index.js");

var _classnames2 = _interopRequireDefault(_classnames);

var _withStyles = __webpack_require__("./node_modules/material-ui/styles/withStyles.js");

var _withStyles2 = _interopRequireDefault(_withStyles);

var _Form = __webpack_require__("./node_modules/material-ui/Form/index.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var babelPluginFlowReactPropTypes_proptype_Element = __webpack_require__("./node_modules/react/react.js").babelPluginFlowReactPropTypes_proptype_Element || __webpack_require__("./node_modules/prop-types/index.js").any;

var styles = exports.styles = function styles(theme) {
  return {
    root: {
      transformOrigin: 'top left'
    },
    formControl: {
      position: 'absolute',
      left: 0,
      top: 0,
      // slight alteration to spec spacing to match visual spec result
      transform: 'translate(0, ' + (theme.spacing.unit * 3 - 1) + 'px) scale(1)'
    },
    shrink: {
      transform: 'translate(0, 1.5px) scale(0.75)',
      transformOrigin: 'top left'
    },
    animated: {
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shorter,
        easing: theme.transitions.easing.easeOut
      })
    },
    disabled: {
      color: theme.palette.input.disabled
    }
  };
};

var babelPluginFlowReactPropTypes_proptype_Props = {
  children: typeof babelPluginFlowReactPropTypes_proptype_Element === 'function' ? babelPluginFlowReactPropTypes_proptype_Element : __webpack_require__("./node_modules/prop-types/index.js").shape(babelPluginFlowReactPropTypes_proptype_Element),
  classes: __webpack_require__("./node_modules/prop-types/index.js").object,
  className: __webpack_require__("./node_modules/prop-types/index.js").string,
  disableAnimation: __webpack_require__("./node_modules/prop-types/index.js").bool,
  disabled: __webpack_require__("./node_modules/prop-types/index.js").bool,
  error: __webpack_require__("./node_modules/prop-types/index.js").bool,
  focused: __webpack_require__("./node_modules/prop-types/index.js").bool,
  required: __webpack_require__("./node_modules/prop-types/index.js").bool,
  shrink: __webpack_require__("./node_modules/prop-types/index.js").bool
};


function InputLabel(props, context) {
  var _classNames;

  var disabled = props.disabled,
      disableAnimation = props.disableAnimation,
      children = props.children,
      classes = props.classes,
      classNameProp = props.className,
      shrinkProp = props.shrink,
      other = (0, _objectWithoutProperties3.default)(props, ['disabled', 'disableAnimation', 'children', 'classes', 'className', 'shrink']);
  var muiFormControl = context.muiFormControl;

  var shrink = shrinkProp;

  if (typeof shrink === 'undefined' && muiFormControl) {
    shrink = muiFormControl.dirty || muiFormControl.focused;
  }

  var className = (0, _classnames2.default)(classes.root, (_classNames = {}, (0, _defineProperty3.default)(_classNames, classes.formControl, muiFormControl), (0, _defineProperty3.default)(_classNames, classes.animated, !disableAnimation), (0, _defineProperty3.default)(_classNames, classes.shrink, shrink), (0, _defineProperty3.default)(_classNames, classes.disabled, disabled), _classNames), classNameProp);

  return _react2.default.createElement(
    _Form.FormLabel,
    (0, _extends3.default)({ className: className }, other),
    children
  );
}

InputLabel.propTypes =  true ? (_ref = {
  classes: __webpack_require__("./node_modules/prop-types/index.js").object.isRequired,
  disabled: __webpack_require__("./node_modules/prop-types/index.js").bool.isRequired,
  disableAnimation: __webpack_require__("./node_modules/prop-types/index.js").bool.isRequired,
  children: typeof babelPluginFlowReactPropTypes_proptype_Element === 'function' ? babelPluginFlowReactPropTypes_proptype_Element : __webpack_require__("./node_modules/prop-types/index.js").shape(babelPluginFlowReactPropTypes_proptype_Element)
}, (0, _defineProperty3.default)(_ref, 'classes', __webpack_require__("./node_modules/prop-types/index.js").object), (0, _defineProperty3.default)(_ref, 'className', __webpack_require__("./node_modules/prop-types/index.js").string), (0, _defineProperty3.default)(_ref, 'disableAnimation', __webpack_require__("./node_modules/prop-types/index.js").bool), (0, _defineProperty3.default)(_ref, 'disabled', __webpack_require__("./node_modules/prop-types/index.js").bool), (0, _defineProperty3.default)(_ref, 'error', __webpack_require__("./node_modules/prop-types/index.js").bool), (0, _defineProperty3.default)(_ref, 'focused', __webpack_require__("./node_modules/prop-types/index.js").bool), (0, _defineProperty3.default)(_ref, 'required', __webpack_require__("./node_modules/prop-types/index.js").bool), (0, _defineProperty3.default)(_ref, 'shrink', __webpack_require__("./node_modules/prop-types/index.js").bool), _ref) : {};
InputLabel.defaultProps = {
  disabled: false,
  disableAnimation: false
};

InputLabel.contextTypes = {
  muiFormControl: _propTypes2.default.object
};

exports.default = (0, _withStyles2.default)(styles, { name: 'MuiInputLabel' })(InputLabel);

/***/ }),

/***/ "./node_modules/material-ui/Input/Textarea.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.styles = undefined;

var _defineProperty2 = __webpack_require__("./node_modules/babel-runtime/helpers/defineProperty.js");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends2 = __webpack_require__("./node_modules/babel-runtime/helpers/extends.js");

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = __webpack_require__("./node_modules/babel-runtime/helpers/objectWithoutProperties.js");

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _getPrototypeOf = __webpack_require__("./node_modules/babel-runtime/core-js/object/get-prototype-of.js");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__("./node_modules/babel-runtime/helpers/classCallCheck.js");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__("./node_modules/babel-runtime/helpers/createClass.js");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__("./node_modules/babel-runtime/helpers/possibleConstructorReturn.js");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__("./node_modules/babel-runtime/helpers/inherits.js");

var _inherits3 = _interopRequireDefault(_inherits2);

var _ref2, _ref3;

var _react = __webpack_require__("./node_modules/react/react.js");

var _react2 = _interopRequireDefault(_react);

var _classnames = __webpack_require__("./node_modules/classnames/index.js");

var _classnames2 = _interopRequireDefault(_classnames);

var _debounce = __webpack_require__("./node_modules/lodash/debounce.js");

var _debounce2 = _interopRequireDefault(_debounce);

var _reactEventListener = __webpack_require__("./node_modules/react-event-listener/lib/index.js");

var _reactEventListener2 = _interopRequireDefault(_reactEventListener);

var _withStyles = __webpack_require__("./node_modules/material-ui/styles/withStyles.js");

var _withStyles2 = _interopRequireDefault(_withStyles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var rowsHeight = 24;

var styles = exports.styles = {
  root: {
    position: 'relative' // because the shadow has position: 'absolute',
  },
  textarea: {
    width: '100%',
    height: '100%',
    resize: 'none',
    font: 'inherit',
    padding: 0,
    cursor: 'inherit',
    boxSizing: 'border-box',
    lineHeight: 'inherit',
    border: 'none',
    outline: 'none',
    background: 'transparent'
  },
  shadow: {
    resize: 'none',
    // Overflow also needed to here to remove the extra row
    // added to textareas in Firefox.
    overflow: 'hidden',
    // Visibility needed to hide the extra text area on ipads
    visibility: 'hidden',
    position: 'absolute',
    height: 'auto',
    whiteSpace: 'pre-wrap'
  }
};

var babelPluginFlowReactPropTypes_proptype_Props = {
  classes: __webpack_require__("./node_modules/prop-types/index.js").object,
  className: __webpack_require__("./node_modules/prop-types/index.js").string,
  defaultValue: __webpack_require__("./node_modules/prop-types/index.js").string,
  disabled: __webpack_require__("./node_modules/prop-types/index.js").bool,
  onChange: __webpack_require__("./node_modules/prop-types/index.js").func,
  rows: __webpack_require__("./node_modules/prop-types/index.js").oneOfType([__webpack_require__("./node_modules/prop-types/index.js").string, __webpack_require__("./node_modules/prop-types/index.js").number]),
  rowsMax: __webpack_require__("./node_modules/prop-types/index.js").oneOfType([__webpack_require__("./node_modules/prop-types/index.js").string, __webpack_require__("./node_modules/prop-types/index.js").number]),
  textareaRef: __webpack_require__("./node_modules/prop-types/index.js").func,
  value: __webpack_require__("./node_modules/prop-types/index.js").string
};

var Textarea = function (_Component) {
  (0, _inherits3.default)(Textarea, _Component);

  function Textarea() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, Textarea);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Textarea.__proto__ || (0, _getPrototypeOf2.default)(Textarea)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      height: null
    }, _this.handleResize = (0, _debounce2.default)(function (event) {
      _this.syncHeightWithShadow(event);
    }, 166), _this.handleRefInput = function (node) {
      _this.input = node;
      if (_this.props.textareaRef) {
        _this.props.textareaRef(node);
      }
    }, _this.handleRefSinglelineShadow = function (node) {
      _this.singlelineShadow = node;
    }, _this.handleRefShadow = function (node) {
      _this.shadow = node;
    }, _this.handleChange = function (event) {
      _this.value = event.target.value;

      if (typeof _this.props.value === 'undefined') {
        // The component is not controlled, we need to update the shallow value.
        _this.shadow.value = _this.value;
        _this.syncHeightWithShadow(event);
      }

      if (_this.props.onChange) {
        _this.props.onChange(event);
      }
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(Textarea, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      // <Input> expects the components it renders to respond to 'value'
      // so that it can check whether they are dirty
      this.value = this.props.value || this.props.defaultValue || '';
      this.setState({
        height: Number(this.props.rows) * rowsHeight
      });
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.syncHeightWithShadow(null);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.value !== this.props.value || Number(nextProps.rowsMax) !== Number(this.props.rowsMax)) {
        this.syncHeightWithShadow(null, nextProps);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.handleResize.cancel();
    }
  }, {
    key: 'syncHeightWithShadow',
    value: function syncHeightWithShadow(event) {
      var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.props;

      var shadow = this.shadow;
      var singlelineShadow = this.singlelineShadow;

      // The component is controlled, we need to update the shallow value.
      if (typeof this.props.value !== 'undefined') {
        this.shadow.value = props.value || '';
      }

      var lineHeight = singlelineShadow.scrollHeight;
      var newHeight = shadow.scrollHeight;

      // Guarding for jsdom, where scrollHeight isn't present.
      // See https://github.com/tmpvar/jsdom/issues/1013
      if (newHeight === undefined) {
        return;
      }

      if (Number(props.rowsMax) >= Number(props.rows)) {
        newHeight = Math.min(Number(props.rowsMax) * lineHeight, newHeight);
      }

      newHeight = Math.max(newHeight, lineHeight);

      if (this.state.height !== newHeight) {
        this.setState({
          height: newHeight
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          classes = _props.classes,
          className = _props.className,
          defaultValue = _props.defaultValue,
          onChange = _props.onChange,
          rows = _props.rows,
          rowsMax = _props.rowsMax,
          textareaRef = _props.textareaRef,
          value = _props.value,
          other = (0, _objectWithoutProperties3.default)(_props, ['classes', 'className', 'defaultValue', 'onChange', 'rows', 'rowsMax', 'textareaRef', 'value']);


      return _react2.default.createElement(
        'div',
        { className: classes.root, style: { height: this.state.height } },
        _react2.default.createElement(_reactEventListener2.default, { target: 'window', onResize: this.handleResize }),
        _react2.default.createElement('textarea', {
          ref: this.handleRefSinglelineShadow,
          className: (0, _classnames2.default)(classes.shadow, classes.textarea),
          tabIndex: '-1',
          rows: '1',
          readOnly: true,
          'aria-hidden': 'true',
          value: ''
        }),
        _react2.default.createElement('textarea', {
          ref: this.handleRefShadow,
          className: (0, _classnames2.default)(classes.shadow, classes.textarea),
          tabIndex: '-1',
          rows: rows,
          'aria-hidden': 'true',
          readOnly: true,
          defaultValue: defaultValue,
          value: value
        }),
        _react2.default.createElement('textarea', (0, _extends3.default)({
          ref: this.handleRefInput,
          rows: rows,
          className: (0, _classnames2.default)(classes.textarea, className),
          defaultValue: defaultValue,
          value: value,
          onChange: this.handleChange
        }, other))
      );
    }
  }]);
  return Textarea;
}(_react.Component);

Textarea.defaultProps = {
  classes: {},
  rows: 1
};
Textarea.propTypes =  true ? (_ref2 = {
  classes: __webpack_require__("./node_modules/prop-types/index.js").object.isRequired,
  rows: __webpack_require__("./node_modules/prop-types/index.js").number.isRequired
}, (0, _defineProperty3.default)(_ref2, 'classes', __webpack_require__("./node_modules/prop-types/index.js").object), (0, _defineProperty3.default)(_ref2, 'className', __webpack_require__("./node_modules/prop-types/index.js").string), (0, _defineProperty3.default)(_ref2, 'defaultValue', __webpack_require__("./node_modules/prop-types/index.js").string), (0, _defineProperty3.default)(_ref2, 'disabled', __webpack_require__("./node_modules/prop-types/index.js").bool), (0, _defineProperty3.default)(_ref2, 'onChange', __webpack_require__("./node_modules/prop-types/index.js").func), (0, _defineProperty3.default)(_ref2, 'rows', __webpack_require__("./node_modules/prop-types/index.js").oneOfType([__webpack_require__("./node_modules/prop-types/index.js").string, __webpack_require__("./node_modules/prop-types/index.js").number])), (0, _defineProperty3.default)(_ref2, 'rowsMax', __webpack_require__("./node_modules/prop-types/index.js").oneOfType([__webpack_require__("./node_modules/prop-types/index.js").string, __webpack_require__("./node_modules/prop-types/index.js").number])), (0, _defineProperty3.default)(_ref2, 'textareaRef', __webpack_require__("./node_modules/prop-types/index.js").func), (0, _defineProperty3.default)(_ref2, 'value', __webpack_require__("./node_modules/prop-types/index.js").string), _ref2) : {};
Textarea.propTypes =  true ? (_ref3 = {
  classes: __webpack_require__("./node_modules/prop-types/index.js").object.isRequired,
  rows: __webpack_require__("./node_modules/prop-types/index.js").number.isRequired
}, (0, _defineProperty3.default)(_ref3, 'classes', __webpack_require__("./node_modules/prop-types/index.js").object), (0, _defineProperty3.default)(_ref3, 'className', __webpack_require__("./node_modules/prop-types/index.js").string), (0, _defineProperty3.default)(_ref3, 'defaultValue', __webpack_require__("./node_modules/prop-types/index.js").string), (0, _defineProperty3.default)(_ref3, 'disabled', __webpack_require__("./node_modules/prop-types/index.js").bool), (0, _defineProperty3.default)(_ref3, 'onChange', __webpack_require__("./node_modules/prop-types/index.js").func), (0, _defineProperty3.default)(_ref3, 'rows', __webpack_require__("./node_modules/prop-types/index.js").oneOfType([__webpack_require__("./node_modules/prop-types/index.js").string, __webpack_require__("./node_modules/prop-types/index.js").number])), (0, _defineProperty3.default)(_ref3, 'rowsMax', __webpack_require__("./node_modules/prop-types/index.js").oneOfType([__webpack_require__("./node_modules/prop-types/index.js").string, __webpack_require__("./node_modules/prop-types/index.js").number])), (0, _defineProperty3.default)(_ref3, 'textareaRef', __webpack_require__("./node_modules/prop-types/index.js").func), (0, _defineProperty3.default)(_ref3, 'value', __webpack_require__("./node_modules/prop-types/index.js").string), _ref3) : {};
exports.default = (0, _withStyles2.default)(styles, { name: 'MuiTextarea' })(Textarea);

/***/ }),

/***/ "./node_modules/material-ui/Input/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Input = __webpack_require__("./node_modules/material-ui/Input/Input.js");

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Input).default;
  }
});

var _InputLabel = __webpack_require__("./node_modules/material-ui/Input/InputLabel.js");

Object.defineProperty(exports, 'InputLabel', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_InputLabel).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),

/***/ "./node_modules/material-ui/TextField/TextField.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = __webpack_require__("./node_modules/babel-runtime/helpers/extends.js");

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = __webpack_require__("./node_modules/babel-runtime/helpers/objectWithoutProperties.js");

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = __webpack_require__("./node_modules/react/react.js");

var _react2 = _interopRequireDefault(_react);

var _Input = __webpack_require__("./node_modules/material-ui/Input/index.js");

var _Input2 = _interopRequireDefault(_Input);

var _FormControl = __webpack_require__("./node_modules/material-ui/Form/FormControl.js");

var _FormControl2 = _interopRequireDefault(_FormControl);

var _FormHelperText = __webpack_require__("./node_modules/material-ui/Form/FormHelperText.js");

var _FormHelperText2 = _interopRequireDefault(_FormHelperText);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var babelPluginFlowReactPropTypes_proptype_Element = __webpack_require__("./node_modules/react/react.js").babelPluginFlowReactPropTypes_proptype_Element || __webpack_require__("./node_modules/prop-types/index.js").any;
// @inheritedComponent FormControl

var babelPluginFlowReactPropTypes_proptype_Props = {
  autoComplete: __webpack_require__("./node_modules/prop-types/index.js").string,
  autoFocus: __webpack_require__("./node_modules/prop-types/index.js").bool,
  className: __webpack_require__("./node_modules/prop-types/index.js").string,
  defaultValue: __webpack_require__("./node_modules/prop-types/index.js").string,
  disabled: __webpack_require__("./node_modules/prop-types/index.js").bool,
  error: __webpack_require__("./node_modules/prop-types/index.js").bool,
  FormHelperTextProps: __webpack_require__("./node_modules/prop-types/index.js").object,
  fullWidth: __webpack_require__("./node_modules/prop-types/index.js").bool,
  helperText: __webpack_require__("./node_modules/prop-types/index.js").oneOfType([__webpack_require__("./node_modules/prop-types/index.js").string, typeof babelPluginFlowReactPropTypes_proptype_Element === 'function' ? babelPluginFlowReactPropTypes_proptype_Element : __webpack_require__("./node_modules/prop-types/index.js").shape(babelPluginFlowReactPropTypes_proptype_Element)]),
  helperTextClassName: __webpack_require__("./node_modules/prop-types/index.js").string,
  id: __webpack_require__("./node_modules/prop-types/index.js").string,
  inputClassName: __webpack_require__("./node_modules/prop-types/index.js").string,
  InputClassName: __webpack_require__("./node_modules/prop-types/index.js").string,
  InputLabelProps: __webpack_require__("./node_modules/prop-types/index.js").object,
  inputProps: __webpack_require__("./node_modules/prop-types/index.js").object,
  InputProps: __webpack_require__("./node_modules/prop-types/index.js").object,
  inputRef: __webpack_require__("./node_modules/prop-types/index.js").func,
  label: __webpack_require__("./node_modules/prop-types/index.js").oneOfType([__webpack_require__("./node_modules/prop-types/index.js").string, typeof babelPluginFlowReactPropTypes_proptype_Element === 'function' ? babelPluginFlowReactPropTypes_proptype_Element : __webpack_require__("./node_modules/prop-types/index.js").shape(babelPluginFlowReactPropTypes_proptype_Element)]),
  labelClassName: __webpack_require__("./node_modules/prop-types/index.js").string,
  multiline: __webpack_require__("./node_modules/prop-types/index.js").bool,
  name: __webpack_require__("./node_modules/prop-types/index.js").string,
  placeholder: __webpack_require__("./node_modules/prop-types/index.js").string,
  required: __webpack_require__("./node_modules/prop-types/index.js").bool,
  rootRef: __webpack_require__("./node_modules/prop-types/index.js").func,
  rows: __webpack_require__("./node_modules/prop-types/index.js").oneOfType([__webpack_require__("./node_modules/prop-types/index.js").string, __webpack_require__("./node_modules/prop-types/index.js").number]),
  rowsMax: __webpack_require__("./node_modules/prop-types/index.js").oneOfType([__webpack_require__("./node_modules/prop-types/index.js").string, __webpack_require__("./node_modules/prop-types/index.js").number]),
  type: __webpack_require__("./node_modules/prop-types/index.js").string,
  value: __webpack_require__("./node_modules/prop-types/index.js").oneOfType([__webpack_require__("./node_modules/prop-types/index.js").string, __webpack_require__("./node_modules/prop-types/index.js").number]),
  margin: __webpack_require__("./node_modules/prop-types/index.js").oneOf(['none', 'dense', 'normal'])
};


function TextField(props) {
  var autoComplete = props.autoComplete,
      autoFocus = props.autoFocus,
      className = props.className,
      defaultValue = props.defaultValue,
      disabled = props.disabled,
      error = props.error,
      id = props.id,
      inputClassName = props.inputClassName,
      InputClassName = props.InputClassName,
      inputPropsProp = props.inputProps,
      InputProps = props.InputProps,
      inputRef = props.inputRef,
      label = props.label,
      labelClassName = props.labelClassName,
      InputLabelProps = props.InputLabelProps,
      helperText = props.helperText,
      helperTextClassName = props.helperTextClassName,
      FormHelperTextProps = props.FormHelperTextProps,
      fullWidth = props.fullWidth,
      required = props.required,
      type = props.type,
      multiline = props.multiline,
      name = props.name,
      placeholder = props.placeholder,
      rootRef = props.rootRef,
      rows = props.rows,
      rowsMax = props.rowsMax,
      value = props.value,
      other = (0, _objectWithoutProperties3.default)(props, ['autoComplete', 'autoFocus', 'className', 'defaultValue', 'disabled', 'error', 'id', 'inputClassName', 'InputClassName', 'inputProps', 'InputProps', 'inputRef', 'label', 'labelClassName', 'InputLabelProps', 'helperText', 'helperTextClassName', 'FormHelperTextProps', 'fullWidth', 'required', 'type', 'multiline', 'name', 'placeholder', 'rootRef', 'rows', 'rowsMax', 'value']);


  var inputProps = inputPropsProp;

  if (inputClassName) {
    inputProps = (0, _extends3.default)({
      className: inputClassName
    }, inputProps);
  }

  return _react2.default.createElement(
    _FormControl2.default,
    (0, _extends3.default)({
      fullWidth: fullWidth,
      ref: rootRef,
      className: className,
      error: error,
      required: required
    }, other),
    label && _react2.default.createElement(
      _Input.InputLabel,
      (0, _extends3.default)({ htmlFor: id, className: labelClassName }, InputLabelProps),
      label
    ),
    _react2.default.createElement(_Input2.default, (0, _extends3.default)({
      autoComplete: autoComplete,
      autoFocus: autoFocus,
      className: InputClassName,
      defaultValue: defaultValue,
      disabled: disabled,
      multiline: multiline,
      name: name,
      rows: rows,
      rowsMax: rowsMax,
      type: type,
      value: value,
      id: id,
      inputProps: inputProps,
      inputRef: inputRef,
      placeholder: placeholder
    }, InputProps)),
    helperText && _react2.default.createElement(
      _FormHelperText2.default,
      (0, _extends3.default)({ className: helperTextClassName }, FormHelperTextProps),
      helperText
    )
  );
}

TextField.propTypes =  true ? babelPluginFlowReactPropTypes_proptype_Props : {};
TextField.defaultProps = {
  required: false
};

exports.default = TextField;

/***/ }),

/***/ "./node_modules/material-ui/TextField/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _TextField = __webpack_require__("./node_modules/material-ui/TextField/TextField.js");

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_TextField).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),

/***/ "./node_modules/material-ui/Typography/Typography.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.styles = undefined;

var _extends2 = __webpack_require__("./node_modules/babel-runtime/helpers/extends.js");

var _extends3 = _interopRequireDefault(_extends2);

var _defineProperty2 = __webpack_require__("./node_modules/babel-runtime/helpers/defineProperty.js");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _objectWithoutProperties2 = __webpack_require__("./node_modules/babel-runtime/helpers/objectWithoutProperties.js");

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _ref;

var _react = __webpack_require__("./node_modules/react/react.js");

var _react2 = _interopRequireDefault(_react);

var _classnames = __webpack_require__("./node_modules/classnames/index.js");

var _classnames2 = _interopRequireDefault(_classnames);

var _withStyles = __webpack_require__("./node_modules/material-ui/styles/withStyles.js");

var _withStyles2 = _interopRequireDefault(_withStyles);

var _helpers = __webpack_require__("./node_modules/material-ui/utils/helpers.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var babelPluginFlowReactPropTypes_proptype_Element = __webpack_require__("./node_modules/react/react.js").babelPluginFlowReactPropTypes_proptype_Element || __webpack_require__("./node_modules/prop-types/index.js").any;

var styles = exports.styles = function styles(theme) {
  return {
    root: {
      display: 'block',
      margin: 0
    },
    display4: theme.typography.display4,
    display3: theme.typography.display3,
    display2: theme.typography.display2,
    display1: theme.typography.display1,
    headline: theme.typography.headline,
    title: theme.typography.title,
    subheading: theme.typography.subheading,
    body2: theme.typography.body2,
    body1: theme.typography.body1,
    caption: theme.typography.caption,
    button: theme.typography.button,
    alignLeft: {
      textAlign: 'left'
    },
    alignCenter: {
      textAlign: 'center'
    },
    alignRight: {
      textAlign: 'right'
    },
    alignJustify: {
      textAlign: 'justify'
    },
    noWrap: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    },
    gutterBottom: {
      marginBottom: '0.35em'
    },
    paragraph: {
      marginBottom: theme.spacing.unit * 2
    },
    colorInherit: {
      color: 'inherit'
    },
    colorSecondary: {
      color: theme.palette.text.secondary
    },
    colorAccent: {
      color: theme.palette.accent.A400
    }
  };
};

var babelPluginFlowReactPropTypes_proptype_Props = {
  align: __webpack_require__("./node_modules/prop-types/index.js").oneOf(['inherit', 'left', 'center', 'right', 'justify']),
  children: typeof babelPluginFlowReactPropTypes_proptype_Element === 'function' ? babelPluginFlowReactPropTypes_proptype_Element : __webpack_require__("./node_modules/prop-types/index.js").shape(babelPluginFlowReactPropTypes_proptype_Element),
  classes: __webpack_require__("./node_modules/prop-types/index.js").object,
  className: __webpack_require__("./node_modules/prop-types/index.js").string,
  component: __webpack_require__("./node_modules/prop-types/index.js").oneOfType([__webpack_require__("./node_modules/prop-types/index.js").string, __webpack_require__("./node_modules/prop-types/index.js").func]),
  color: __webpack_require__("./node_modules/prop-types/index.js").oneOf(['inherit', 'secondary', 'accent', 'default']),
  gutterBottom: __webpack_require__("./node_modules/prop-types/index.js").bool,
  headlineMapping: __webpack_require__("./node_modules/prop-types/index.js").shape({}),
  noWrap: __webpack_require__("./node_modules/prop-types/index.js").bool,
  paragraph: __webpack_require__("./node_modules/prop-types/index.js").bool,
  type: __webpack_require__("./node_modules/prop-types/index.js").oneOf(['display4', 'display3', 'display2', 'display1', 'headline', 'title', 'subheading', 'body2', 'body1', 'caption', 'button'])
};


function Typography(props) {
  var _classNames;

  var align = props.align,
      classes = props.classes,
      classNameProp = props.className,
      componentProp = props.component,
      color = props.color,
      gutterBottom = props.gutterBottom,
      headlineMapping = props.headlineMapping,
      noWrap = props.noWrap,
      paragraph = props.paragraph,
      typeProp = props.type,
      other = (0, _objectWithoutProperties3.default)(props, ['align', 'classes', 'className', 'component', 'color', 'gutterBottom', 'headlineMapping', 'noWrap', 'paragraph', 'type']);

  // workaround: see https://github.com/facebook/flow/issues/1660#issuecomment-297775427

  var type = typeProp || Typography.defaultProps.type;

  var className = (0, _classnames2.default)(classes.root, classes[type], (_classNames = {}, (0, _defineProperty3.default)(_classNames, classes['color' + (0, _helpers.capitalizeFirstLetter)(color)], color !== 'default'), (0, _defineProperty3.default)(_classNames, classes.noWrap, noWrap), (0, _defineProperty3.default)(_classNames, classes.gutterBottom, gutterBottom), (0, _defineProperty3.default)(_classNames, classes.paragraph, paragraph), (0, _defineProperty3.default)(_classNames, classes['align' + (0, _helpers.capitalizeFirstLetter)(align)], align !== 'inherit'), _classNames), classNameProp);

  var Component = componentProp || (paragraph ? 'p' : headlineMapping[type]) || 'span';

  return _react2.default.createElement(Component, (0, _extends3.default)({ className: className }, other));
}

Typography.propTypes =  true ? (_ref = {
  classes: __webpack_require__("./node_modules/prop-types/index.js").object.isRequired,
  headlineMapping: __webpack_require__("./node_modules/prop-types/index.js").shape({}).isRequired,
  align: __webpack_require__("./node_modules/prop-types/index.js").oneOf(['inherit', 'left', 'center', 'right', 'justify']),
  children: typeof babelPluginFlowReactPropTypes_proptype_Element === 'function' ? babelPluginFlowReactPropTypes_proptype_Element : __webpack_require__("./node_modules/prop-types/index.js").shape(babelPluginFlowReactPropTypes_proptype_Element)
}, (0, _defineProperty3.default)(_ref, 'classes', __webpack_require__("./node_modules/prop-types/index.js").object), (0, _defineProperty3.default)(_ref, 'className', __webpack_require__("./node_modules/prop-types/index.js").string), (0, _defineProperty3.default)(_ref, 'component', __webpack_require__("./node_modules/prop-types/index.js").oneOfType([__webpack_require__("./node_modules/prop-types/index.js").string, __webpack_require__("./node_modules/prop-types/index.js").func])), (0, _defineProperty3.default)(_ref, 'color', __webpack_require__("./node_modules/prop-types/index.js").oneOf(['inherit', 'secondary', 'accent', 'default'])), (0, _defineProperty3.default)(_ref, 'gutterBottom', __webpack_require__("./node_modules/prop-types/index.js").bool), (0, _defineProperty3.default)(_ref, 'headlineMapping', __webpack_require__("./node_modules/prop-types/index.js").shape({})), (0, _defineProperty3.default)(_ref, 'noWrap', __webpack_require__("./node_modules/prop-types/index.js").bool), (0, _defineProperty3.default)(_ref, 'paragraph', __webpack_require__("./node_modules/prop-types/index.js").bool), (0, _defineProperty3.default)(_ref, 'type', __webpack_require__("./node_modules/prop-types/index.js").oneOf(['display4', 'display3', 'display2', 'display1', 'headline', 'title', 'subheading', 'body2', 'body1', 'caption', 'button'])), _ref) : {};
Typography.defaultProps = {
  align: 'inherit',
  color: 'default',
  gutterBottom: false,
  headlineMapping: {
    display4: 'h1',
    display3: 'h1',
    display2: 'h1',
    display1: 'h1',
    headline: 'h1',
    title: 'h2',
    subheading: 'h3',
    body2: 'aside',
    body1: 'p'
  },
  noWrap: false,
  paragraph: false,
  type: 'body1'
};

exports.default = (0, _withStyles2.default)(styles, { name: 'MuiTypography' })(Typography);

/***/ }),

/***/ "./node_modules/material-ui/Typography/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Typography = __webpack_require__("./node_modules/material-ui/Typography/Typography.js");

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Typography).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),

/***/ "./node_modules/material-ui/utils/addEventListener.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (node, event, handler, capture) {
  (0, _on2.default)(node, event, handler, capture);
  return {
    remove: function remove() {
      (0, _off2.default)(node, event, handler, capture);
    }
  };
};

var _on = __webpack_require__("./node_modules/dom-helpers/events/on.js");

var _on2 = _interopRequireDefault(_on);

var _off = __webpack_require__("./node_modules/dom-helpers/events/off.js");

var _off2 = _interopRequireDefault(_off);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),

/***/ "./node_modules/material-ui/utils/helpers.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof2 = __webpack_require__("./node_modules/babel-runtime/helpers/typeof.js");

var _typeof3 = _interopRequireDefault(_typeof2);

var _keys = __webpack_require__("./node_modules/babel-runtime/core-js/object/keys.js");

var _keys2 = _interopRequireDefault(_keys);

exports.capitalizeFirstLetter = capitalizeFirstLetter;
exports.contains = contains;
exports.findIndex = findIndex;
exports.find = find;
exports.createChainedFunction = createChainedFunction;

var _warning = __webpack_require__("./node_modules/warning/browser.js");

var _warning2 = _interopRequireDefault(_warning);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function capitalizeFirstLetter(string) {
   true ? (0, _warning2.default)(typeof string === 'string', 'Material-UI: capitalizeFirstLetter(string) expects a string argument.') : void 0;

  return string.charAt(0).toUpperCase() + string.slice(1);
} //  weak

function contains(obj, pred) {
  return (0, _keys2.default)(pred).every(function (key) {
    return obj.hasOwnProperty(key) && obj[key] === pred[key];
  });
}

function findIndex(arr, pred) {
  var predType = typeof pred === 'undefined' ? 'undefined' : (0, _typeof3.default)(pred);
  for (var i = 0; i < arr.length; i += 1) {
    if (predType === 'function' && !!pred(arr[i], i, arr) === true) {
      return i;
    }
    if (predType === 'object' && contains(arr[i], pred)) {
      return i;
    }
    if (['string', 'number', 'boolean'].indexOf(predType) !== -1) {
      return arr.indexOf(pred);
    }
  }
  return -1;
}

function find(arr, pred) {
  var index = findIndex(arr, pred);
  return index > -1 ? arr[index] : undefined;
}

/**
 * Safe chained function
 *
 * Will only create a new function if needed,
 * otherwise will pass back existing functions or null.
 *
 * @param {function} functions to chain
 * @returns {function|null}
 */
function createChainedFunction() {
  for (var _len = arguments.length, funcs = Array(_len), _key = 0; _key < _len; _key++) {
    funcs[_key] = arguments[_key];
  }

  return funcs.filter(function (func) {
    return func != null;
  }).reduce(function (acc, func) {
     true ? (0, _warning2.default)(typeof func === 'function', 'Material-UI: invalid Argument Type, must only provide functions, undefined, or null.') : void 0;

    if (acc === null) {
      return func;
    }

    return function chainedFunction() {
      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      acc.apply(this, args);
      func.apply(this, args);
    };
  }, null);
}

/***/ }),

/***/ "./node_modules/material-ui/utils/keyboardFocus.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.focusKeyPressed = focusKeyPressed;
exports.detectKeyboardFocus = detectKeyboardFocus;
exports.listenForFocusKeys = listenForFocusKeys;

var _keycode = __webpack_require__("./node_modules/keycode/index.js");

var _keycode2 = _interopRequireDefault(_keycode);

var _contains = __webpack_require__("./node_modules/dom-helpers/query/contains.js");

var _contains2 = _interopRequireDefault(_contains);

var _addEventListener = __webpack_require__("./node_modules/material-ui/utils/addEventListener.js");

var _addEventListener2 = _interopRequireDefault(_addEventListener);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FOCUS_KEYS = ['tab', 'enter', 'space', 'esc', 'up', 'down', 'left', 'right']; //  weak

var internal = {
  listening: false,
  focusKeyPressed: false
};

function isFocusKey(event) {
  return FOCUS_KEYS.indexOf((0, _keycode2.default)(event)) !== -1;
}

function focusKeyPressed(pressed) {
  if (typeof pressed !== 'undefined') {
    internal.focusKeyPressed = Boolean(pressed);
  }

  return internal.focusKeyPressed;
}

function detectKeyboardFocus(instance, element, cb) {
  var attempt = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;

  instance.keyboardFocusTimeout = setTimeout(function () {
    if (focusKeyPressed() && (document.activeElement === element || (0, _contains2.default)(element, document.activeElement))) {
      cb();
    } else if (attempt < instance.keyboardFocusMaxCheckTimes) {
      detectKeyboardFocus(instance, element, cb, attempt + 1);
    }
  }, instance.keyboardFocusCheckTime);
}

function listenForFocusKeys() {
  if (!internal.listening) {
    (0, _addEventListener2.default)(window, 'keyup', function (event) {
      if (isFocusKey(event)) {
        internal.focusKeyPressed = true;
      }
    });
    internal.listening = true;
  }
}

/***/ }),

/***/ "./node_modules/material-ui/utils/reactHelpers.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cloneChildrenWithClassName = cloneChildrenWithClassName;
exports.isMuiComponent = isMuiComponent;

var _react = __webpack_require__("./node_modules/react/react.js");

function cloneChildrenWithClassName(children, className) {
  return _react.Children.map(children, function (child) {
    return (0, _react.isValidElement)(child) && (0, _react.cloneElement)(child, {
      className: child.props.hasOwnProperty('className') ? child.props.className + ' ' + className : className
    });
  });
} //  weak
/* eslint-disable import/prefer-default-export */

function isMuiComponent(element, muiName) {
  return (0, _react.isValidElement)(element) && element.type.muiName === muiName;
}

/***/ }),

/***/ "./node_modules/react-event-listener/lib/define-property.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty = __webpack_require__("./node_modules/babel-runtime/core-js/object/define-property.js");

var _defineProperty2 = _interopRequireDefault(_defineProperty);

exports.default = defineProperty;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//  weak

function defineProperty(o, p, attr) {
  return (0, _defineProperty2.default)(o, p, attr);
}

/***/ }),

/***/ "./node_modules/react-event-listener/lib/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = __webpack_require__("./node_modules/babel-runtime/core-js/object/get-prototype-of.js");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__("./node_modules/babel-runtime/helpers/classCallCheck.js");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__("./node_modules/babel-runtime/helpers/createClass.js");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__("./node_modules/babel-runtime/helpers/possibleConstructorReturn.js");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__("./node_modules/babel-runtime/helpers/inherits.js");

var _inherits3 = _interopRequireDefault(_inherits2);

var _typeof2 = __webpack_require__("./node_modules/babel-runtime/helpers/typeof.js");

var _typeof3 = _interopRequireDefault(_typeof2);

var _keys = __webpack_require__("./node_modules/babel-runtime/core-js/object/keys.js");

var _keys2 = _interopRequireDefault(_keys);

var _objectWithoutProperties2 = __webpack_require__("./node_modules/babel-runtime/helpers/objectWithoutProperties.js");

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _assign = __webpack_require__("./node_modules/babel-runtime/core-js/object/assign.js");

var _assign2 = _interopRequireDefault(_assign);

exports.withOptions = withOptions;

var _react = __webpack_require__("./node_modules/react/react.js");

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__("./node_modules/prop-types/index.js");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _shallowEqual = __webpack_require__("./node_modules/fbjs/lib/shallowEqual.js");

var _shallowEqual2 = _interopRequireDefault(_shallowEqual);

var _warning = __webpack_require__("./node_modules/warning/browser.js");

var _warning2 = _interopRequireDefault(_warning);

var _supports = __webpack_require__("./node_modules/react-event-listener/lib/supports.js");

var supports = _interopRequireWildcard(_supports);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultEventOptions = {
  capture: false,
  passive: false
};
/* eslint-disable prefer-spread */

function mergeDefaultEventOptions(options) {
  return (0, _assign2.default)({}, defaultEventOptions, options);
}

function getEventListenerArgs(eventName, callback, options) {
  var args = [eventName, callback];
  args.push(supports.passiveOption ? options : options.capture);
  return args;
}

function on(target, eventName, callback, options) {
  if (supports.addEventListener) {
    target.addEventListener.apply(target, getEventListenerArgs(eventName, callback, options));
  } else if (supports.attachEvent) {
    // IE8+ Support
    target.attachEvent('on' + eventName, function () {
      callback.call(target);
    });
  }
}

function off(target, eventName, callback, options) {
  if (supports.removeEventListener) {
    target.removeEventListener.apply(target, getEventListenerArgs(eventName, callback, options));
  } else if (supports.detachEvent) {
    // IE8+ Support
    target.detachEvent('on' + eventName, callback);
  }
}

function forEachListener(props, iteratee) {
  var children = props.children,
      target = props.target,
      eventProps = (0, _objectWithoutProperties3.default)(props, ['children', 'target']);


  (0, _keys2.default)(eventProps).forEach(function (name) {
    if (name.substring(0, 2) !== 'on') {
      return;
    }

    var prop = eventProps[name];
    var type = typeof prop === 'undefined' ? 'undefined' : (0, _typeof3.default)(prop);
    var isObject = type === 'object';
    var isFunction = type === 'function';

    if (!isObject && !isFunction) {
      return;
    }

    var capture = name.substr(-7).toLowerCase() === 'capture';
    var eventName = name.substring(2).toLowerCase();
    eventName = capture ? eventName.substring(0, eventName.length - 7) : eventName;

    if (isObject) {
      iteratee(eventName, prop.handler, prop.options);
    } else {
      iteratee(eventName, prop, mergeDefaultEventOptions({ capture: capture }));
    }
  });
}

function withOptions(handler, options) {
   true ? (0, _warning2.default)(options, 'react-event-listener: Should be specified options in withOptions.') : void 0;

  return {
    handler: handler,
    options: mergeDefaultEventOptions(options)
  };
}

var EventListener = function (_Component) {
  (0, _inherits3.default)(EventListener, _Component);

  function EventListener() {
    (0, _classCallCheck3.default)(this, EventListener);
    return (0, _possibleConstructorReturn3.default)(this, (EventListener.__proto__ || (0, _getPrototypeOf2.default)(EventListener)).apply(this, arguments));
  }

  (0, _createClass3.default)(EventListener, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.addListeners();
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      return !(0, _shallowEqual2.default)(this.props, nextProps);
    }
  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate() {
      this.removeListeners();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.addListeners();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.removeListeners();
    }
  }, {
    key: 'addListeners',
    value: function addListeners() {
      this.applyListeners(on);
    }
  }, {
    key: 'removeListeners',
    value: function removeListeners() {
      this.applyListeners(off);
    }
  }, {
    key: 'applyListeners',
    value: function applyListeners(onOrOff) {
      var target = this.props.target;


      if (target) {
        var element = target;

        if (typeof target === 'string') {
          element = window[target];
        }

        forEachListener(this.props, onOrOff.bind(null, element));
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return this.props.children || null;
    }
  }]);
  return EventListener;
}(_react.Component);

 true ? EventListener.propTypes = {
  /**
   * You can provide a single child too.
   */
  children: _propTypes2.default.element,
  /**
   * The DOM target to listen to.
   */
  target: _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.string]).isRequired
} : void 0;
exports.default = EventListener;

/***/ }),

/***/ "./node_modules/react-event-listener/lib/supports.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.passiveOption = exports.detachEvent = exports.attachEvent = exports.removeEventListener = exports.addEventListener = exports.canUseDOM = undefined;

var _defineProperty = __webpack_require__("./node_modules/react-event-listener/lib/define-property.js");

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Inspired by https://github.com/facebook/fbjs/blob/master/packages/fbjs/src/core/ExecutionEnvironment.js
var canUseDOM = exports.canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

var addEventListener = exports.addEventListener = canUseDOM && 'addEventListener' in window;
var removeEventListener = exports.removeEventListener = canUseDOM && 'removeEventListener' in window;

// IE8+ Support
var attachEvent = exports.attachEvent = canUseDOM && 'attachEvent' in window;
var detachEvent = exports.detachEvent = canUseDOM && 'detachEvent' in window;

// Passive options
// Inspired by https://github.com/Modernizr/Modernizr/blob/master/feature-detects/dom/passiveeventlisteners.js
var passiveOption = exports.passiveOption = function () {
  var cache = null;

  return function () {
    if (cache !== null) {
      return cache;
    }

    var supportsPassiveOption = false;

    try {
      window.addEventListener('test', null, (0, _defineProperty2.default)({}, 'passive', {
        get: function get() {
          supportsPassiveOption = true;
        }
      }));
    } catch (e) {} // eslint-disable-line no-empty

    cache = supportsPassiveOption;

    return supportsPassiveOption;
  }();
}();

/***/ }),

/***/ "./node_modules/react-helmet/lib/Helmet.js":
/***/ (function(module, exports, __webpack_require__) {

exports.__esModule = true;
exports.Helmet = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__("./node_modules/react/react.js");

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__("./node_modules/prop-types/index.js");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactSideEffect = __webpack_require__("./node_modules/react-side-effect/lib/index.js");

var _reactSideEffect2 = _interopRequireDefault(_reactSideEffect);

var _deepEqual = __webpack_require__("./node_modules/deep-equal/index.js");

var _deepEqual2 = _interopRequireDefault(_deepEqual);

var _HelmetUtils = __webpack_require__("./node_modules/react-helmet/lib/HelmetUtils.js");

var _HelmetConstants = __webpack_require__("./node_modules/react-helmet/lib/HelmetConstants.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Helmet = function Helmet(Component) {
    var _class, _temp;

    return _temp = _class = function (_React$Component) {
        _inherits(HelmetWrapper, _React$Component);

        function HelmetWrapper() {
            _classCallCheck(this, HelmetWrapper);

            return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
        }

        HelmetWrapper.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
            return !(0, _deepEqual2.default)(this.props, nextProps);
        };

        HelmetWrapper.prototype.mapNestedChildrenToProps = function mapNestedChildrenToProps(child, nestedChildren) {
            if (!nestedChildren) {
                return null;
            }

            switch (child.type) {
                case _HelmetConstants.TAG_NAMES.SCRIPT:
                case _HelmetConstants.TAG_NAMES.NOSCRIPT:
                    return {
                        innerHTML: nestedChildren
                    };

                case _HelmetConstants.TAG_NAMES.STYLE:
                    return {
                        cssText: nestedChildren
                    };
            }

            throw new Error("<" + child.type + " /> elements are self-closing and can not contain children. Refer to our API for more information.");
        };

        HelmetWrapper.prototype.flattenArrayTypeChildren = function flattenArrayTypeChildren(_ref) {
            var _extends2;

            var child = _ref.child,
                arrayTypeChildren = _ref.arrayTypeChildren,
                newChildProps = _ref.newChildProps,
                nestedChildren = _ref.nestedChildren;

            return _extends({}, arrayTypeChildren, (_extends2 = {}, _extends2[child.type] = [].concat(arrayTypeChildren[child.type] || [], [_extends({}, newChildProps, this.mapNestedChildrenToProps(child, nestedChildren))]), _extends2));
        };

        HelmetWrapper.prototype.mapObjectTypeChildren = function mapObjectTypeChildren(_ref2) {
            var _extends3, _extends4;

            var child = _ref2.child,
                newProps = _ref2.newProps,
                newChildProps = _ref2.newChildProps,
                nestedChildren = _ref2.nestedChildren;

            switch (child.type) {
                case _HelmetConstants.TAG_NAMES.TITLE:
                    return _extends({}, newProps, (_extends3 = {}, _extends3[child.type] = nestedChildren, _extends3.titleAttributes = _extends({}, newChildProps), _extends3));

                case _HelmetConstants.TAG_NAMES.BODY:
                    return _extends({}, newProps, {
                        bodyAttributes: _extends({}, newChildProps)
                    });

                case _HelmetConstants.TAG_NAMES.HTML:
                    return _extends({}, newProps, {
                        htmlAttributes: _extends({}, newChildProps)
                    });
            }

            return _extends({}, newProps, (_extends4 = {}, _extends4[child.type] = _extends({}, newChildProps), _extends4));
        };

        HelmetWrapper.prototype.mapArrayTypeChildrenToProps = function mapArrayTypeChildrenToProps(arrayTypeChildren, newProps) {
            var newFlattenedProps = _extends({}, newProps);

            Object.keys(arrayTypeChildren).forEach(function (arrayChildName) {
                var _extends5;

                newFlattenedProps = _extends({}, newFlattenedProps, (_extends5 = {}, _extends5[arrayChildName] = arrayTypeChildren[arrayChildName], _extends5));
            });

            return newFlattenedProps;
        };

        HelmetWrapper.prototype.warnOnInvalidChildren = function warnOnInvalidChildren(child, nestedChildren) {
            if (true) {
                if (!_HelmetConstants.VALID_TAG_NAMES.some(function (name) {
                    return child.type === name;
                })) {
                    if (typeof child.type === "function") {
                        return (0, _HelmetUtils.warn)("You may be attempting to nest <Helmet> components within each other, which is not allowed. Refer to our API for more information.");
                    }

                    return (0, _HelmetUtils.warn)("Only elements types " + _HelmetConstants.VALID_TAG_NAMES.join(", ") + " are allowed. Helmet does not support rendering <" + child.type + "> elements. Refer to our API for more information.");
                }

                if (nestedChildren && typeof nestedChildren !== "string" && (!Array.isArray(nestedChildren) || nestedChildren.some(function (nestedChild) {
                    return typeof nestedChild !== "string";
                }))) {
                    throw new Error("Helmet expects a string as a child of <" + child.type + ">. Did you forget to wrap your children in braces? ( <" + child.type + ">{``}</" + child.type + "> ) Refer to our API for more information.");
                }
            }

            return true;
        };

        HelmetWrapper.prototype.mapChildrenToProps = function mapChildrenToProps(children, newProps) {
            var _this2 = this;

            var arrayTypeChildren = {};

            _react2.default.Children.forEach(children, function (child) {
                if (!child || !child.props) {
                    return;
                }

                var _child$props = child.props,
                    nestedChildren = _child$props.children,
                    childProps = _objectWithoutProperties(_child$props, ["children"]);

                var newChildProps = (0, _HelmetUtils.convertReactPropstoHtmlAttributes)(childProps);

                _this2.warnOnInvalidChildren(child, nestedChildren);

                switch (child.type) {
                    case _HelmetConstants.TAG_NAMES.LINK:
                    case _HelmetConstants.TAG_NAMES.META:
                    case _HelmetConstants.TAG_NAMES.NOSCRIPT:
                    case _HelmetConstants.TAG_NAMES.SCRIPT:
                    case _HelmetConstants.TAG_NAMES.STYLE:
                        arrayTypeChildren = _this2.flattenArrayTypeChildren({
                            child: child,
                            arrayTypeChildren: arrayTypeChildren,
                            newChildProps: newChildProps,
                            nestedChildren: nestedChildren
                        });
                        break;

                    default:
                        newProps = _this2.mapObjectTypeChildren({
                            child: child,
                            newProps: newProps,
                            newChildProps: newChildProps,
                            nestedChildren: nestedChildren
                        });
                        break;
                }
            });

            newProps = this.mapArrayTypeChildrenToProps(arrayTypeChildren, newProps);
            return newProps;
        };

        HelmetWrapper.prototype.render = function render() {
            var _props = this.props,
                children = _props.children,
                props = _objectWithoutProperties(_props, ["children"]);

            var newProps = _extends({}, props);

            if (children) {
                newProps = this.mapChildrenToProps(children, newProps);
            }

            return _react2.default.createElement(Component, newProps);
        };

        _createClass(HelmetWrapper, null, [{
            key: "canUseDOM",


            // Component.peek comes from react-side-effect:
            // For testing, you may use a static peek() method available on the returned component.
            // It lets you get the current state without resetting the mounted instance stack.
            // Don’t use it for anything other than testing.

            /**
             * @param {Object} base: {"target": "_blank", "href": "http://mysite.com/"}
             * @param {Object} bodyAttributes: {"className": "root"}
             * @param {String} defaultTitle: "Default Title"
             * @param {Boolean} encodeSpecialCharacters: true
             * @param {Object} htmlAttributes: {"lang": "en", "amp": undefined}
             * @param {Array} link: [{"rel": "canonical", "href": "http://mysite.com/example"}]
             * @param {Array} meta: [{"name": "description", "content": "Test description"}]
             * @param {Array} noscript: [{"innerHTML": "<img src='http://mysite.com/js/test.js'"}]
             * @param {Function} onChangeClientState: "(newState) => console.log(newState)"
             * @param {Array} script: [{"type": "text/javascript", "src": "http://mysite.com/js/test.js"}]
             * @param {Array} style: [{"type": "text/css", "cssText": "div { display: block; color: blue; }"}]
             * @param {String} title: "Title"
             * @param {Object} titleAttributes: {"itemprop": "name"}
             * @param {String} titleTemplate: "MySite.com - %s"
             */
            set: function set(canUseDOM) {
                Component.canUseDOM = canUseDOM;
            }
        }]);

        return HelmetWrapper;
    }(_react2.default.Component), _class.propTypes = {
        base: _propTypes2.default.object,
        bodyAttributes: _propTypes2.default.object,
        children: _propTypes2.default.oneOfType([_propTypes2.default.arrayOf(_propTypes2.default.node), _propTypes2.default.node]),
        defaultTitle: _propTypes2.default.string,
        encodeSpecialCharacters: _propTypes2.default.bool,
        htmlAttributes: _propTypes2.default.object,
        link: _propTypes2.default.arrayOf(_propTypes2.default.object),
        meta: _propTypes2.default.arrayOf(_propTypes2.default.object),
        noscript: _propTypes2.default.arrayOf(_propTypes2.default.object),
        onChangeClientState: _propTypes2.default.func,
        script: _propTypes2.default.arrayOf(_propTypes2.default.object),
        style: _propTypes2.default.arrayOf(_propTypes2.default.object),
        title: _propTypes2.default.string,
        titleAttributes: _propTypes2.default.object,
        titleTemplate: _propTypes2.default.string
    }, _class.defaultProps = {
        encodeSpecialCharacters: true
    }, _class.peek = Component.peek, _class.rewind = function () {
        var mappedState = Component.rewind();
        if (!mappedState) {
            // provide fallback if mappedState is undefined
            mappedState = (0, _HelmetUtils.mapStateOnServer)({
                baseTag: [],
                bodyAttributes: {},
                encodeSpecialCharacters: true,
                htmlAttributes: {},
                linkTags: [],
                metaTags: [],
                noscriptTags: [],
                scriptTags: [],
                styleTags: [],
                title: "",
                titleAttributes: {}
            });
        }

        return mappedState;
    }, _temp;
};

var NullComponent = function NullComponent() {
    return null;
};

var HelmetSideEffects = (0, _reactSideEffect2.default)(_HelmetUtils.reducePropsToState, _HelmetUtils.handleClientStateChange, _HelmetUtils.mapStateOnServer)(NullComponent);

var HelmetExport = Helmet(HelmetSideEffects);
HelmetExport.renderStatic = HelmetExport.rewind;

exports.Helmet = HelmetExport;
exports.default = HelmetExport;

/***/ }),

/***/ "./node_modules/react-helmet/lib/HelmetConstants.js":
/***/ (function(module, exports) {

exports.__esModule = true;
var ATTRIBUTE_NAMES = exports.ATTRIBUTE_NAMES = {
    BODY: "bodyAttributes",
    HTML: "htmlAttributes",
    TITLE: "titleAttributes"
};

var TAG_NAMES = exports.TAG_NAMES = {
    BASE: "base",
    BODY: "body",
    HEAD: "head",
    HTML: "html",
    LINK: "link",
    META: "meta",
    NOSCRIPT: "noscript",
    SCRIPT: "script",
    STYLE: "style",
    TITLE: "title"
};

var VALID_TAG_NAMES = exports.VALID_TAG_NAMES = Object.keys(TAG_NAMES).map(function (name) {
    return TAG_NAMES[name];
});

var TAG_PROPERTIES = exports.TAG_PROPERTIES = {
    CHARSET: "charset",
    CSS_TEXT: "cssText",
    HREF: "href",
    HTTPEQUIV: "http-equiv",
    INNER_HTML: "innerHTML",
    ITEM_PROP: "itemprop",
    NAME: "name",
    PROPERTY: "property",
    REL: "rel",
    SRC: "src"
};

var REACT_TAG_MAP = exports.REACT_TAG_MAP = {
    "accesskey": "accessKey",
    "charset": "charSet",
    "class": "className",
    "contenteditable": "contentEditable",
    "contextmenu": "contextMenu",
    "http-equiv": "httpEquiv",
    "itemprop": "itemProp",
    "tabindex": "tabIndex"
};

var HELMET_PROPS = exports.HELMET_PROPS = {
    DEFAULT_TITLE: "defaultTitle",
    ENCODE_SPECIAL_CHARACTERS: "encodeSpecialCharacters",
    ON_CHANGE_CLIENT_STATE: "onChangeClientState",
    TITLE_TEMPLATE: "titleTemplate"
};

var HTML_TAG_MAP = exports.HTML_TAG_MAP = Object.keys(REACT_TAG_MAP).reduce(function (obj, key) {
    obj[REACT_TAG_MAP[key]] = key;
    return obj;
}, {});

var SELF_CLOSING_TAGS = exports.SELF_CLOSING_TAGS = [TAG_NAMES.NOSCRIPT, TAG_NAMES.SCRIPT, TAG_NAMES.STYLE];

var HELMET_ATTRIBUTE = exports.HELMET_ATTRIBUTE = "data-react-helmet";

/***/ }),

/***/ "./node_modules/react-helmet/lib/HelmetUtils.js":
/***/ (function(module, exports, __webpack_require__) {

exports.__esModule = true;
exports.warn = exports.requestIdleCallback = exports.reducePropsToState = exports.mapStateOnServer = exports.handleClientStateChange = exports.convertReactPropstoHtmlAttributes = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__("./node_modules/react/react.js");

var _react2 = _interopRequireDefault(_react);

var _objectAssign = __webpack_require__("./node_modules/object-assign/index.js");

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var _HelmetConstants = __webpack_require__("./node_modules/react-helmet/lib/HelmetConstants.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var encodeSpecialCharacters = function encodeSpecialCharacters(str) {
    var encode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    if (encode === false) {
        return String(str);
    }

    return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;");
};

var getTitleFromPropsList = function getTitleFromPropsList(propsList) {
    var innermostTitle = getInnermostProperty(propsList, _HelmetConstants.TAG_NAMES.TITLE);
    var innermostTemplate = getInnermostProperty(propsList, _HelmetConstants.HELMET_PROPS.TITLE_TEMPLATE);

    if (innermostTemplate && innermostTitle) {
        // use function arg to avoid need to escape $ characters
        return innermostTemplate.replace(/%s/g, function () {
            return innermostTitle;
        });
    }

    var innermostDefaultTitle = getInnermostProperty(propsList, _HelmetConstants.HELMET_PROPS.DEFAULT_TITLE);

    return innermostTitle || innermostDefaultTitle || undefined;
};

var getOnChangeClientState = function getOnChangeClientState(propsList) {
    return getInnermostProperty(propsList, _HelmetConstants.HELMET_PROPS.ON_CHANGE_CLIENT_STATE) || function () {};
};

var getAttributesFromPropsList = function getAttributesFromPropsList(tagType, propsList) {
    return propsList.filter(function (props) {
        return typeof props[tagType] !== "undefined";
    }).map(function (props) {
        return props[tagType];
    }).reduce(function (tagAttrs, current) {
        return _extends({}, tagAttrs, current);
    }, {});
};

var getBaseTagFromPropsList = function getBaseTagFromPropsList(primaryAttributes, propsList) {
    return propsList.filter(function (props) {
        return typeof props[_HelmetConstants.TAG_NAMES.BASE] !== "undefined";
    }).map(function (props) {
        return props[_HelmetConstants.TAG_NAMES.BASE];
    }).reverse().reduce(function (innermostBaseTag, tag) {
        if (!innermostBaseTag.length) {
            var keys = Object.keys(tag);

            for (var i = 0; i < keys.length; i++) {
                var attributeKey = keys[i];
                var lowerCaseAttributeKey = attributeKey.toLowerCase();

                if (primaryAttributes.indexOf(lowerCaseAttributeKey) !== -1 && tag[lowerCaseAttributeKey]) {
                    return innermostBaseTag.concat(tag);
                }
            }
        }

        return innermostBaseTag;
    }, []);
};

var getTagsFromPropsList = function getTagsFromPropsList(tagName, primaryAttributes, propsList) {
    // Calculate list of tags, giving priority innermost component (end of the propslist)
    var approvedSeenTags = {};

    return propsList.filter(function (props) {
        if (Array.isArray(props[tagName])) {
            return true;
        }
        if (typeof props[tagName] !== "undefined") {
            warn("Helmet: " + tagName + " should be of type \"Array\". Instead found type \"" + _typeof(props[tagName]) + "\"");
        }
        return false;
    }).map(function (props) {
        return props[tagName];
    }).reverse().reduce(function (approvedTags, instanceTags) {
        var instanceSeenTags = {};

        instanceTags.filter(function (tag) {
            var primaryAttributeKey = void 0;
            var keys = Object.keys(tag);
            for (var i = 0; i < keys.length; i++) {
                var attributeKey = keys[i];
                var lowerCaseAttributeKey = attributeKey.toLowerCase();

                // Special rule with link tags, since rel and href are both primary tags, rel takes priority
                if (primaryAttributes.indexOf(lowerCaseAttributeKey) !== -1 && !(primaryAttributeKey === _HelmetConstants.TAG_PROPERTIES.REL && tag[primaryAttributeKey].toLowerCase() === "canonical") && !(lowerCaseAttributeKey === _HelmetConstants.TAG_PROPERTIES.REL && tag[lowerCaseAttributeKey].toLowerCase() === "stylesheet")) {
                    primaryAttributeKey = lowerCaseAttributeKey;
                }
                // Special case for innerHTML which doesn't work lowercased
                if (primaryAttributes.indexOf(attributeKey) !== -1 && (attributeKey === _HelmetConstants.TAG_PROPERTIES.INNER_HTML || attributeKey === _HelmetConstants.TAG_PROPERTIES.CSS_TEXT || attributeKey === _HelmetConstants.TAG_PROPERTIES.ITEM_PROP)) {
                    primaryAttributeKey = attributeKey;
                }
            }

            if (!primaryAttributeKey || !tag[primaryAttributeKey]) {
                return false;
            }

            var value = tag[primaryAttributeKey].toLowerCase();

            if (!approvedSeenTags[primaryAttributeKey]) {
                approvedSeenTags[primaryAttributeKey] = {};
            }

            if (!instanceSeenTags[primaryAttributeKey]) {
                instanceSeenTags[primaryAttributeKey] = {};
            }

            if (!approvedSeenTags[primaryAttributeKey][value]) {
                instanceSeenTags[primaryAttributeKey][value] = true;
                return true;
            }

            return false;
        }).reverse().forEach(function (tag) {
            return approvedTags.push(tag);
        });

        // Update seen tags with tags from this instance
        var keys = Object.keys(instanceSeenTags);
        for (var i = 0; i < keys.length; i++) {
            var attributeKey = keys[i];
            var tagUnion = (0, _objectAssign2.default)({}, approvedSeenTags[attributeKey], instanceSeenTags[attributeKey]);

            approvedSeenTags[attributeKey] = tagUnion;
        }

        return approvedTags;
    }, []).reverse();
};

var getInnermostProperty = function getInnermostProperty(propsList, property) {
    for (var i = propsList.length - 1; i >= 0; i--) {
        var props = propsList[i];

        if (props.hasOwnProperty(property)) {
            return props[property];
        }
    }

    return null;
};

var reducePropsToState = function reducePropsToState(propsList) {
    return {
        baseTag: getBaseTagFromPropsList([_HelmetConstants.TAG_PROPERTIES.HREF], propsList),
        bodyAttributes: getAttributesFromPropsList(_HelmetConstants.ATTRIBUTE_NAMES.BODY, propsList),
        encode: getInnermostProperty(propsList, _HelmetConstants.HELMET_PROPS.ENCODE_SPECIAL_CHARACTERS),
        htmlAttributes: getAttributesFromPropsList(_HelmetConstants.ATTRIBUTE_NAMES.HTML, propsList),
        linkTags: getTagsFromPropsList(_HelmetConstants.TAG_NAMES.LINK, [_HelmetConstants.TAG_PROPERTIES.REL, _HelmetConstants.TAG_PROPERTIES.HREF], propsList),
        metaTags: getTagsFromPropsList(_HelmetConstants.TAG_NAMES.META, [_HelmetConstants.TAG_PROPERTIES.NAME, _HelmetConstants.TAG_PROPERTIES.CHARSET, _HelmetConstants.TAG_PROPERTIES.HTTPEQUIV, _HelmetConstants.TAG_PROPERTIES.PROPERTY, _HelmetConstants.TAG_PROPERTIES.ITEM_PROP], propsList),
        noscriptTags: getTagsFromPropsList(_HelmetConstants.TAG_NAMES.NOSCRIPT, [_HelmetConstants.TAG_PROPERTIES.INNER_HTML], propsList),
        onChangeClientState: getOnChangeClientState(propsList),
        scriptTags: getTagsFromPropsList(_HelmetConstants.TAG_NAMES.SCRIPT, [_HelmetConstants.TAG_PROPERTIES.SRC, _HelmetConstants.TAG_PROPERTIES.INNER_HTML], propsList),
        styleTags: getTagsFromPropsList(_HelmetConstants.TAG_NAMES.STYLE, [_HelmetConstants.TAG_PROPERTIES.CSS_TEXT], propsList),
        title: getTitleFromPropsList(propsList),
        titleAttributes: getAttributesFromPropsList(_HelmetConstants.ATTRIBUTE_NAMES.TITLE, propsList)
    };
};

var requestIdleCallback = function () {
    if (typeof window !== "undefined" && typeof window.requestIdleCallback !== "undefined") {
        return window.requestIdleCallback;
    }

    return function (cb) {
        var start = Date.now();
        return setTimeout(function () {
            cb({
                didTimeout: false,
                timeRemaining: function timeRemaining() {
                    return Math.max(0, 50 - (Date.now() - start));
                }
            });
        }, 1);
    };
}();

var cancelIdleCallback = function () {
    if (typeof window !== "undefined" && typeof window.cancelIdleCallback !== "undefined") {
        return window.cancelIdleCallback;
    }

    return function (id) {
        return clearTimeout(id);
    };
}();

var warn = function warn(msg) {
    return console && typeof console.warn === "function" && console.warn(msg);
};

var _helmetIdleCallback = null;

var handleClientStateChange = function handleClientStateChange(newState) {
    var baseTag = newState.baseTag,
        bodyAttributes = newState.bodyAttributes,
        htmlAttributes = newState.htmlAttributes,
        linkTags = newState.linkTags,
        metaTags = newState.metaTags,
        noscriptTags = newState.noscriptTags,
        onChangeClientState = newState.onChangeClientState,
        scriptTags = newState.scriptTags,
        styleTags = newState.styleTags,
        title = newState.title,
        titleAttributes = newState.titleAttributes;


    if (_helmetIdleCallback) {
        cancelIdleCallback(_helmetIdleCallback);
    }

    _helmetIdleCallback = requestIdleCallback(function () {
        updateAttributes(_HelmetConstants.TAG_NAMES.BODY, bodyAttributes);
        updateAttributes(_HelmetConstants.TAG_NAMES.HTML, htmlAttributes);

        updateTitle(title, titleAttributes);

        var tagUpdates = {
            baseTag: updateTags(_HelmetConstants.TAG_NAMES.BASE, baseTag),
            linkTags: updateTags(_HelmetConstants.TAG_NAMES.LINK, linkTags),
            metaTags: updateTags(_HelmetConstants.TAG_NAMES.META, metaTags),
            noscriptTags: updateTags(_HelmetConstants.TAG_NAMES.NOSCRIPT, noscriptTags),
            scriptTags: updateTags(_HelmetConstants.TAG_NAMES.SCRIPT, scriptTags),
            styleTags: updateTags(_HelmetConstants.TAG_NAMES.STYLE, styleTags)
        };

        var addedTags = {};
        var removedTags = {};

        Object.keys(tagUpdates).forEach(function (tagType) {
            var _tagUpdates$tagType = tagUpdates[tagType],
                newTags = _tagUpdates$tagType.newTags,
                oldTags = _tagUpdates$tagType.oldTags;


            if (newTags.length) {
                addedTags[tagType] = newTags;
            }
            if (oldTags.length) {
                removedTags[tagType] = tagUpdates[tagType].oldTags;
            }
        });

        _helmetIdleCallback = null;
        onChangeClientState(newState, addedTags, removedTags);
    });
};

var updateTitle = function updateTitle(title, attributes) {
    if (typeof title !== "undefined" && document.title !== title) {
        document.title = Array.isArray(title) ? title.join("") : title;
    }

    updateAttributes(_HelmetConstants.TAG_NAMES.TITLE, attributes);
};

var updateAttributes = function updateAttributes(tagName, attributes) {
    var elementTag = document.getElementsByTagName(tagName)[0];

    if (!elementTag) {
        return;
    }

    var helmetAttributeString = elementTag.getAttribute(_HelmetConstants.HELMET_ATTRIBUTE);
    var helmetAttributes = helmetAttributeString ? helmetAttributeString.split(",") : [];
    var attributesToRemove = [].concat(helmetAttributes);
    var attributeKeys = Object.keys(attributes);

    for (var i = 0; i < attributeKeys.length; i++) {
        var attribute = attributeKeys[i];
        var value = attributes[attribute] || "";

        if (elementTag.getAttribute(attribute) !== value) {
            elementTag.setAttribute(attribute, value);
        }

        if (helmetAttributes.indexOf(attribute) === -1) {
            helmetAttributes.push(attribute);
        }

        var indexToSave = attributesToRemove.indexOf(attribute);
        if (indexToSave !== -1) {
            attributesToRemove.splice(indexToSave, 1);
        }
    }

    for (var _i = attributesToRemove.length - 1; _i >= 0; _i--) {
        elementTag.removeAttribute(attributesToRemove[_i]);
    }

    if (helmetAttributes.length === attributesToRemove.length) {
        elementTag.removeAttribute(_HelmetConstants.HELMET_ATTRIBUTE);
    } else if (elementTag.getAttribute(_HelmetConstants.HELMET_ATTRIBUTE) !== attributeKeys.join(",")) {
        elementTag.setAttribute(_HelmetConstants.HELMET_ATTRIBUTE, attributeKeys.join(","));
    }
};

var updateTags = function updateTags(type, tags) {
    var headElement = document.head || document.querySelector(_HelmetConstants.TAG_NAMES.HEAD);
    var tagNodes = headElement.querySelectorAll(type + "[" + _HelmetConstants.HELMET_ATTRIBUTE + "]");
    var oldTags = Array.prototype.slice.call(tagNodes);
    var newTags = [];
    var indexToDelete = void 0;

    if (tags && tags.length) {
        tags.forEach(function (tag) {
            var newElement = document.createElement(type);

            for (var attribute in tag) {
                if (tag.hasOwnProperty(attribute)) {
                    if (attribute === _HelmetConstants.TAG_PROPERTIES.INNER_HTML) {
                        newElement.innerHTML = tag.innerHTML;
                    } else if (attribute === _HelmetConstants.TAG_PROPERTIES.CSS_TEXT) {
                        if (newElement.styleSheet) {
                            newElement.styleSheet.cssText = tag.cssText;
                        } else {
                            newElement.appendChild(document.createTextNode(tag.cssText));
                        }
                    } else {
                        var value = typeof tag[attribute] === "undefined" ? "" : tag[attribute];
                        newElement.setAttribute(attribute, value);
                    }
                }
            }

            newElement.setAttribute(_HelmetConstants.HELMET_ATTRIBUTE, "true");

            // Remove a duplicate tag from domTagstoRemove, so it isn't cleared.
            if (oldTags.some(function (existingTag, index) {
                indexToDelete = index;
                return newElement.isEqualNode(existingTag);
            })) {
                oldTags.splice(indexToDelete, 1);
            } else {
                newTags.push(newElement);
            }
        });
    }

    oldTags.forEach(function (tag) {
        return tag.parentNode.removeChild(tag);
    });
    newTags.forEach(function (tag) {
        return headElement.appendChild(tag);
    });

    return {
        oldTags: oldTags,
        newTags: newTags
    };
};

var generateElementAttributesAsString = function generateElementAttributesAsString(attributes) {
    return Object.keys(attributes).reduce(function (str, key) {
        var attr = typeof attributes[key] !== "undefined" ? key + "=\"" + attributes[key] + "\"" : "" + key;
        return str ? str + " " + attr : attr;
    }, "");
};

var generateTitleAsString = function generateTitleAsString(type, title, attributes, encode) {
    var attributeString = generateElementAttributesAsString(attributes);
    return attributeString ? "<" + type + " " + _HelmetConstants.HELMET_ATTRIBUTE + "=\"true\" " + attributeString + ">" + encodeSpecialCharacters(title, encode) + "</" + type + ">" : "<" + type + " " + _HelmetConstants.HELMET_ATTRIBUTE + "=\"true\">" + encodeSpecialCharacters(title, encode) + "</" + type + ">";
};

var generateTagsAsString = function generateTagsAsString(type, tags, encode) {
    return tags.reduce(function (str, tag) {
        var attributeHtml = Object.keys(tag).filter(function (attribute) {
            return !(attribute === _HelmetConstants.TAG_PROPERTIES.INNER_HTML || attribute === _HelmetConstants.TAG_PROPERTIES.CSS_TEXT);
        }).reduce(function (string, attribute) {
            var attr = typeof tag[attribute] === "undefined" ? attribute : attribute + "=\"" + encodeSpecialCharacters(tag[attribute], encode) + "\"";
            return string ? string + " " + attr : attr;
        }, "");

        var tagContent = tag.innerHTML || tag.cssText || "";

        var isSelfClosing = _HelmetConstants.SELF_CLOSING_TAGS.indexOf(type) === -1;

        return str + "<" + type + " " + _HelmetConstants.HELMET_ATTRIBUTE + "=\"true\" " + attributeHtml + (isSelfClosing ? "/>" : ">" + tagContent + "</" + type + ">");
    }, "");
};

var convertElementAttributestoReactProps = function convertElementAttributestoReactProps(attributes) {
    var initProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return Object.keys(attributes).reduce(function (obj, key) {
        obj[_HelmetConstants.REACT_TAG_MAP[key] || key] = attributes[key];
        return obj;
    }, initProps);
};

var convertReactPropstoHtmlAttributes = function convertReactPropstoHtmlAttributes(props) {
    var initAttributes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return Object.keys(props).reduce(function (obj, key) {
        obj[_HelmetConstants.HTML_TAG_MAP[key] || key] = props[key];
        return obj;
    }, initAttributes);
};

var generateTitleAsReactComponent = function generateTitleAsReactComponent(type, title, attributes) {
    var _initProps;

    // assigning into an array to define toString function on it
    var initProps = (_initProps = {
        key: title
    }, _initProps[_HelmetConstants.HELMET_ATTRIBUTE] = true, _initProps);
    var props = convertElementAttributestoReactProps(attributes, initProps);

    return [_react2.default.createElement(_HelmetConstants.TAG_NAMES.TITLE, props, title)];
};

var generateTagsAsReactComponent = function generateTagsAsReactComponent(type, tags) {
    return tags.map(function (tag, i) {
        var _mappedTag;

        var mappedTag = (_mappedTag = {
            key: i
        }, _mappedTag[_HelmetConstants.HELMET_ATTRIBUTE] = true, _mappedTag);

        Object.keys(tag).forEach(function (attribute) {
            var mappedAttribute = _HelmetConstants.REACT_TAG_MAP[attribute] || attribute;

            if (mappedAttribute === _HelmetConstants.TAG_PROPERTIES.INNER_HTML || mappedAttribute === _HelmetConstants.TAG_PROPERTIES.CSS_TEXT) {
                var content = tag.innerHTML || tag.cssText;
                mappedTag.dangerouslySetInnerHTML = { __html: content };
            } else {
                mappedTag[mappedAttribute] = tag[attribute];
            }
        });

        return _react2.default.createElement(type, mappedTag);
    });
};

var getMethodsForTag = function getMethodsForTag(type, tags, encode) {
    switch (type) {
        case _HelmetConstants.TAG_NAMES.TITLE:
            return {
                toComponent: function toComponent() {
                    return generateTitleAsReactComponent(type, tags.title, tags.titleAttributes, encode);
                },
                toString: function toString() {
                    return generateTitleAsString(type, tags.title, tags.titleAttributes, encode);
                }
            };
        case _HelmetConstants.ATTRIBUTE_NAMES.BODY:
        case _HelmetConstants.ATTRIBUTE_NAMES.HTML:
            return {
                toComponent: function toComponent() {
                    return convertElementAttributestoReactProps(tags);
                },
                toString: function toString() {
                    return generateElementAttributesAsString(tags);
                }
            };
        default:
            return {
                toComponent: function toComponent() {
                    return generateTagsAsReactComponent(type, tags);
                },
                toString: function toString() {
                    return generateTagsAsString(type, tags, encode);
                }
            };
    }
};

var mapStateOnServer = function mapStateOnServer(_ref) {
    var baseTag = _ref.baseTag,
        bodyAttributes = _ref.bodyAttributes,
        encode = _ref.encode,
        htmlAttributes = _ref.htmlAttributes,
        linkTags = _ref.linkTags,
        metaTags = _ref.metaTags,
        noscriptTags = _ref.noscriptTags,
        scriptTags = _ref.scriptTags,
        styleTags = _ref.styleTags,
        _ref$title = _ref.title,
        title = _ref$title === undefined ? "" : _ref$title,
        titleAttributes = _ref.titleAttributes;
    return {
        base: getMethodsForTag(_HelmetConstants.TAG_NAMES.BASE, baseTag, encode),
        bodyAttributes: getMethodsForTag(_HelmetConstants.ATTRIBUTE_NAMES.BODY, bodyAttributes, encode),
        htmlAttributes: getMethodsForTag(_HelmetConstants.ATTRIBUTE_NAMES.HTML, htmlAttributes, encode),
        link: getMethodsForTag(_HelmetConstants.TAG_NAMES.LINK, linkTags, encode),
        meta: getMethodsForTag(_HelmetConstants.TAG_NAMES.META, metaTags, encode),
        noscript: getMethodsForTag(_HelmetConstants.TAG_NAMES.NOSCRIPT, noscriptTags, encode),
        script: getMethodsForTag(_HelmetConstants.TAG_NAMES.SCRIPT, scriptTags, encode),
        style: getMethodsForTag(_HelmetConstants.TAG_NAMES.STYLE, styleTags, encode),
        title: getMethodsForTag(_HelmetConstants.TAG_NAMES.TITLE, { title: title, titleAttributes: titleAttributes }, encode)
    };
};

exports.convertReactPropstoHtmlAttributes = convertReactPropstoHtmlAttributes;
exports.handleClientStateChange = handleClientStateChange;
exports.mapStateOnServer = mapStateOnServer;
exports.reducePropsToState = reducePropsToState;
exports.requestIdleCallback = requestIdleCallback;
exports.warn = warn;

/***/ }),

/***/ "./node_modules/react-side-effect/lib/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _react = __webpack_require__("./node_modules/react/react.js");

var _react2 = _interopRequireDefault(_react);

var _exenv = __webpack_require__("./node_modules/exenv/index.js");

var _exenv2 = _interopRequireDefault(_exenv);

var _shallowequal = __webpack_require__("./node_modules/shallowequal/index.js");

var _shallowequal2 = _interopRequireDefault(_shallowequal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

module.exports = function withSideEffect(reducePropsToState, handleStateChangeOnClient, mapStateOnServer) {
  if (typeof reducePropsToState !== 'function') {
    throw new Error('Expected reducePropsToState to be a function.');
  }
  if (typeof handleStateChangeOnClient !== 'function') {
    throw new Error('Expected handleStateChangeOnClient to be a function.');
  }
  if (typeof mapStateOnServer !== 'undefined' && typeof mapStateOnServer !== 'function') {
    throw new Error('Expected mapStateOnServer to either be undefined or a function.');
  }

  function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
  }

  return function wrap(WrappedComponent) {
    if (typeof WrappedComponent !== 'function') {
      throw new Error('Expected WrappedComponent to be a React component.');
    }

    var mountedInstances = [];
    var state = void 0;

    function emitChange() {
      state = reducePropsToState(mountedInstances.map(function (instance) {
        return instance.props;
      }));

      if (SideEffect.canUseDOM) {
        handleStateChangeOnClient(state);
      } else if (mapStateOnServer) {
        state = mapStateOnServer(state);
      }
    }

    var SideEffect = function (_Component) {
      _inherits(SideEffect, _Component);

      function SideEffect() {
        _classCallCheck(this, SideEffect);

        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
      }

      // Try to use displayName of wrapped component
      SideEffect.peek = function peek() {
        return state;
      };

      // Expose canUseDOM so tests can monkeypatch it


      SideEffect.rewind = function rewind() {
        if (SideEffect.canUseDOM) {
          throw new Error('You may only call rewind() on the server. Call peek() to read the current state.');
        }

        var recordedState = state;
        state = undefined;
        mountedInstances = [];
        return recordedState;
      };

      SideEffect.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
        return !(0, _shallowequal2.default)(nextProps, this.props);
      };

      SideEffect.prototype.componentWillMount = function componentWillMount() {
        mountedInstances.push(this);
        emitChange();
      };

      SideEffect.prototype.componentDidUpdate = function componentDidUpdate() {
        emitChange();
      };

      SideEffect.prototype.componentWillUnmount = function componentWillUnmount() {
        var index = mountedInstances.indexOf(this);
        mountedInstances.splice(index, 1);
        emitChange();
      };

      SideEffect.prototype.render = function render() {
        return _react2.default.createElement(WrappedComponent, this.props);
      };

      return SideEffect;
    }(_react.Component);

    SideEffect.displayName = 'SideEffect(' + getDisplayName(WrappedComponent) + ')';
    SideEffect.canUseDOM = _exenv2.default.canUseDOM;


    return SideEffect;
  };
};

/***/ }),

/***/ "./node_modules/react-transition-group/Transition.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.EXITING = exports.ENTERED = exports.ENTERING = exports.EXITED = exports.UNMOUNTED = undefined;

var _propTypes = __webpack_require__("./node_modules/prop-types/index.js");

var PropTypes = _interopRequireWildcard(_propTypes);

var _react = __webpack_require__("./node_modules/react/react.js");

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__("./node_modules/react-dom/index.js");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _PropTypes = __webpack_require__("./node_modules/react-transition-group/utils/PropTypes.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UNMOUNTED = exports.UNMOUNTED = 'unmounted';
var EXITED = exports.EXITED = 'exited';
var ENTERING = exports.ENTERING = 'entering';
var ENTERED = exports.ENTERED = 'entered';
var EXITING = exports.EXITING = 'exiting';

/**
 * The Transition component lets you describe a transition from one component
 * state to another _over time_ with a simple declarative API. Most commonly
 * it's used to animate the mounting and unmounting of a component, but can also
 * be used to describe in-place transition states as well.
 *
 * By default the `Transition` component does not alter the behavior of the
 * component it renders, it only tracks "enter" and "exit" states for the components.
 * It's up to you to give meaning and effect to those states. For example we can
 * add styles to a component when it enters or exits:
 *
 * ```jsx
 * import Transition from 'react-transition-group/Transition';
 *
 * const duration = 300;
 *
 * const defaultStyle = {
 *   transition: `opacity ${duration}ms ease-in-out`,
 *   opacity: 0,
 * }
 *
 * const transitionStyles = {
 *   entering: { opacity: 1 },
 *   entered:  { opacity: 1 },
 * };
 *
 * const Fade = ({ in: inProp }) => (
 *   <Transition in={inProp} timeout={duration}>
 *     {(state) => (
 *       <div style={{
 *         ...defaultStyle,
 *         ...transitionStyles[state]
 *       }}>
 *         I'm A fade Transition!
 *       </div>
 *     )}
 *   </Transition>
 * );
 * ```
 *
 * As noted the `Transition` component doesn't _do_ anything by itself to its child component.
 * What it does do is track transition states over time so you can update the
 * component (such as by adding styles or classes) when it changes states.
 *
 * There are 4 main states a Transition can be in:
 *  - `ENTERING`
 *  - `ENTERED`
 *  - `EXITING`
 *  - `EXITED`
 *
 * Transition state is toggled via the `in` prop. When `true` the component begins the
 * "Enter" stage. During this stage, the component will shift from its current transition state,
 * to `'entering'` for the duration of the transition and then to the `'entered'` stage once
 * it's complete. Let's take the following example:
 *
 * ```jsx
 * state= { in: false };
 *
 * toggleEnterState = () => {
 *   this.setState({ in: true });
 * }
 *
 * render() {
 *   return (
 *     <div>
 *       <Transition in={this.state.in} timeout={500} />
 *       <button onClick={this.toggleEnterState}>Click to Enter</button>
 *     </div>
 *   );
 * }
 * ```
 *
 * When the button is clicked the component will shift to the `'entering'` state and
 * stay there for 500ms (the value of `timeout`) when finally switches to `'entered'`.
 *
 * When `in` is `false` the same thing happens except the state moves from `'exiting'` to `'exited'`.
 */

var Transition = function (_React$Component) {
  _inherits(Transition, _React$Component);

  function Transition(props, context) {
    _classCallCheck(this, Transition);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props, context));

    var parentGroup = context.transitionGroup;
    // In the context of a TransitionGroup all enters are really appears
    var appear = parentGroup && !parentGroup.isMounting ? props.enter : props.appear;

    var initialStatus = void 0;
    _this.nextStatus = null;

    if (props.in) {
      if (appear) {
        initialStatus = EXITED;
        _this.nextStatus = ENTERING;
      } else {
        initialStatus = ENTERED;
      }
    } else {
      if (props.unmountOnExit || props.mountOnEnter) {
        initialStatus = UNMOUNTED;
      } else {
        initialStatus = EXITED;
      }
    }

    _this.state = { status: initialStatus };

    _this.nextCallback = null;
    return _this;
  }

  Transition.prototype.getChildContext = function getChildContext() {
    return { transitionGroup: null }; // allows for nested Transitions
  };

  Transition.prototype.componentDidMount = function componentDidMount() {
    this.updateStatus(true);
  };

  Transition.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    var status = this.state.status;


    if (nextProps.in) {
      if (status === UNMOUNTED) {
        this.setState({ status: EXITED });
      }
      if (status !== ENTERING && status !== ENTERED) {
        this.nextStatus = ENTERING;
      }
    } else {
      if (status === ENTERING || status === ENTERED) {
        this.nextStatus = EXITING;
      }
    }
  };

  Transition.prototype.componentDidUpdate = function componentDidUpdate() {
    this.updateStatus();
  };

  Transition.prototype.componentWillUnmount = function componentWillUnmount() {
    this.cancelNextCallback();
  };

  Transition.prototype.getTimeouts = function getTimeouts() {
    var timeout = this.props.timeout;

    var exit = void 0,
        enter = void 0,
        appear = void 0;

    exit = enter = appear = timeout;

    if (timeout != null && typeof timeout !== 'number') {
      exit = timeout.exit;
      enter = timeout.enter;
      appear = timeout.appear;
    }
    return { exit: exit, enter: enter, appear: appear };
  };

  Transition.prototype.updateStatus = function updateStatus() {
    var mounting = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;


    if (this.nextStatus !== null) {
      // nextStatus will always be ENTERING or EXITING.
      this.cancelNextCallback();
      var node = _reactDom2.default.findDOMNode(this);

      if (this.nextStatus === ENTERING) {
        this.performEnter(node, mounting);
      } else {
        this.performExit(node);
      }

      this.nextStatus = null;
    } else if (this.props.unmountOnExit && this.state.status === EXITED) {
      this.setState({ status: UNMOUNTED });
    }
  };

  Transition.prototype.performEnter = function performEnter(node, mounting) {
    var _this2 = this;

    var enter = this.props.enter;

    var appearing = this.context.transitionGroup ? this.context.transitionGroup.isMounting : mounting;

    var timeouts = this.getTimeouts();

    // no enter animation skip right to ENTERED
    // if we are mounting and running this it means appear _must_ be set
    if (!mounting && !enter) {
      this.safeSetState({ status: ENTERED }, function () {
        _this2.props.onEntered(node);
      });
      return;
    }

    this.props.onEnter(node, appearing);

    this.safeSetState({ status: ENTERING }, function () {
      _this2.props.onEntering(node, appearing);

      // FIXME: appear timeout?
      _this2.onTransitionEnd(node, timeouts.enter, function () {
        _this2.safeSetState({ status: ENTERED }, function () {
          _this2.props.onEntered(node, appearing);
        });
      });
    });
  };

  Transition.prototype.performExit = function performExit(node) {
    var _this3 = this;

    var exit = this.props.exit;

    var timeouts = this.getTimeouts();

    // no exit animation skip right to EXITED
    if (!exit) {
      this.safeSetState({ status: EXITED }, function () {
        _this3.props.onExited(node);
      });
      return;
    }
    this.props.onExit(node);

    this.safeSetState({ status: EXITING }, function () {
      _this3.props.onExiting(node);

      _this3.onTransitionEnd(node, timeouts.exit, function () {
        _this3.safeSetState({ status: EXITED }, function () {
          _this3.props.onExited(node);
        });
      });
    });
  };

  Transition.prototype.cancelNextCallback = function cancelNextCallback() {
    if (this.nextCallback !== null) {
      this.nextCallback.cancel();
      this.nextCallback = null;
    }
  };

  Transition.prototype.safeSetState = function safeSetState(nextState, callback) {
    // This shouldn't be necessary, but there are weird race conditions with
    // setState callbacks and unmounting in testing, so always make sure that
    // we can cancel any pending setState callbacks after we unmount.
    this.setState(nextState, this.setNextCallback(callback));
  };

  Transition.prototype.setNextCallback = function setNextCallback(callback) {
    var _this4 = this;

    var active = true;

    this.nextCallback = function (event) {
      if (active) {
        active = false;
        _this4.nextCallback = null;

        callback(event);
      }
    };

    this.nextCallback.cancel = function () {
      active = false;
    };

    return this.nextCallback;
  };

  Transition.prototype.onTransitionEnd = function onTransitionEnd(node, timeout, handler) {
    this.setNextCallback(handler);

    if (node) {
      if (this.props.addEndListener) {
        this.props.addEndListener(node, this.nextCallback);
      }
      if (timeout != null) {
        setTimeout(this.nextCallback, timeout);
      }
    } else {
      setTimeout(this.nextCallback, 0);
    }
  };

  Transition.prototype.render = function render() {
    var status = this.state.status;
    if (status === UNMOUNTED) {
      return null;
    }

    var _props = this.props,
        children = _props.children,
        childProps = _objectWithoutProperties(_props, ['children']);
    // filter props for Transtition


    delete childProps.in;
    delete childProps.mountOnEnter;
    delete childProps.unmountOnExit;
    delete childProps.appear;
    delete childProps.enter;
    delete childProps.exit;
    delete childProps.timeout;
    delete childProps.addEndListener;
    delete childProps.onEnter;
    delete childProps.onEntering;
    delete childProps.onEntered;
    delete childProps.onExit;
    delete childProps.onExiting;
    delete childProps.onExited;

    if (typeof children === 'function') {
      return children(status, childProps);
    }

    var child = _react2.default.Children.only(children);
    return _react2.default.cloneElement(child, childProps);
  };

  return Transition;
}(_react2.default.Component);

Transition.contextTypes = {
  transitionGroup: PropTypes.object
};
Transition.childContextTypes = {
  transitionGroup: function transitionGroup() {}
};


Transition.propTypes =  true ? {
  /**
   * A `function` child can be used instead of a React element.
   * This function is called with the current transition status
   * ('entering', 'entered', 'exiting', 'exited', 'unmounted'), which can used
   * to apply context specific props to a component.
   *
   * ```jsx
   * <Transition timeout={150}>
   *   {(status) => (
   *     <MyComponent className={`fade fade-${status}`} />
   *   )}
   * </Transition>
   * ```
   */
  children: PropTypes.oneOfType([PropTypes.func.isRequired, PropTypes.element.isRequired]).isRequired,

  /**
   * Show the component; triggers the enter or exit states
   */
  in: PropTypes.bool,

  /**
   * By default the child component is mounted immediately along with
   * the parent `Transition` component. If you want to "lazy mount" the component on the
   * first `in={true}` you can set `mountOnEnter`. After the first enter transition the component will stay
   * mounted, even on "exited", unless you also specify `unmountOnExit`.
   */
  mountOnEnter: PropTypes.bool,

  /**
   * By default the child component stays mounted after it reaches the `'exited'` state.
   * Set `unmountOnExit` if you'd prefer to unmount the component after it finishes exiting.
   */
  unmountOnExit: PropTypes.bool,

  /**
   * Normally a component is not transitioned if it shown when the `<Transition>` component mounts.
   * If you want to transition on the first mount set `appear` to `true`, and the
   * component will transition in as soon as the `<Transition>` mounts.
   *
   * > Note: there are no specific "appear" states. `apprear` only an additional `enter` transition.
   */
  appear: PropTypes.bool,

  /**
   * Enable or disable enter transitions.
   */
  enter: PropTypes.bool,

  /**
   * Enable or disable exit transitions.
   */
  exit: PropTypes.bool,

  /**
   * The duration for the transition, in milliseconds.
   * Required unless `addEventListener` is provided
   *
   * You may specify a single timeout for all transitions like: `timeout={500}`,
   * or individually like:
   *
   * ```jsx
   * timeout={{
   *  enter: 300,
   *  exit: 500,
   * }}
   * ```
   *
   * @type {number | { enter?: number, exit?: number }}
   */
  timeout: function timeout(props) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var pt = _PropTypes.timeoutsShape;
    if (!props.addEndListener) pt = pt.isRequired;
    return pt.apply(undefined, [props].concat(args));
  },

  /**
   * Add a custom transition end trigger. Called with the transitioning
   * DOM node and a `done` callback. Allows for more fine grained transition end
   * logic. **Note:** Timeouts are still used as a fallback if provided.
   *
   * ```jsx
   * addEndListener={(node, done) => {
   *   // use the css transitionend event to mark the finish of a transition
   *   node.addEventListener('transitionend', done, false);
   * }}
   * ```
   */
  addEndListener: PropTypes.func,

  /**
   * Callback fired before the "entering" status is applied. An extra parameter
   * `isAppearing` is supplied to indicate if the enter stage is occuring on the initial mount
   *
   * @type Function(node: HtmlElement, isAppearing: bool) -> void
   */
  onEnter: PropTypes.func,

  /**
   * Callback fired after the "entering" status is applied. An extra parameter
   * `isAppearing` is supplied to indicate if the enter stage is occuring on the initial mount
   *
   * @type Function(node: HtmlElement, isAppearing: bool)
   */
  onEntering: PropTypes.func,

  /**
   * Callback fired after the "enter" status is applied. An extra parameter
   * `isAppearing` is supplied to indicate if the enter stage is occuring on the initial mount
   *
   * @type Function(node: HtmlElement, isAppearing: bool) -> void
   */
  onEntered: PropTypes.func,

  /**
   * Callback fired before the "exiting" status is applied.
   *
   * @type Function(node: HtmlElement) -> void
   */
  onExit: PropTypes.func,

  /**
   * Callback fired after the "exiting" status is applied.
   *
   * @type Function(node: HtmlElement) -> void
   */
  onExiting: PropTypes.func,

  /**
   * Callback fired after the "exited" status is applied.
   *
   * @type Function(node: HtmlElement) -> void
   */
  onExited: PropTypes.func
} : {};

// Name the function so it is clearer in the documentation
function noop() {}

Transition.defaultProps = {
  in: false,
  mountOnEnter: false,
  unmountOnExit: false,
  appear: false,
  enter: true,
  exit: true,

  onEnter: noop,
  onEntering: noop,
  onEntered: noop,

  onExit: noop,
  onExiting: noop,
  onExited: noop
};

Transition.UNMOUNTED = 0;
Transition.EXITED = 1;
Transition.ENTERING = 2;
Transition.ENTERED = 3;
Transition.EXITING = 4;

exports.default = Transition;

/***/ }),

/***/ "./node_modules/react-transition-group/TransitionGroup.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _propTypes = __webpack_require__("./node_modules/prop-types/index.js");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = __webpack_require__("./node_modules/react/react.js");

var _react2 = _interopRequireDefault(_react);

var _ChildMapping = __webpack_require__("./node_modules/react-transition-group/utils/ChildMapping.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var values = Object.values || function (obj) {
  return Object.keys(obj).map(function (k) {
    return obj[k];
  });
};

var propTypes = {
  /**
   * `<TransitionGroup>` renders a `<div>` by default. You can change this
   * behavior by providing a `component` prop.
   */
  component: _propTypes2.default.any,
  /**
   * A set of `<Transition>` components, that are toggled `in` and out as they
   * leave. the `<TransitionGroup>` will inject specific transition props, so
   * remember to spread them throguh if you are wrapping the `<Transition>` as
   * with our `<Fade>` example.
   */
  children: _propTypes2.default.node,

  /**
   * A convenience prop that enables or disabled appear animations
   * for all children. Note that specifiying this will override any defaults set
   * on individual children Transitions.
   */
  appear: _propTypes2.default.bool,
  /**
   * A convenience prop that enables or disabled enter animations
   * for all children. Note that specifiying this will override any defaults set
   * on individual children Transitions.
   */
  enter: _propTypes2.default.bool,
  /**
    * A convenience prop that enables or disabled exit animations
    * for all children. Note that specifiying this will override any defaults set
    * on individual children Transitions.
    */
  exit: _propTypes2.default.bool,

  /**
   * You may need to apply reactive updates to a child as it is exiting.
   * This is generally done by using `cloneElement` however in the case of an exiting
   * child the element has already been removed and not accessible to the consumer.
   *
   * If you do need to update a child as it leaves you can provide a `childFactory`
   * to wrap every child, even the ones that are leaving.
   *
   * @type Function(child: ReactElement) -> ReactElement
   */
  childFactory: _propTypes2.default.func
};

var defaultProps = {
  component: 'div',
  childFactory: function childFactory(child) {
    return child;
  }
};

/**
 * The `<TransitionGroup>` component manages a set of `<Transition>` components
 * in a list. Like with the `<Transition>` component, `<TransitionGroup>`, is a
 * state machine for managing the mounting and unmounting of components over
 * time.
 *
 * Consider the example below using the `Fade` CSS transition from before.
 * As items are removed or added to the TodoList the `in` prop is toggled
 * automatically by the `<TransitionGroup>`. You can use _any_ `<Transition>`
 * component in a `<TransitionGroup>`, not just css.
 *
 * ```jsx
 * import TransitionGroup from 'react-transition-group/TransitionGroup';
 *
 * class TodoList extends React.Component {
 *   constructor(props) {
 *     super(props)
 *     this.state = {items: ['hello', 'world', 'click', 'me']}
 *   }
 *   handleAdd() {
 *     const newItems = this.state.items.concat([
 *       prompt('Enter some text')
 *     ]);
 *     this.setState({ items: newItems });
 *   }
 *   handleRemove(i) {
 *     let newItems = this.state.items.slice();
 *     newItems.splice(i, 1);
 *     this.setState({items: newItems});
 *   }
 *   render() {
 *     return (
 *       <div>
 *         <button onClick={() => this.handleAdd()}>Add Item</button>
 *         <TransitionGroup>
 *           {this.state.items.map((item, i) => (
 *             <FadeTransition key={item}>
 *               <div>
 *                 {item}{' '}
 *                 <button onClick={() => this.handleRemove(i)}>
 *                   remove
 *                 </button>
 *               </div>
 *             </FadeTransition>
 *           ))}
 *         </TransitionGroup>
 *       </div>
 *     );
 *   }
 * }
 * ```
 *
 * Note that `<TransitionGroup>`  does not define any animation behavior!
 * Exactly _how_ a list item animates is up to the individual `<Transition>`
 * components. This means you can mix and match animations across different
 * list items.
 */

var TransitionGroup = function (_React$Component) {
  _inherits(TransitionGroup, _React$Component);

  function TransitionGroup(props, context) {
    _classCallCheck(this, TransitionGroup);

    // Initial children should all be entering, dependent on appear
    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props, context));

    _this.handleExited = function (key, node, originalHandler) {
      var currentChildMapping = (0, _ChildMapping.getChildMapping)(_this.props.children);

      if (key in currentChildMapping) return;

      if (originalHandler) originalHandler(node);

      _this.setState(function (state) {
        var children = _extends({}, state.children);

        delete children[key];
        return { children: children };
      });
    };

    _this.state = {
      children: (0, _ChildMapping.getChildMapping)(props.children, function (child) {
        var onExited = function onExited(node) {
          _this.handleExited(child.key, node, child.props.onExited);
        };

        return (0, _react.cloneElement)(child, {
          onExited: onExited,
          in: true,
          appear: _this.getProp(child, 'appear'),
          enter: _this.getProp(child, 'enter'),
          exit: _this.getProp(child, 'exit')
        });
      })
    };
    return _this;
  }

  TransitionGroup.prototype.getChildContext = function getChildContext() {
    return {
      transitionGroup: { isMounting: !this.appeared }
    };
  };
  // use child config unless explictly set by the Group


  TransitionGroup.prototype.getProp = function getProp(child, prop) {
    var props = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.props;

    return props[prop] != null ? props[prop] : child.props[prop];
  };

  TransitionGroup.prototype.componentDidMount = function componentDidMount() {
    this.appeared = true;
  };

  TransitionGroup.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    var _this2 = this;

    var prevChildMapping = this.state.children;
    var nextChildMapping = (0, _ChildMapping.getChildMapping)(nextProps.children);

    var children = (0, _ChildMapping.mergeChildMappings)(prevChildMapping, nextChildMapping);

    Object.keys(children).forEach(function (key) {
      var child = children[key];

      if (!(0, _react.isValidElement)(child)) return;

      var onExited = function onExited(node) {
        _this2.handleExited(child.key, node, child.props.onExited);
      };

      var hasPrev = key in prevChildMapping;
      var hasNext = key in nextChildMapping;

      var prevChild = prevChildMapping[key];
      var isLeaving = (0, _react.isValidElement)(prevChild) && !prevChild.props.in;

      // item is new (entering)
      if (hasNext && (!hasPrev || isLeaving)) {
        // console.log('entering', key)
        children[key] = (0, _react.cloneElement)(child, {
          onExited: onExited,
          in: true,
          exit: _this2.getProp(child, 'exit', nextProps),
          enter: _this2.getProp(child, 'enter', nextProps)
        });
      }
      // item is old (exiting)
      else if (!hasNext && hasPrev && !isLeaving) {
          // console.log('leaving', key)
          children[key] = (0, _react.cloneElement)(child, { in: false });
        }
        // item hasn't changed transition states
        // copy over the last transition props;
        else if (hasNext && hasPrev && (0, _react.isValidElement)(prevChild)) {
            // console.log('unchanged', key)
            children[key] = (0, _react.cloneElement)(child, {
              onExited: onExited,
              in: prevChild.props.in,
              exit: _this2.getProp(child, 'exit', nextProps),
              enter: _this2.getProp(child, 'enter', nextProps)
            });
          }
    });

    this.setState({ children: children });
  };

  TransitionGroup.prototype.render = function render() {
    var _props = this.props,
        Component = _props.component,
        childFactory = _props.childFactory,
        props = _objectWithoutProperties(_props, ['component', 'childFactory']);

    var children = this.state.children;


    delete props.appear;
    delete props.enter;
    delete props.exit;

    return _react2.default.createElement(
      Component,
      props,
      values(children).map(childFactory)
    );
  };

  return TransitionGroup;
}(_react2.default.Component);

TransitionGroup.childContextTypes = {
  transitionGroup: _propTypes2.default.object.isRequired
};


TransitionGroup.propTypes =  true ? propTypes : {};
TransitionGroup.defaultProps = defaultProps;

exports.default = TransitionGroup;
module.exports = exports['default'];

/***/ }),

/***/ "./node_modules/react-transition-group/utils/ChildMapping.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.getChildMapping = getChildMapping;
exports.mergeChildMappings = mergeChildMappings;

var _react = __webpack_require__("./node_modules/react/react.js");

/**
 * Given `this.props.children`, return an object mapping key to child.
 *
 * @param {*} children `this.props.children`
 * @return {object} Mapping of key to child
 */
function getChildMapping(children, mapFn) {
  var mapper = function mapper(child) {
    return mapFn && (0, _react.isValidElement)(child) ? mapFn(child) : child;
  };

  var result = Object.create(null);
  if (children) _react.Children.map(children, function (c) {
    return c;
  }).forEach(function (child) {
    // run the map function here instead so that the key is the computed one
    result[child.key] = mapper(child);
  });
  return result;
}

/**
 * When you're adding or removing children some may be added or removed in the
 * same render pass. We want to show *both* since we want to simultaneously
 * animate elements in and out. This function takes a previous set of keys
 * and a new set of keys and merges them with its best guess of the correct
 * ordering. In the future we may expose some of the utilities in
 * ReactMultiChild to make this easy, but for now React itself does not
 * directly have this concept of the union of prevChildren and nextChildren
 * so we implement it here.
 *
 * @param {object} prev prev children as returned from
 * `ReactTransitionChildMapping.getChildMapping()`.
 * @param {object} next next children as returned from
 * `ReactTransitionChildMapping.getChildMapping()`.
 * @return {object} a key set that contains all keys in `prev` and all keys
 * in `next` in a reasonable order.
 */
function mergeChildMappings(prev, next) {
  prev = prev || {};
  next = next || {};

  function getValueForKey(key) {
    return key in next ? next[key] : prev[key];
  }

  // For each key of `next`, the list of keys to insert before that key in
  // the combined list
  var nextKeysPending = Object.create(null);

  var pendingKeys = [];
  for (var prevKey in prev) {
    if (prevKey in next) {
      if (pendingKeys.length) {
        nextKeysPending[prevKey] = pendingKeys;
        pendingKeys = [];
      }
    } else {
      pendingKeys.push(prevKey);
    }
  }

  var i = void 0;
  var childMapping = {};
  for (var nextKey in next) {
    if (nextKeysPending[nextKey]) {
      for (i = 0; i < nextKeysPending[nextKey].length; i++) {
        var pendingNextKey = nextKeysPending[nextKey][i];
        childMapping[nextKeysPending[nextKey][i]] = getValueForKey(pendingNextKey);
      }
    }
    childMapping[nextKey] = getValueForKey(nextKey);
  }

  // Finally, add the keys which didn't appear before any key in `next`
  for (i = 0; i < pendingKeys.length; i++) {
    childMapping[pendingKeys[i]] = getValueForKey(pendingKeys[i]);
  }

  return childMapping;
}

/***/ }),

/***/ "./node_modules/react-transition-group/utils/PropTypes.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.classNamesShape = exports.timeoutsShape = undefined;
exports.transitionTimeout = transitionTimeout;

var _propTypes = __webpack_require__("./node_modules/prop-types/index.js");

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function transitionTimeout(transitionType) {
  var timeoutPropName = 'transition' + transitionType + 'Timeout';
  var enabledPropName = 'transition' + transitionType;

  return function (props) {
    // If the transition is enabled
    if (props[enabledPropName]) {
      // If no timeout duration is provided
      if (props[timeoutPropName] == null) {
        return new Error(timeoutPropName + ' wasn\'t supplied to CSSTransitionGroup: ' + 'this can cause unreliable animations and won\'t be supported in ' + 'a future version of React. See ' + 'https://fb.me/react-animation-transition-group-timeout for more ' + 'information.');

        // If the duration isn't a number
      } else if (typeof props[timeoutPropName] !== 'number') {
        return new Error(timeoutPropName + ' must be a number (in milliseconds)');
      }
    }

    return null;
  };
}

var timeoutsShape = exports.timeoutsShape = _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.shape({
  enter: _propTypes2.default.number,
  exit: _propTypes2.default.number
}).isRequired]);

var classNamesShape = exports.classNamesShape = _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.shape({
  enter: _propTypes2.default.string,
  exit: _propTypes2.default.string,
  active: _propTypes2.default.string
}), _propTypes2.default.shape({
  enter: _propTypes2.default.string,
  enterActive: _propTypes2.default.string,
  exit: _propTypes2.default.string,
  exitActive: _propTypes2.default.string
})]);

/***/ }),

/***/ "./node_modules/recompose/onlyUpdateForKeys.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _shouldUpdate = __webpack_require__("./node_modules/recompose/shouldUpdate.js");

var _shouldUpdate2 = _interopRequireDefault(_shouldUpdate);

var _shallowEqual = __webpack_require__("./node_modules/recompose/shallowEqual.js");

var _shallowEqual2 = _interopRequireDefault(_shallowEqual);

var _setDisplayName = __webpack_require__("./node_modules/recompose/setDisplayName.js");

var _setDisplayName2 = _interopRequireDefault(_setDisplayName);

var _wrapDisplayName = __webpack_require__("./node_modules/recompose/wrapDisplayName.js");

var _wrapDisplayName2 = _interopRequireDefault(_wrapDisplayName);

var _pick = __webpack_require__("./node_modules/recompose/utils/pick.js");

var _pick2 = _interopRequireDefault(_pick);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var onlyUpdateForKeys = function onlyUpdateForKeys(propKeys) {
  var hoc = (0, _shouldUpdate2.default)(function (props, nextProps) {
    return !(0, _shallowEqual2.default)((0, _pick2.default)(nextProps, propKeys), (0, _pick2.default)(props, propKeys));
  });

  if (true) {
    return function (BaseComponent) {
      return (0, _setDisplayName2.default)((0, _wrapDisplayName2.default)(BaseComponent, 'onlyUpdateForKeys'))(hoc(BaseComponent));
    };
  }
  return hoc;
};

exports.default = onlyUpdateForKeys;

/***/ }),

/***/ "./node_modules/recompose/setDisplayName.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _setStatic = __webpack_require__("./node_modules/recompose/setStatic.js");

var _setStatic2 = _interopRequireDefault(_setStatic);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var setDisplayName = function setDisplayName(displayName) {
  return (0, _setStatic2.default)('displayName', displayName);
};

exports.default = setDisplayName;

/***/ }),

/***/ "./node_modules/recompose/setStatic.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
var setStatic = function setStatic(key, value) {
  return function (BaseComponent) {
    /* eslint-disable no-param-reassign */
    BaseComponent[key] = value;
    /* eslint-enable no-param-reassign */
    return BaseComponent;
  };
};

exports.default = setStatic;

/***/ }),

/***/ "./node_modules/recompose/shallowEqual.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _shallowEqual = __webpack_require__("./node_modules/fbjs/lib/shallowEqual.js");

var _shallowEqual2 = _interopRequireDefault(_shallowEqual);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _shallowEqual2.default;

/***/ }),

/***/ "./node_modules/recompose/shouldUpdate.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _react = __webpack_require__("./node_modules/react/react.js");

var _setDisplayName = __webpack_require__("./node_modules/recompose/setDisplayName.js");

var _setDisplayName2 = _interopRequireDefault(_setDisplayName);

var _wrapDisplayName = __webpack_require__("./node_modules/recompose/wrapDisplayName.js");

var _wrapDisplayName2 = _interopRequireDefault(_wrapDisplayName);

var _createEagerFactory = __webpack_require__("./node_modules/recompose/createEagerFactory.js");

var _createEagerFactory2 = _interopRequireDefault(_createEagerFactory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var shouldUpdate = function shouldUpdate(test) {
  return function (BaseComponent) {
    var factory = (0, _createEagerFactory2.default)(BaseComponent);

    var ShouldUpdate = function (_Component) {
      _inherits(ShouldUpdate, _Component);

      function ShouldUpdate() {
        _classCallCheck(this, ShouldUpdate);

        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
      }

      ShouldUpdate.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
        return test(this.props, nextProps);
      };

      ShouldUpdate.prototype.render = function render() {
        return factory(this.props);
      };

      return ShouldUpdate;
    }(_react.Component);

    if (true) {
      return (0, _setDisplayName2.default)((0, _wrapDisplayName2.default)(BaseComponent, 'shouldUpdate'))(ShouldUpdate);
    }
    return ShouldUpdate;
  };
};

exports.default = shouldUpdate;

/***/ }),

/***/ "./node_modules/recompose/utils/pick.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
var pick = function pick(obj, keys) {
  var result = {};
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (obj.hasOwnProperty(key)) {
      result[key] = obj[key];
    }
  }
  return result;
};

exports.default = pick;

/***/ }),

/***/ "./node_modules/reselect/lib/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.defaultMemoize = defaultMemoize;
exports.createSelectorCreator = createSelectorCreator;
exports.createStructuredSelector = createStructuredSelector;
function defaultEqualityCheck(a, b) {
  return a === b;
}

function areArgumentsShallowlyEqual(equalityCheck, prev, next) {
  if (prev === null || next === null || prev.length !== next.length) {
    return false;
  }

  // Do this in a for loop (and not a `forEach` or an `every`) so we can determine equality as fast as possible.
  var length = prev.length;
  for (var i = 0; i < length; i++) {
    if (!equalityCheck(prev[i], next[i])) {
      return false;
    }
  }

  return true;
}

function defaultMemoize(func) {
  var equalityCheck = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultEqualityCheck;

  var lastArgs = null;
  var lastResult = null;
  // we reference arguments instead of spreading them for performance reasons
  return function () {
    if (!areArgumentsShallowlyEqual(equalityCheck, lastArgs, arguments)) {
      // apply arguments instead of spreading for performance.
      lastResult = func.apply(null, arguments);
    }

    lastArgs = arguments;
    return lastResult;
  };
}

function getDependencies(funcs) {
  var dependencies = Array.isArray(funcs[0]) ? funcs[0] : funcs;

  if (!dependencies.every(function (dep) {
    return typeof dep === 'function';
  })) {
    var dependencyTypes = dependencies.map(function (dep) {
      return typeof dep;
    }).join(', ');
    throw new Error('Selector creators expect all input-selectors to be functions, ' + ('instead received the following types: [' + dependencyTypes + ']'));
  }

  return dependencies;
}

function createSelectorCreator(memoize) {
  for (var _len = arguments.length, memoizeOptions = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    memoizeOptions[_key - 1] = arguments[_key];
  }

  return function () {
    for (var _len2 = arguments.length, funcs = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      funcs[_key2] = arguments[_key2];
    }

    var recomputations = 0;
    var resultFunc = funcs.pop();
    var dependencies = getDependencies(funcs);

    var memoizedResultFunc = memoize.apply(undefined, [function () {
      recomputations++;
      // apply arguments instead of spreading for performance.
      return resultFunc.apply(null, arguments);
    }].concat(memoizeOptions));

    // If a selector is called with the exact same arguments we don't need to traverse our dependencies again.
    var selector = defaultMemoize(function () {
      var params = [];
      var length = dependencies.length;

      for (var i = 0; i < length; i++) {
        // apply arguments instead of spreading and mutate a local list of params for performance.
        params.push(dependencies[i].apply(null, arguments));
      }

      // apply arguments instead of spreading for performance.
      return memoizedResultFunc.apply(null, params);
    });

    selector.resultFunc = resultFunc;
    selector.recomputations = function () {
      return recomputations;
    };
    selector.resetRecomputations = function () {
      return recomputations = 0;
    };
    return selector;
  };
}

var createSelector = exports.createSelector = createSelectorCreator(defaultMemoize);

function createStructuredSelector(selectors) {
  var selectorCreator = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : createSelector;

  if (typeof selectors !== 'object') {
    throw new Error('createStructuredSelector expects first argument to be an object ' + ('where each property is a selector, instead received a ' + typeof selectors));
  }
  var objectKeys = Object.keys(selectors);
  return selectorCreator(objectKeys.map(function (key) {
    return selectors[key];
  }), function () {
    for (var _len3 = arguments.length, values = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      values[_key3] = arguments[_key3];
    }

    return values.reduce(function (composition, value, index) {
      composition[objectKeys[index]] = value;
      return composition;
    }, {});
  });
}

/***/ }),

/***/ "./node_modules/shallowequal/index.js":
/***/ (function(module, exports) {

module.exports = function shallowEqual(objA, objB, compare, compareContext) {

    var ret = compare ? compare.call(compareContext, objA, objB) : void 0;

    if(ret !== void 0) {
        return !!ret;
    }

    if(objA === objB) {
        return true;
    }

    if(typeof objA !== 'object' || !objA ||
       typeof objB !== 'object' || !objB) {
        return false;
    }

    var keysA = Object.keys(objA);
    var keysB = Object.keys(objB);

    if(keysA.length !== keysB.length) {
        return false;
    }

    var bHasOwnProperty = Object.prototype.hasOwnProperty.bind(objB);

    // Test for A's keys different from B.
    for(var idx = 0; idx < keysA.length; idx++) {

        var key = keysA[idx];

        if(!bHasOwnProperty(key)) {
            return false;
        }

        var valueA = objA[key];
        var valueB = objB[key];

        ret = compare ? compare.call(compareContext, valueA, valueB, key) : void 0;

        if(ret === false ||
           ret === void 0 && valueA !== valueB) {
            return false;
        }

    }

    return true;

};


/***/ }),

/***/ "./src/client/js/business/common/components/presentation/icons/morpheo.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__("./node_modules/react/react.js");

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__("./node_modules/prop-types/index.js");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _onlyUpdateForKeys = __webpack_require__("./node_modules/recompose/onlyUpdateForKeys.js");

var _onlyUpdateForKeys2 = _interopRequireDefault(_onlyUpdateForKeys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Morpheo = function Morpheo(_ref) {
    var width = _ref.width,
        height = _ref.height,
        style = _ref.style,
        color = _ref.color;
    return _react2.default.createElement(
        'svg',
        {
            width: width,
            height: height,
            viewBox: '615 1046 95 94',
            version: '1.1',
            xmlns: 'http://www.w3.org/2000/svg',
            style: style
        },
        _react2.default.createElement(
            'desc',
            null,
            'Morpheo Logo'
        ),
        _react2.default.createElement(
            'defs',
            null,
            _react2.default.createElement(
                'linearGradient',
                { x1: '52.0941413%', y1: '9.34631553%', x2: '52.0941435%', y2: '103.257031%', id: 'linearGradient-1' },
                _react2.default.createElement('stop', { stopColor: '#5656ED', offset: '0%' }),
                _react2.default.createElement('stop', { stopColor: '#B238CE', offset: '100%' })
            )
        ),
        _react2.default.createElement(
            'g',
            {
                id: 'Group-6-Copy-16',
                stroke: 'none',
                strokeWidth: '1',
                fill: 'none',
                fillRule: 'evenodd',
                transform: 'translate(620.000000, 1050.000000)',
                opacity: '0.323143116'
            },
            _react2.default.createElement('polygon', {
                id: 'Path-3',
                stroke: '#AD96C1',
                strokeWidth: '2',
                points: '1.64461635 69.8717613 1.64461635 10.8289836 23.5472626 0.788207377 43.5799905 12.6005533 64.9637378 1.49396379 84.0339483 12.6166849 84.0339483 69.8234222 63.4514026 81.9408682 63.5092074 45.0254926 43.6351067 34.2280916 22.9880347 45.2594004 21.8722674 81.556399'
            }),
            _react2.default.createElement('path', { d: 'M20.8218307,44.9585591 L0,35', id: 'Path-4', stroke: '#AD96C1', strokeWidth: '2' }),
            _react2.default.createElement('path', { d: 'M21.8218307,63.9585591 L1,54', id: 'Path-4-Copy', stroke: '#AD96C1', strokeWidth: '2' }),
            _react2.default.createElement('path', { d: 'M65,43.9961995 L85.9065215,34', id: 'Path-5', stroke: '#AD96C1', strokeWidth: '2' }),
            _react2.default.createElement('path', { d: 'M63,66 L84.9065215,53', id: 'Path-5-Copy-2', stroke: '#AD96C1', strokeWidth: '2' }),
            _react2.default.createElement('polyline', {
                id: 'Path-6',
                stroke: '#AD96C1',
                strokeWidth: '2',
                points: '22.7796685 48.2352031 22.7514383 21.893685 43.7050102 12.0225052 63.9447599 22.7486585'
            }),
            _react2.default.createElement('path', { d: 'M44,37.7080059 L44,12.1663451', id: 'Path-7', stroke: '#AD96C1', strokeWidth: '2' }),
            _react2.default.createElement('path', {
                d: 'M64.1947994,22.4058625 L63.8022644,48.4301263',
                id: 'Path-8',
                stroke: '#AD96C1',
                strokeWidth: '2'
            }),
            _react2.default.createElement('path', {
                d: 'M1.88121278,11.1245142 L22.0766007,22.5429809',
                id: 'Path-9',
                stroke: '#AD96C1',
                strokeWidth: '2'
            }),
            _react2.default.createElement('path', {
                d: 'M63.8466262,22.6827879 L84.5232728,12.0964416',
                id: 'Path-10',
                stroke: '#AD96C1',
                strokeWidth: '2'
            })
        ),
        _react2.default.createElement('path', {
            d: 'M643.5,1081 C639.357864,1081 636,1077.64214 636,1073.5 C636,1069.35786 639.357864,1066 643.5,1066 C647.642136,1066 651,1069.35786 651,1073.5 C651,1077.64214 647.642136,1081 643.5,1081 Z M643,1102 C639.134007,1102 636,1098.86599 636,1095 C636,1091.13401 639.134007,1088 643,1088 C646.865993,1088 650,1091.13401 650,1095 C650,1098.86599 646.865993,1102 643,1102 Z M664,1091 C660.686292,1091 658,1088.31371 658,1085 C658,1081.68629 660.686292,1079 664,1079 C667.313708,1079 670,1081.68629 670,1085 C670,1088.31371 667.313708,1091 664,1091 Z M683.5,1122 C679.910149,1122 677,1119.08985 677,1115.5 C677,1111.91015 679.910149,1109 683.5,1109 C687.089851,1109 690,1111.91015 690,1115.5 C690,1119.08985 687.089851,1122 683.5,1122 Z M683,1140 C679.686292,1140 677,1137.31371 677,1134 C677,1130.68629 679.686292,1128 683,1128 C686.313708,1128 689,1130.68629 689,1134 C689,1137.31371 686.313708,1140 683,1140 Z M703.595988,1108.99916 C700.558885,1109.05218 698.053851,1106.63309 698.000838,1103.59599 C697.947825,1100.55888 700.366908,1098.05385 703.404012,1098.00084 C706.441115,1097.94782 708.946149,1100.36691 708.999162,1103.40401 C709.052175,1106.44112 706.633092,1108.94615 703.595988,1108.99916 Z M703,1126 C700.238576,1126 698,1123.76142 698,1121 C698,1118.23858 700.238576,1116 703,1116 C705.761424,1116 708,1118.23858 708,1121 C708,1123.76142 705.761424,1126 703,1126 Z M704,1090 C700.686292,1090 698,1087.31371 698,1084 C698,1080.68629 700.686292,1078 704,1078 C707.313708,1078 710,1080.68629 710,1084 C710,1087.31371 707.313708,1090 704,1090 Z M702,1069 C698.686292,1069 696,1066.31371 696,1063 C696,1059.68629 698.686292,1057 702,1057 C705.313708,1057 708,1059.68629 708,1063 C708,1066.31371 705.313708,1069 702,1069 Z M623,1068 C619.686292,1068 617,1065.31371 617,1062 C617,1058.68629 619.686292,1056 623,1056 C626.313708,1056 629,1058.68629 629,1062 C629,1065.31371 626.313708,1068 623,1068 Z M621,1090 C617.686292,1090 615,1087.31371 615,1084 C615,1080.68629 617.686292,1078 621,1078 C624.313708,1078 627,1080.68629 627,1084 C627,1087.31371 624.313708,1090 621,1090 Z M621.595988,1108.99916 C618.558885,1109.05218 616.053851,1106.63309 616.000838,1103.59599 C615.947825,1100.55888 618.366908,1098.05385 621.404012,1098.00084 C624.441115,1097.94782 626.946149,1100.36691 626.999162,1103.40401 C627.052175,1106.44112 624.633092,1108.94615 621.595988,1108.99916 Z M621,1126 C618.238576,1126 616,1123.76142 616,1121 C616,1118.23858 618.238576,1116 621,1116 C623.761424,1116 626,1118.23858 626,1121 C626,1123.76142 623.761424,1126 621,1126 Z M642.5,1121 C638.910149,1121 636,1118.08985 636,1114.5 C636,1110.91015 638.910149,1108 642.5,1108 C646.089851,1108 649,1110.91015 649,1114.5 C649,1118.08985 646.089851,1121 642.5,1121 Z M642,1140 C638.686292,1140 636,1137.31371 636,1134 C636,1130.68629 638.686292,1128 642,1128 C645.313708,1128 648,1130.68629 648,1134 C648,1137.31371 645.313708,1140 642,1140 Z M643,1056 C640.238576,1056 638,1053.76142 638,1051 C638,1048.23858 640.238576,1046 643,1046 C645.761424,1046 648,1048.23858 648,1051 C648,1053.76142 645.761424,1056 643,1056 Z M664,1067 C660.686292,1067 658,1064.31371 658,1061 C658,1057.68629 660.686292,1055 664,1055 C667.313708,1055 670,1057.68629 670,1061 C670,1064.31371 667.313708,1067 664,1067 Z M684.5,1081 C680.357864,1081 677,1077.64214 677,1073.5 C677,1069.35786 680.357864,1066 684.5,1066 C688.642136,1066 692,1069.35786 692,1073.5 C692,1077.64214 688.642136,1081 684.5,1081 Z M684,1102 C680.134007,1102 677,1098.86599 677,1095 C677,1091.13401 680.134007,1088 684,1088 C687.865993,1088 691,1091.13401 691,1095 C691,1098.86599 687.865993,1102 684,1102 Z M684,1056 C681.238576,1056 679,1053.76142 679,1051 C679,1048.23858 681.238576,1046 684,1046 C686.761424,1046 689,1048.23858 689,1051 C689,1053.76142 686.761424,1056 684,1056 Z',
            id: 'Combined-Shape-Copy-43',
            stroke: 'none',
            fill: 'url(#linearGradient-1)',
            fillRule: 'evenodd'
        })
    );
}; /**
    * Copyright Morpheo Org. 2017
    *
    * contact@morpheo.co
    *
    * This software is part of the Morpheo project, an open-source machine
    * learning platform.
    *
    * This software is governed by the CeCILL license, compatible with the
    * GNU GPL, under French law and abiding by the rules of distribution of
    * free software. You can  use, modify and/ or redistribute the software
    * under the terms of the CeCILL license as circulated by CEA, CNRS and
    * INRIA at the following URL "http://www.cecill.info".
    *
    * As a counterpart to the access to the source code and  rights to copy,
    * modify and redistribute granted by the license, users are provided only
    * with a limited warranty  and the software's author,  the holder of the
    * economic rights,  and the successive licensors  have only  limited
    * liability.
    *
    * In this respect, the user's attention is drawn to the risks associated
    * with loading,  using,  modifying and/or developing or reproducing the
    * software by the user in light of its specific status of free software,
    * that may mean  that it is complicated to manipulate,  and  that  also
    * therefore means  that it is reserved for developers  and  experienced
    * professionals having in-depth computer knowledge. Users are therefore
    * encouraged to load and test the software's suitability as regards their
    * requirements in conditions enabling the security of their systems and/or
    * data to be ensured and,  more generally, to use and operate it in the
    * same conditions as regards security.
    *
    * The fact that you are presently reading this means that you have had
    * knowledge of the CeCILL license and that you accept its terms.
    */

// Icon

Morpheo.propTypes = {
    width: _propTypes2.default.number,
    height: _propTypes2.default.number,
    style: _propTypes2.default.shape({}),
    color: _propTypes2.default.string
};

Morpheo.defaultProps = {
    width: 95,
    height: 94,
    style: {},
    color: '#1883FF'
};

var _default = (0, _onlyUpdateForKeys2.default)(['width', 'height', 'style'])(Morpheo);

var _default2 = _default;
exports.default = _default2;
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(Morpheo, 'Morpheo', '/home/guillaume/Projects/morpheo-notebook/src/client/js/business/common/components/presentation/icons/morpheo.js');

    __REACT_HOT_LOADER__.register(_default, 'default', '/home/guillaume/Projects/morpheo-notebook/src/client/js/business/common/components/presentation/icons/morpheo.js');

    __REACT_HOT_LOADER__.register(_default2, 'default', '/home/guillaume/Projects/morpheo-notebook/src/client/js/business/common/components/presentation/icons/morpheo.js');
}();

;
;

var _temp2 = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }
}();

;

/***/ }),

/***/ "./src/client/js/business/user/components/SignIn.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _keys = __webpack_require__("./node_modules/babel-runtime/core-js/object/keys.js");

var _keys2 = _interopRequireDefault(_keys);

var _getPrototypeOf = __webpack_require__("./node_modules/babel-runtime/core-js/object/get-prototype-of.js");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__("./node_modules/babel-runtime/helpers/classCallCheck.js");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__("./node_modules/babel-runtime/helpers/createClass.js");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__("./node_modules/babel-runtime/helpers/possibleConstructorReturn.js");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__("./node_modules/babel-runtime/helpers/inherits.js");

var _inherits3 = _interopRequireDefault(_inherits2);

var _reactRedux = __webpack_require__("./node_modules/react-redux/es/index.js");

var _react = __webpack_require__("./node_modules/react/react.js");

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__("./node_modules/prop-types/index.js");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _redux = __webpack_require__("./node_modules/redux/es/index.js");

var _morpheo = __webpack_require__("./src/client/js/business/common/components/presentation/icons/morpheo.js");

var _morpheo2 = _interopRequireDefault(_morpheo);

var _actions = __webpack_require__("./src/client/js/business/user/actions.js");

var _HelmetTitle = __webpack_require__("./src/client/js/utils/HelmetTitle.js");

var _HelmetTitle2 = _interopRequireDefault(_HelmetTitle);

var _signIn = __webpack_require__("./src/client/js/business/user/form/signIn.js");

var _signIn2 = _interopRequireDefault(_signIn);

var _selector = __webpack_require__("./src/client/js/business/user/selector.js");

var _variables = __webpack_require__("./src/client/css/variables/index.js");

var _variables2 = _interopRequireDefault(_variables);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright Morpheo Org. 2017
 *
 * contact@morpheo.co
 *
 * This software is part of the Morpheo project, an open-source machine
 * learning platform.
 *
 * This software is governed by the CeCILL license, compatible with the
 * GNU GPL, under French law and abiding by the rules of distribution of
 * free software. You can  use, modify and/ or redistribute the software
 * under the terms of the CeCILL license as circulated by CEA, CNRS and
 * INRIA at the following URL "http://www.cecill.info".
 *
 * As a counterpart to the access to the source code and  rights to copy,
 * modify and redistribute granted by the license, users are provided only
 * with a limited warranty  and the software's author,  the holder of the
 * economic rights,  and the successive licensors  have only  limited
 * liability.
 *
 * In this respect, the user's attention is drawn to the risks associated
 * with loading,  using,  modifying and/or developing or reproducing the
 * software by the user in light of its specific status of free software,
 * that may mean  that it is complicated to manipulate,  and  that  also
 * therefore means  that it is reserved for developers  and  experienced
 * professionals having in-depth computer knowledge. Users are therefore
 * encouraged to load and test the software's suitability as regards their
 * requirements in conditions enabling the security of their systems and/or
 * data to be ensured and,  more generally, to use and operate it in the
 * same conditions as regards security.
 *
 * The fact that you are presently reading this means that you have had
 * knowledge of the CeCILL license and that you accept its terms.
 */

var style = {
    logo: {
        margin: '0 auto 40px',
        display: 'block'
    },
    main: {
        margin: '0 auto',
        padding: '10% 0 0'
    },
    title: {
        fontSize: '3.5rem',
        fontWeight: '300'
    },
    form: {
        width: 380,
        margin: '0 auto',
        backgroundColor: '#fff',
        padding: '50px 30px 10px',
        borderRadius: 10,
        textAlign: 'center',
        boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.05)'
    },
    p: {
        margin: '10px 0 30px'
    }
};

var SignIn = function (_React$Component) {
    (0, _inherits3.default)(SignIn, _React$Component);

    function SignIn() {
        var _ref;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, SignIn);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = SignIn.__proto__ || (0, _getPrototypeOf2.default)(SignIn)).call.apply(_ref, [this].concat(args))), _this), _this.signIn = function () {
            var _this2;

            return (_this2 = _this).__signIn__REACT_HOT_LOADER__.apply(_this2, arguments);
        }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    (0, _createClass3.default)(SignIn, [{
        key: '__signIn__REACT_HOT_LOADER__',
        value: function __signIn__REACT_HOT_LOADER__(values) {
            console.log(values);
            this.props.signIn(this.props.location.prev, { uuid: values.uuid });
        }
    }, {
        key: 'render',
        value: function render() {
            var signInError = this.props.signInError;


            return _react2.default.createElement(
                'div',
                { style: style.main },
                _react2.default.createElement(_HelmetTitle2.default, { title: 'Sign in' }),
                _react2.default.createElement(_morpheo2.default, { width: 73, style: style.logo, color: _variables2.default['primary-color'] }),
                _react2.default.createElement(
                    'div',
                    { style: style.form },
                    _react2.default.createElement(
                        'h1',
                        null,
                        'Login to Notebook'
                    ),
                    _react2.default.createElement(
                        'p',
                        { style: style.p },
                        'For getting an uuid please ask to an administrator'
                    ),
                    signInError && _react2.default.createElement(
                        'div',
                        { className: 'error', role: 'alert' },
                        _react2.default.createElement(
                            'ul',
                            null,
                            signInError.length && (0, _keys2.default)(signInError).map(function (o) {
                                return _react2.default.createElement(
                                    'li',
                                    { key: o },
                                    o,
                                    ':',
                                    _react2.default.createElement(
                                        'ul',
                                        null,
                                        signInError[o].map(function (x) {
                                            return _react2.default.createElement(
                                                'li',
                                                { key: x },
                                                x
                                            );
                                        })
                                    )
                                );
                            })
                        ),
                        signInError.detail || signInError.message
                    ),
                    _react2.default.createElement(_signIn2.default, {
                        signInError: signInError,
                        signIn: this.signIn
                    })
                )
            );
        }
    }]);
    return SignIn;
}(_react2.default.Component);

SignIn.propTypes = {
    signInError: _propTypes2.default.oneOfType([_propTypes2.default.shape({}), _propTypes2.default.bool]),
    signIn: _propTypes2.default.func,
    location: _propTypes2.default.shape({
        prev: _propTypes2.default.shape({})
    }).isRequired
};

SignIn.defaultProps = {
    signInError: null,
    signIn: null
};

function mapStateToProps(state) {
    return {
        // get previousRoute from state
        location: state.location,
        signInError: (0, _selector.getError)(state)
    };
}

function mapDispatchToProps(dispatch) {
    return (0, _redux.bindActionCreators)({
        signIn: _actions.signIn.request
    }, dispatch);
}

var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(SignIn);

var _default2 = _default;
exports.default = _default2;
;

var _temp2 = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(mapStateToProps, 'mapStateToProps', '/home/guillaume/Projects/morpheo-notebook/src/client/js/business/user/components/SignIn.js');

    __REACT_HOT_LOADER__.register(mapDispatchToProps, 'mapDispatchToProps', '/home/guillaume/Projects/morpheo-notebook/src/client/js/business/user/components/SignIn.js');

    __REACT_HOT_LOADER__.register(style, 'style', '/home/guillaume/Projects/morpheo-notebook/src/client/js/business/user/components/SignIn.js');

    __REACT_HOT_LOADER__.register(SignIn, 'SignIn', '/home/guillaume/Projects/morpheo-notebook/src/client/js/business/user/components/SignIn.js');

    __REACT_HOT_LOADER__.register(_default, 'default', '/home/guillaume/Projects/morpheo-notebook/src/client/js/business/user/components/SignIn.js');

    __REACT_HOT_LOADER__.register(_default2, 'default', '/home/guillaume/Projects/morpheo-notebook/src/client/js/business/user/components/SignIn.js');
}();

;
;

var _temp3 = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }
}();

;

/***/ }),

/***/ "./src/client/js/business/user/form/signIn.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__("./node_modules/react/react.js");

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__("./node_modules/prop-types/index.js");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _onlyUpdateForKeys = __webpack_require__("./node_modules/recompose/onlyUpdateForKeys.js");

var _onlyUpdateForKeys2 = _interopRequireDefault(_onlyUpdateForKeys);

var _reduxForm = __webpack_require__("./node_modules/redux-form/es/index.js");

var _Button = __webpack_require__("./node_modules/material-ui/Button/index.js");

var _Button2 = _interopRequireDefault(_Button);

var _TextInput = __webpack_require__("./src/client/js/utils/inputs/TextInput.js");

var _TextInput2 = _interopRequireDefault(_TextInput);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright Morpheo Org. 2017
 *
 * contact@morpheo.co
 *
 * This software is part of the Morpheo project, an open-source machine
 * learning platform.
 *
 * This software is governed by the CeCILL license, compatible with the
 * GNU GPL, under French law and abiding by the rules of distribution of
 * free software. You can  use, modify and/ or redistribute the software
 * under the terms of the CeCILL license as circulated by CEA, CNRS and
 * INRIA at the following URL "http://www.cecill.info".
 *
 * As a counterpart to the access to the source code and  rights to copy,
 * modify and redistribute granted by the license, users are provided only
 * with a limited warranty  and the software's author,  the holder of the
 * economic rights,  and the successive licensors  have only  limited
 * liability.
 *
 * In this respect, the user's attention is drawn to the risks associated
 * with loading,  using,  modifying and/or developing or reproducing the
 * software by the user in light of its specific status of free software,
 * that may mean  that it is complicated to manipulate,  and  that  also
 * therefore means  that it is reserved for developers  and  experienced
 * professionals having in-depth computer knowledge. Users are therefore
 * encouraged to load and test the software's suitability as regards their
 * requirements in conditions enabling the security of their systems and/or
 * data to be ensured and,  more generally, to use and operate it in the
 * same conditions as regards security.
 *
 * The fact that you are presently reading this means that you have had
 * knowledge of the CeCILL license and that you accept its terms.
 */

var style = {
    main: {
        textAlign: 'left'
    },
    submit: {
        marginTop: 20,
        display: 'block',
        width: '100%'
    },
    input: {
        width: '100%'
    }
};

var SignInForm = function SignInForm(_ref) {
    var signInError = _ref.signInError,
        signIn = _ref.signIn,
        handleSubmit = _ref.handleSubmit;
    return _react2.default.createElement(
        'form',
        { onSubmit: handleSubmit(signIn), style: style.main },
        _react2.default.createElement(_reduxForm.Field, { name: 'uuid', component: _TextInput2.default, type: 'text', placeholder: 'uuid' }),
        signInError && signInError.uuid && signInError.uuid.map(function (error, i) {
            return _react2.default.createElement(
                'span',
                { key: error, className: 'error' },
                error
            );
        }),
        _react2.default.createElement(
            _Button2.default,
            {
                raised: true,
                color: signInError ? 'accent' : 'primary',
                style: style.submit,
                onClick: handleSubmit(signIn)
            },
            'Log in'
        )
    );
};

SignInForm.propTypes = {
    signInError: _propTypes2.default.oneOfType([_propTypes2.default.shape({}), _propTypes2.default.bool]),
    signIn: _propTypes2.default.func,
    handleSubmit: _propTypes2.default.func.isRequired
};

SignInForm.defaultProps = {
    signInError: null,
    signIn: null
};

var _default = (0, _onlyUpdateForKeys2.default)(['signInError'])((0, _reduxForm.reduxForm)({
    form: 'signIn',
    validate: function validate(values) {
        var errors = {};
        var requiredFields = ['uuid'];
        requiredFields.forEach(function (field) {
            if (values && !values[field]) {
                errors[field] = 'Required';
            }
        });
        return errors;
    }
})(SignInForm));

var _default2 = _default;
exports.default = _default2;
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(style, 'style', '/home/guillaume/Projects/morpheo-notebook/src/client/js/business/user/form/signIn.js');

    __REACT_HOT_LOADER__.register(SignInForm, 'SignInForm', '/home/guillaume/Projects/morpheo-notebook/src/client/js/business/user/form/signIn.js');

    __REACT_HOT_LOADER__.register(_default, 'default', '/home/guillaume/Projects/morpheo-notebook/src/client/js/business/user/form/signIn.js');

    __REACT_HOT_LOADER__.register(_default2, 'default', '/home/guillaume/Projects/morpheo-notebook/src/client/js/business/user/form/signIn.js');
}();

;
;

var _temp2 = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }
}();

;

/***/ }),

/***/ "./src/client/js/business/user/selector.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getError = undefined;

var _reselect = __webpack_require__("./node_modules/reselect/lib/index.js");

var error = function error(state) {
    return state.user.error;
}; /**
    * Copyright Morpheo Org. 2017
    *
    * contact@morpheo.co
    *
    * This software is part of the Morpheo project, an open-source machine
    * learning platform.
    *
    * This software is governed by the CeCILL license, compatible with the
    * GNU GPL, under French law and abiding by the rules of distribution of
    * free software. You can  use, modify and/ or redistribute the software
    * under the terms of the CeCILL license as circulated by CEA, CNRS and
    * INRIA at the following URL "http://www.cecill.info".
    *
    * As a counterpart to the access to the source code and  rights to copy,
    * modify and redistribute granted by the license, users are provided only
    * with a limited warranty  and the software's author,  the holder of the
    * economic rights,  and the successive licensors  have only  limited
    * liability.
    *
    * In this respect, the user's attention is drawn to the risks associated
    * with loading,  using,  modifying and/or developing or reproducing the
    * software by the user in light of its specific status of free software,
    * that may mean  that it is complicated to manipulate,  and  that  also
    * therefore means  that it is reserved for developers  and  experienced
    * professionals having in-depth computer knowledge. Users are therefore
    * encouraged to load and test the software's suitability as regards their
    * requirements in conditions enabling the security of their systems and/or
    * data to be ensured and,  more generally, to use and operate it in the
    * same conditions as regards security.
    *
    * The fact that you are presently reading this means that you have had
    * knowledge of the CeCILL license and that you accept its terms.
    */

var getError = exports.getError = (0, _reselect.createSelector)([error], function (error) {
    return error && error.message ? JSON.parse(error.message) : error;
});

var _default = {
    getError: getError
};
var _default2 = _default;
exports.default = _default2;
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(getError, 'getError', '/home/guillaume/Projects/morpheo-notebook/src/client/js/business/user/selector.js');

    __REACT_HOT_LOADER__.register(error, 'error', '/home/guillaume/Projects/morpheo-notebook/src/client/js/business/user/selector.js');

    __REACT_HOT_LOADER__.register(_default, 'default', '/home/guillaume/Projects/morpheo-notebook/src/client/js/business/user/selector.js');

    __REACT_HOT_LOADER__.register(_default2, 'default', '/home/guillaume/Projects/morpheo-notebook/src/client/js/business/user/selector.js');
}();

;
;

var _temp2 = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }
}();

;

/***/ }),

/***/ "./src/client/js/utils/HelmetTitle.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__("./node_modules/react/react.js");

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__("./node_modules/prop-types/index.js");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactHelmet = __webpack_require__("./node_modules/react-helmet/lib/Helmet.js");

var _reactHelmet2 = _interopRequireDefault(_reactHelmet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HelmetTitle = function HelmetTitle(_ref) {
  var title = _ref.title;
  return _react2.default.createElement(_reactHelmet2.default, { title: "Notebook" + (title ? ' - ' + title : '') });
}; /**
    * Copyright Morpheo Org. 2017
    *
    * contact@morpheo.co
    *
    * This software is part of the Morpheo project, an open-source machine
    * learning platform.
    *
    * This software is governed by the CeCILL license, compatible with the
    * GNU GPL, under French law and abiding by the rules of distribution of
    * free software. You can  use, modify and/ or redistribute the software
    * under the terms of the CeCILL license as circulated by CEA, CNRS and
    * INRIA at the following URL "http://www.cecill.info".
    *
    * As a counterpart to the access to the source code and  rights to copy,
    * modify and redistribute granted by the license, users are provided only
    * with a limited warranty  and the software's author,  the holder of the
    * economic rights,  and the successive licensors  have only  limited
    * liability.
    *
    * In this respect, the user's attention is drawn to the risks associated
    * with loading,  using,  modifying and/or developing or reproducing the
    * software by the user in light of its specific status of free software,
    * that may mean  that it is complicated to manipulate,  and  that  also
    * therefore means  that it is reserved for developers  and  experienced
    * professionals having in-depth computer knowledge. Users are therefore
    * encouraged to load and test the software's suitability as regards their
    * requirements in conditions enabling the security of their systems and/or
    * data to be ensured and,  more generally, to use and operate it in the
    * same conditions as regards security.
    *
    * The fact that you are presently reading this means that you have had
    * knowledge of the CeCILL license and that you accept its terms.
    */

/* global APP_NAME */


HelmetTitle.propTypes = {
  title: _propTypes2.default.string.isRequired
};

var _default = HelmetTitle;
var _default2 = _default;
exports.default = _default2;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(HelmetTitle, 'HelmetTitle', '/home/guillaume/Projects/morpheo-notebook/src/client/js/utils/HelmetTitle.js');

  __REACT_HOT_LOADER__.register(_default, 'default', '/home/guillaume/Projects/morpheo-notebook/src/client/js/utils/HelmetTitle.js');

  __REACT_HOT_LOADER__.register(_default2, 'default', '/home/guillaume/Projects/morpheo-notebook/src/client/js/utils/HelmetTitle.js');
}();

;
;

var _temp2 = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }
}();

;

/***/ }),

/***/ "./src/client/js/utils/inputs/TextInput.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = __webpack_require__("./node_modules/babel-runtime/helpers/extends.js");

var _extends3 = _interopRequireDefault(_extends2);

var _getPrototypeOf = __webpack_require__("./node_modules/babel-runtime/core-js/object/get-prototype-of.js");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__("./node_modules/babel-runtime/helpers/classCallCheck.js");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__("./node_modules/babel-runtime/helpers/createClass.js");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__("./node_modules/babel-runtime/helpers/possibleConstructorReturn.js");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__("./node_modules/babel-runtime/helpers/inherits.js");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__("./node_modules/react/react.js");

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__("./node_modules/prop-types/index.js");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _TextField = __webpack_require__("./node_modules/material-ui/TextField/index.js");

var _TextField2 = _interopRequireDefault(_TextField);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TextInput = function (_React$Component) {
    (0, _inherits3.default)(TextInput, _React$Component);

    function TextInput(props) {
        (0, _classCallCheck3.default)(this, TextInput);

        var _this = (0, _possibleConstructorReturn3.default)(this, (TextInput.__proto__ || (0, _getPrototypeOf2.default)(TextInput)).call(this, props));

        _this.onChange = _this.onChange.bind(_this);
        return _this;
    }

    (0, _createClass3.default)(TextInput, [{
        key: 'onChange',
        value: function onChange(e) {
            if (this.props.onChange) {
                this.props.onChange(e.target.value);
            }
            return this.props.input.onChange(e.target.value);
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                input = _props.input,
                placeholder = _props.placeholder,
                _props$type = _props.type,
                type = _props$type === undefined ? 'text' : _props$type,
                _props$meta = _props.meta,
                touched = _props$meta.touched,
                error = _props$meta.error;


            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(_TextField2.default, (0, _extends3.default)({
                    fullWidth: true,
                    type: type,
                    error: touched && !!error,
                    placeholder: placeholder
                }, input, {
                    onChange: this.onChange
                })),
                touched && error && _react2.default.createElement(
                    'span',
                    { className: 'error' },
                    error
                )
            );
        }
    }]);
    return TextInput;
}(_react2.default.Component); /**
                               * Created by guillaume on 7/25/16.
                               */


TextInput.propTypes = {
    input: _propTypes2.default.shape({
        onChange: _propTypes2.default.func
    }),
    placeholder: _propTypes2.default.string,
    type: _propTypes2.default.string,
    onChange: _propTypes2.default.func,
    meta: _propTypes2.default.shape({
        touched: _propTypes2.default.bool,
        error: _propTypes2.default.string
    })
};

var noop = function noop() {};

TextInput.defaultProps = {
    input: null,
    placeholder: '',
    type: 'text',
    onChange: noop,
    meta: null
};

var _default = TextInput;
var _default2 = _default;
exports.default = _default2;
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(TextInput, 'TextInput', '/home/guillaume/Projects/morpheo-notebook/src/client/js/utils/inputs/TextInput.js');

    __REACT_HOT_LOADER__.register(noop, 'noop', '/home/guillaume/Projects/morpheo-notebook/src/client/js/utils/inputs/TextInput.js');

    __REACT_HOT_LOADER__.register(_default, 'default', '/home/guillaume/Projects/morpheo-notebook/src/client/js/utils/inputs/TextInput.js');

    __REACT_HOT_LOADER__.register(_default2, 'default', '/home/guillaume/Projects/morpheo-notebook/src/client/js/utils/inputs/TextInput.js');
}();

;
;

var _temp2 = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }
}();

;

/***/ })

});
//# sourceMappingURL=SignIn.js.map