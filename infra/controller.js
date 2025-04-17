import {
  InternalServerError,
  MethodNotAllowedError,
  ValidationError,
} from "./errors";

function onNoMatchHandler(resquest, response) {
  const publicErrorObject = new MethodNotAllowedError();
  response.status(publicErrorObject.statusCode).json(publicErrorObject);
}
function onErrorHandler(error, resquest, response) {
  if (error instanceof ValidationError) {
    return response.status(error.statusCode).json(error);
  }
  const publicErrorObject = new InternalServerError({
    statusCode: error.statusCode,
    cause: error,
  });

  console.log(publicErrorObject);
  response.status(publicErrorObject.statusCode).json(publicErrorObject);
}
const controller = {
  errorHandlers: {
    onNoMatch: onNoMatchHandler,
    onError: onErrorHandler,
  },
};

export default controller;
