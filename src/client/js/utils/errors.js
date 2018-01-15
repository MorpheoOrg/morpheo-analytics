// Error is bad implemented in previous version of js so we need to define
// a new error class to use instanceof correctly
// https://stackoverflow.com/a/32749533
function ES6Error(...args) {
    const instance = new Error(...args);
    Object.setPrototypeOf(instance, Object.getPrototypeOf(this));
    return instance;
}
ES6Error.prototype = Object.create(Error.prototype, {
    constructor: {
        value: Error,
        enumerable: false,
        writable: true,
        configurable: true,
    },
});
Object.setPrototypeOf(ES6Error, Error);


class ExtendableError extends ES6Error {
    constructor(...params) {
        // Pass remaining arguments (including vendor specific ones)
        // to parent constructor
        super(...params);

        // Maintains proper stack trace for where our error was thrown
        // (only available on V8)
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}


export class FetchError extends ExtendableError {
    constructor(message, status) {
        super(message);
        this.status = status || 500;

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}


export default {
    FetchError,
};
