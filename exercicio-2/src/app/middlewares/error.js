import { ErrorCustom } from "../../errors/error-custom.js";

const errorHandling = (err, req, resp, next) => {
  let status = 500;
  let error = "internal server error";

  if (err instanceof ErrorCustom) {
    const body = JSON.parse(err.message);
    status = body.status;
    error = body.error;
  }

  return resp.status(status).send({
    error,
  });
};

export { errorHandling };