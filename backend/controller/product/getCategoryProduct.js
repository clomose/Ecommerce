const productModel = require("../../models/productModel");

async function getCategoryProduct(req,res){
    try {
        
        const categoryProduct = await productModel.distinct("category");
        console.log("Category",categoryProduct);
        
        //array to store one product from each category
        const productByCategory = [];

        for(const category of categoryProduct){
            const product = await productModel.findOne({category});

            if(product){
                productByCategory.push(product)
            }
        }

        res.status(201).json({
            message : "category product",
            error : false,
            success : true,
            data : productByCategory
        })

    } catch (error) {
        console.log("Error in getCategoryProduct");
        console.log(error.message);
        res.status(400).json({
            message : error.message || error,
            success : false,
            error : true
        })
    }
}

module.exports = getCategoryProduct
