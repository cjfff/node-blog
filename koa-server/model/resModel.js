class BaseModel {
  constructor(payload, msg) {
    if (typeof payload === "string") {
      this.msg = payload;
      payload = null;
      msg = null;
    }
    if (payload) {
      this.payload = payload;
    }
    if (msg) {
      this.msg = msg;
    }
  }
}

class SuccessModel extends BaseModel {
  constructor(payload, msg) {
    super(payload, msg);
    this.code = 0;
  }
}

class ErrorModel extends BaseModel {
  constructor(payload, msg) {
    super(payload, msg);
    this.code = -1;
  }
}

module.exports = {
  SuccessModel,
  ErrorModel
};
