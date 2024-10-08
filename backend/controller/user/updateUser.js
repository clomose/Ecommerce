const userModel = require('../../models/userModel');

async function updateUser(req,res){
    try {

        const adminId = req.userId;

        const {userId,email,name,role} = req.body;

        const payload = {
            ...(email && {email:email}),
            ...(name && {name : name}),
            ...(role && {role : role})
        }

        const user = await userModel.findById(adminId);
        console.log("user.role",user.role);

        const updateUser = await userModel.findByIdAndUpdate(userId,payload);

        res.json({
            message  : "User Updated",
            error : false,
            success : true,
            data : updateUser
        })

    } catch (error) {
        console.log("error in updateUser");
        console.log(error.message);
        res.status(400).json({
            message : error.message || error,
            success : false,
            error : true
        })
    }
}

module.exports = updateUser