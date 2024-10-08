const cartModel = require("../../models/cartModel");

async function updateAddToCart(req,res) {
    try {
        
        const userId = req.userId;
        const addToCartProductId = req.body._id;
        const quantity = req.body.quantity

        const updateProduct = await cartModel.updateOne({_id : addToCartProductId},{
            ...(quantity && {quatity : quantity})
        })

        res.json({
            message : "Product updated",
            data : updateProduct,
            success : true,
            error : false
        })

    } catch (error) {
        console.log("error in updateAddToCart");
        console.log(error.message);
        res.status(400).json({
            message : error.message || error,
            success : false,
            error : true
        })
    }
}

module.exports = updateAddToCart