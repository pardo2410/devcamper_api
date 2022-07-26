// use async/await functions as middlewares some DRY

const asyncHandler = fn => (req, res, next) =>
    Promise
        .resolve(fn(req, res, next))
        .catch(next)



module.exports = asyncHandler;