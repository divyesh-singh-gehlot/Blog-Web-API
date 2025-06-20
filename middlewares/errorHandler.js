const errorHandler = (error, req, res, next) => {
    const statusCode = res.code ? res.code : 500;

    res.status(statusCode).json({code: statusCode , status: false, message:error.message});
}

module.exports = errorHandler;