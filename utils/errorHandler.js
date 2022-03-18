const globalErrorHandler = (err, req, res, next) => {
  //default values
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'fail';

  //next middleware when catchAsync find the err
  res.status(err.statusCode).json({
    //( utils )
    status: err.status,
    message: err.message,
    stack: err.stack
  });
};

module.exports = { globalErrorHandler };
