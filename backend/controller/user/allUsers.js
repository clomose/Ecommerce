const userModel = require("../../models/userModel");

async function allUsers(req,res){
    try {
        const user = req.userId;
        console.log(user);
        const allUser = await userModel.find();
        res.status(200).json({
            message :"All Users",
            success : true,
            error : false,
            data : allUser 
        })
    } catch (error) {
        console.log("error in allUser",error.message);
        res.status(400).json({
            message : error.message || error,
            success : false,
            error : true
        })
    }
}

module.exports = allUsers
