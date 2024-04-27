
const access = (...roles) => {
    return (req,res,next) => {
        if(roles.includes(req.role)){
            next();
        }else{
            res.status(200).json({message:"your are not authorized"});
        }
    }
}

module.exports = {
    access
}