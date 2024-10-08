const cartModel = require("../../models/cartModel");
async function deleteAddToCart(req,res){
    try {
        const userId = req.userId;
        const addToCartProductId = req.body._id;

        const response = await cartModel.deleteOne({_id : addToCartProductId});

        res.status(201).json({
            message : "Product deleted",
            data : response,
            success : true,
            error : false
        })
    } catch (error) {
        console.log("error in deleteAddToCart");
        console.log(error.message);
        res.status(400).json({
            message : error.message || error,
            success : false,
            error : true
        })
    }
}

module.exports = deleteAddToCart