const cartModel = require("../../models/cartModel");

async function viewAddToCart(req,res){
    try {
        
        const userId = req.userId;
        const response = await cartModel.find({
            userId : userId
        }).populate("productId");

        res.status(201).json({
            data : response,
            success : true,
            error : false,
            message : "OK"
        })

    } catch (error) {
        console.log("Error in viewAddToCart");
        console.log(error.message);
        res.status(400).json({
            message : error.message || error,
            success : false,
            error : true
        })
    }
}

module.exports = viewAddToCart