const userModel = require('../../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
async function userSignIn(req,res){
    try {
        const {password,email} = req.body
        if(!email){
            throw new Error("Please provide email");
        }
        if(!password){
            throw new Error("Please provide password");
        }
        const user = await userModel.findOne({email})
        if(!user){
            throw new Error("User not found")
        }

        const checkPassword = await bcrypt.compare(password,user.password)
        if(checkPassword){
            const tokenData = {
                _id : user._id,
                email : user.email
            }
            const token = await jwt.sign(tokenData,process.env.JWT_SECRET,{expiresIn : 60*60*8 } );
            const tokenOptions = {
                httpOnly : true,
                secure : true
            }
            res.cookie('token',token,tokenOptions);
            res.json({
                message : "Login successful!!",
                data : token,
                success : true,
                error : false
            })

        }else{
            throw new Error("Password is Incorrect")
        }

    } catch (error) {
        console.log(error.message);
        res.json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

module.exports = userSignIn