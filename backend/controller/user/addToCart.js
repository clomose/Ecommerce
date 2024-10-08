const cartModel = require("../../models/cartModel");

async function addToCart(req,res){
    try {
        const {productId} = req.body;

        const findProduct = await cartModel.findOne({productId});

        if(findProduct){
            res.status(201).json({
                message : "Product is already in cart",
                error : true,
                success : false
            })
            return;
        }

        const userId = req.userId;
        const payload = {
            productId : productId,
            quatity : 1,
            userId : userId
        }

        const newCart = new cartModel(payload);
        const saveData = await newCart.save();
        console.log("Hello",saveData)
        res.status(201).json({
            message : "Product added to add to cart",
            data : newCart,
            error : false,
            success : true
        })


    } catch (error) {
        console.log("Error in addToCart");
        console.log(error.message);
        res.status(400).json({
            message : error.message || error,
            success : false,
            error : true
        })
    }
}

module.exports = addToCart