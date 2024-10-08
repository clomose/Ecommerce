async function userLogout(req,res){
    try{
        res.clearCookie("token");

        res.json({
            message : "Logged out successfully",
            error : false,
            success : true,
            data : []
        })

    }catch(error){
        console.log(error.message);
        res.json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

module.exports = userLogout