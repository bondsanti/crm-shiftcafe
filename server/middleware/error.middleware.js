const errorHandler = (err, req, res, next) => {
  const { statusCode, message, validation } = err
  return res.status(statusCode || 400).json({
    error: {
      status_code: statusCode || 400,
      message,
      validation,
    },
  })
}

export default errorHandler
