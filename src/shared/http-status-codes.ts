enum HttpStatusCode {
  OK = 200,
  Created = 201,
  Accepted = 202,

  // Errors
  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  UnprocessableEntity = 422,
  InternalError = 500
}

export default HttpStatusCode;
