export default class ApiError extends Error {

    constructor(message, causeObj) {
        super(message);
        this.name = this.constructor.name;
        if (causeObj) {
            this.status = causeObj.status;
            this.cause = causeObj;
        } else {
            this.status = null;
            this.cause = null;
        }
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
