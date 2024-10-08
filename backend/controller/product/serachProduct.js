const productModel = require("../../models/productModel");

async function searchProduct(req,res) {
    try {
        const query = req.query.q
        //helpful in searches
        const regex = new RegExp(query,'i','g');
        const product = await productModel.find({
            "$or" : [
                {
                    category : regex
                },
                {
                    productName : regex
                }
            ]
        })
        res.status(201).json({
            data : product,
            success : true,
            error : false,
            message : "Search"
        })
    } catch (error) {
        console.log("Error in searchProduct controller");
        console.log(error.message);
        res.status(400).json({
            message : error.message || error,
            success : false,
            error : true
        })
    }
}

module.exports = searchProduct;