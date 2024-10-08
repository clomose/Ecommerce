const productModel = require("../../models/productModel");
const getProductDetails = async(req,res) => {
    try {

        const {productId} = req.body

        const product = await productModel.findById(productId);

        res.status(201).json({
            message : "Product",
            data : product,
            error : false,
            success : true
        })
        
    } catch (error) {
        console.log("Error in getProductDetails controller");
        console.log(error.message);
        res.status(400).json({
            message : error.message || error,
            success : false,
            error : true
        })
    }
}

module.exports = getProductDetails