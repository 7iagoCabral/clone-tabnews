import { InternalServerError, MethodNotAllowedError } from "./errors";

function onNoMatchHandler(resquest, response) {
  const publicErrorObject = new MethodNotAllowedError();
  response.status(publicErrorObject.statusCode).json(publicErrorObject);
}
function onErrorHandler(error, resquest, response) {
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
