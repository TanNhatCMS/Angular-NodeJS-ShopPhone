class APIError extends Error {
  constructor(message, code, errors = null, data = false) {
    super(message);
    this.message = message;
    this.status = code;
    this.errors = errors;
    this.data = data;
  }
}

module.exports = APIError;
