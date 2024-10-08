const cartModel = require("../../models/cartModel");

async function countAddToCart(req,res){
    try {
        
        const userId = req.userId;
        // console.log(userId);
        const count  = await cartModel.countDocuments({
            userId : userId,
        })
        // console.log(count);
        res.status(201).json({
            data : count,
            message : "Done",
            error : false,
            success : true
        })

    } catch (error) {
        console.log("Error in countAddToCart");
        console.log(error.message);
        res.status(400).json({
            message : error.message || error,
            success : false,
            error : true
        })
    }
}

module.exports = countAddToCart