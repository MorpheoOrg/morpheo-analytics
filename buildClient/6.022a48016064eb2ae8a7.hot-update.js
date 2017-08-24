webpackHotUpdate(6,{

/***/ "./src/client/js/business/user/sagas.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.signOut = exports.signIn = undefined;

var _regenerator = __webpack_require__("./node_modules/babel-runtime/regenerator/index.js");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _toConsumableArray2 = __webpack_require__("./node_modules/babel-runtime/helpers/toConsumableArray.js");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _reduxFirstRouter = __webpack_require__("./node_modules/redux-first-router/dist/index.js");

var _effects = __webpack_require__("./node_modules/redux-saga/es/effects.js");

var _actions = __webpack_require__("./src/client/js/business/user/actions.js");

var _actions2 = __webpack_require__("./src/client/js/business/settings/actions.js");

var _api = __webpack_require__("./src/client/js/business/user/api.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log('load user sagas'); /**
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

/* globals atob */

var signIn = exports.signIn = function signIn(fetchSignIn, storeLocalUser) {
    return (/*#__PURE__*/_regenerator2.default.mark(function signInSaga(_ref) {
            var _ref$payload = _ref.payload,
                uuid = _ref$payload.uuid,
                previousRoute = _ref$payload.previousRoute;

            var _ref2, error, res, settings, access_token, _JSON$parse, _uuid;

            return _regenerator2.default.wrap(function signInSaga$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:

                            console.log('sagas');

                            _context.next = 3;
                            return (0, _effects.call)(fetchSignIn, uuid);

                        case 3:
                            _ref2 = _context.sent;
                            error = _ref2.error;
                            res = _ref2.res;

                            if (!error) {
                                _context.next = 12;
                                break;
                            }

                            console.error(error);
                            _context.next = 10;
                            return (0, _effects.put)(_actions.signIn.failure(error));

                        case 10:
                            _context.next = 22;
                            break;

                        case 12:
                            settings = res.settings, access_token = res.access_token;
                            _JSON$parse = JSON.parse(atob(access_token.split('.')[1])), _uuid = _JSON$parse.uuid;
                            _context.next = 16;
                            return (0, _effects.call)(storeLocalUser, { uuid: _uuid, settings: settings, access_token: access_token });

                        case 16:
                            _context.next = 18;
                            return (0, _effects.put)(_actions.signIn.success({ uuid: _uuid }));

                        case 18:
                            _context.next = 20;
                            return (0, _effects.put)(_actions2.actions.update.apply(_actions2.actions, (0, _toConsumableArray3.default)(settings)));

                        case 20:
                            _context.next = 22;
                            return (0, _effects.put)((0, _reduxFirstRouter.redirect)(previousRoute));

                        case 22:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, signInSaga, this);
        })
    );
};

var signOut = exports.signOut = function signOut(removeLocalUser) {
    return (/*#__PURE__*/_regenerator2.default.mark(function signOutSaga() {
            return _regenerator2.default.wrap(function signOutSaga$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            _context2.next = 2;
                            return (0, _effects.call)(removeLocalUser);

                        case 2:
                            _context2.next = 4;
                            return (0, _effects.put)(_actions.signOut.success());

                        case 4:
                            _context2.next = 6;
                            return (0, _effects.put)(_actions2.actions.update({ theme: null, preferred_language: null, keybindings: null }));

                        case 6:
                            _context2.next = 8;
                            return (0, _effects.put)((0, _reduxFirstRouter.redirect)({ type: 'HOME' }));

                        case 8:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, signOutSaga, this);
        })
    );
};

/* istanbul ignore next */
var sagas = /*#__PURE__*/_regenerator2.default.mark(function sagas() {
    return _regenerator2.default.wrap(function sagas$(_context3) {
        while (1) {
            switch (_context3.prev = _context3.next) {
                case 0:
                    _context3.next = 2;
                    return (0, _effects.all)([(0, _effects.takeLatest)(_actions.actionTypes.signIn.REQUEST, signIn(_api.fetchSignIn, _api.storeLocalUser)), (0, _effects.takeLatest)(_actions.actionTypes.signOut.REQUEST, signOut(_api.removeLocalUser))]);

                case 2:
                case 'end':
                    return _context3.stop();
            }
        }
    }, sagas, this);
});

var _default = sagas;
var _default2 = _default;
exports.default = _default2;
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(signIn, 'signIn', '/home/guillaume/Projects/morpheo-notebook/src/client/js/business/user/sagas.js');

    __REACT_HOT_LOADER__.register(signOut, 'signOut', '/home/guillaume/Projects/morpheo-notebook/src/client/js/business/user/sagas.js');

    __REACT_HOT_LOADER__.register(sagas, 'sagas', '/home/guillaume/Projects/morpheo-notebook/src/client/js/business/user/sagas.js');

    __REACT_HOT_LOADER__.register(_default, 'default', '/home/guillaume/Projects/morpheo-notebook/src/client/js/business/user/sagas.js');

    __REACT_HOT_LOADER__.register(_default2, 'default', '/home/guillaume/Projects/morpheo-notebook/src/client/js/business/user/sagas.js');
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

})
//# sourceMappingURL=6.022a48016064eb2ae8a7.hot-update.js.map