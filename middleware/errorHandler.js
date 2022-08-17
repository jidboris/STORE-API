const errorHandler = async function (err,req,res,next) {
    res.status(500).json({msg: 'something went wrong, please try again'})
}

module.exports = errorHandler;