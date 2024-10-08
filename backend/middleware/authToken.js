const jwt = require('jsonwebtoken');
async function authToken(req,res,next){
    try {
        const token = req.cookies?.token
        console.log(token)
        if(!token){
            throw new Error("Please Login....");
        }
        jwt.verify(token,process.env.JWT_SECRET,(err,decoded) => {
            if(err){
                console.log("err auth",err);
            }
            req.userId = decoded?._id
            console.log(decoded)
            next()
        })
    } catch (error) {
        console.log(error.message)
        console.log("Error in authToken");
        res.status(400).json({
            message : error.message || error,
            success : false,
            error : true
        })
    }
}

module.exports = authToken