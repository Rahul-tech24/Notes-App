const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode ?? res.statusCode;
  let message = err.message || "Server error";
  let details = err.details;

  if (!statusCode || statusCode < 400) {
    statusCode = 500;
  }

  if (err.name === "CastError") {
    statusCode = 400;
    message = `Invalid ${err.path}`;
  }

  if (err.name === "ValidationError") {
    statusCode = 400;
    message = "Validation failed";
    details = Object.values(err.errors).map(({ path, message: fieldMessage }) => ({
      path,
      message: fieldMessage
    }));
  }

  if (err.code === 11000) {
    statusCode = 409;
    message = "Resource already exists";
  }

  const payload = { message };

  if (details) {
    payload.details = details;
  }

  if (process.env.NODE_ENV !== "production") {
    payload.stack = err.stack;
  }

  res.status(statusCode).json(payload);
};

export default errorHandler;
