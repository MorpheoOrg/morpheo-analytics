webpackJsonp([1],{

/***/ "./src/client/js/business/settings/reducer.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = __webpack_require__("./node_modules/babel-runtime/helpers/extends.js");

var _extends3 = _interopRequireDefault(_extends2);

var _actions = __webpack_require__("./src/client/js/business/settings/actions.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = function _default(localStorage) {

    var initialState = localStorage && localStorage.getItem('settings') ? JSON.parse(localStorage.getItem('settings')) : {
        theme: 0,
        preferred_language: 0,
        keybindings: {},
        line_numbers: false
    };

    return function () {
        var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
        var _ref = arguments[1];
        var type = _ref.type,
            payload = _ref.payload;

        switch (type) {
            case _actions.actionTypes.theme.SET:
                return (0, _extends3.default)({}, state, {
                    theme: parseInt(payload, 10)
                });
            case _actions.actionTypes.preferred_language.SET:
                return (0, _extends3.default)({}, state, {
                    preferred_language: parseInt(payload, 10)
                });
            case _actions.actionTypes.keybindings.SET:
                return (0, _extends3.default)({}, state, {
                    keybindings: payload
                });
            case _actions.actionTypes.line_numbers.SET:
                return (0, _extends3.default)({}, state, {
                    line_numbers: payload
                });
            case _actions.actionTypes.UPDATE:
                return (0, _extends3.default)({}, state, payload);
            default:
                return state;
        }
    };
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

var _default2 = _default;
exports.default = _default2;
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(_default, 'default', '/home/guillaume/Projects/morpheo-notebook/src/client/js/business/settings/reducer.js');

    __REACT_HOT_LOADER__.register(_default2, 'default', '/home/guillaume/Projects/morpheo-notebook/src/client/js/business/settings/reducer.js');
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
//# sourceMappingURL=reducer.js.map