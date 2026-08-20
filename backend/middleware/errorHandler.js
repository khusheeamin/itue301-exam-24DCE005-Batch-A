function errorHandler(error, request, response, next) {
    console.error(error.message);
    const statusCode = error.statusCode || 500;
    response.status(statusCode).json({
        success: false,
        message: statusCode === 500 ? 'Internal server error' : error.message
    });
}

module.exports = errorHandler;
