const userModel = require("../models/userModel");

async function permission(userId){
    const user = await userModel.findById(userId);

    if(user.role === "ADMIN"){
        return true
    }else{
        return false
    }
}

module.exports = permission