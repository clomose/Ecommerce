const productModel = require("../../models/productModel");

async function getProduct(req,res){
    try {

        const response = await productModel.find().sort({createdAt : -1});
        res.status(201).json({
            success : true,
            error : false,
            message : "All Products",
            data : response
        })
        
    } catch (error) {
        console.log("Error in getProduct controller")
        console.log(error.message);
        res.status(400).json({
            message : error.message || error,
            success : false,
            error : true
        })
    }
}

module.exports = getProduct