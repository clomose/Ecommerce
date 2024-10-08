const productModel = require("../../models/productModel");


async function filterProduct(req,res) {
    try {
        const categoryList = req?.body?.category || [];
        const product = await productModel.find({
            category : {
                "$in" : categoryList
            }
        })

        res.status(201).json({
            message : "Product",
            data : product,
            error : false,
            success : true
        })
    } catch (error) {
        console.log("Error in filterProduct");
        console.log(error.message);
        res.status(400).json({
            message : error.message || error,
            success : false,
            error : true
        })
    } 
}

module.exports = filterProduct;