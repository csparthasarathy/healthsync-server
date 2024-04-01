const jwt = require('jsonwebtoken');

module.exports = (req,res,next)=>{
    try{
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token,'secret');
        next();
    }
    catch(error){
        return res.status(404).json({
            error:'Invalid Token or Token Expired. Please Login Again'
        })
    }
}