const userModel = require("../../models/userModel");

async function userDetails(req,res) {
    try {
        const user = await userModel.findById(req.userId);
        res.status(200).json({
            data : user,
            error : false,
            success : true,
            message : "User details"
        })
        
    } catch (error) {
        console.log(error.message);
        res.status(400).json({
            message : error.message || error,
            success : false,
            error : true
        })
    }
}

module.exports = userDetails;