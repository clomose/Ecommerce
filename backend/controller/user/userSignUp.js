const bcrypt = require('bcrypt');
const userModel = require('../../models/userModel');
async function userSignUp(req,res){
    try {
        const {name , email , password} = req.body

        if(!name){
            throw new Error("Please provide name");
        }
        if(!email){
            throw new Error("Please provide email");
        }
        if(!password){
            throw new Error("Please provide password");
        }

        const userEmail = await userModel.findOne({email});
        if(userEmail){
            throw new Error("Email already exist");
        }

        const hashPassword = await bcrypt.hash(password,10);

        if(!hashPassword){
            throw new Error("Password is not hashed")
        }

        const payload = {
            ...req.body,
            role : "GENERAL",
            password : hashPassword
        }

        const user = new userModel(payload);
        if(!user){
            throw new Error("Error in making new model")
        }
        await user.save()
        console.log("User created successfully");
        res.status(201).json({
            data : user,
            success : true,
            error : false,
            message : "User created successfully"
        })

    } catch (error) {
        console.log(error.message)
        res.json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
} 

module.exports = userSignUp