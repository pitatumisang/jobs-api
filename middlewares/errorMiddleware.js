const errorHandler = (err, req, res, next) => {
  let message = err.message || 'Something went wrong';
  let statusCode = err.statusCode || 500;

  if (err.code === 11000) {
    message = `Email already exists`;
    statusCode = 400;
  }

  if (err.name === 'CastError') {
    message = `Job with id: ${err.value} not found`;
    statusCode = 404;
  }

  return res.status(statusCode).json({ success: false, message });
};

module.exports = errorHandler;
