
// @desc    Error handler for not found endpoint
// @url     *
// @access  Public
const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
}

// @desc     Error handler for route errors
// @url      *
// @access   Public
const errorHandler = (err, req, res, next) => {
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message;
    
    // Handler mongoose CastError
    if(err.name === 'CastError' && err.kind === "ObjectId") {
        statusCode = 404;
        message = "Resource not found";
    }

    // Stack gives more information about the error (line number etc.)
    res.status(statusCode).json({
        message,
        stack: process.env.NODE_ENV === "production" ? null : err.stack
    });
}

export { notFound, errorHandler };