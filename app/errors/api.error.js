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
      // Maintenir une trace de la pile correcte (seulement dans les moteurs V8 comme Node.js)
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, this.constructor);
      }
    }
  }
  