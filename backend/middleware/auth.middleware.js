const jwt = require('jsonwebtoken')
require('dotenv').config();
const auth = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if(token){
        jwt.verify(token,process.env.SECRET_KEY, async (err, decoded) => {
            console.log(decoded);
            if(err){
                return res.status(200).json({message:err.message})
            }else{
                req.role = decoded.role
                next();
            }
        })
    }else{
       return res.status(200).json({message : "you must be logged in"})
    }

}

module.exports = {
    auth
}