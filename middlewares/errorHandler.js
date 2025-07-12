const errorHandler = (err, req, res, next) => {
  console.error('Error:', err)
  const statusCode = err.status || 500
  res.status(statusCode).json({
    status: 'error',
    message: err
  })
}

export default errorHandler
