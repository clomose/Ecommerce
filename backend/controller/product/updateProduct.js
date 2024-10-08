const permission = require("../../helper/permission");
const productModel = require("../../models/productModel");

async function updateProduct(req,res){
    try {
       if(!permission(req.userId)){
            throw new Error("Permission Denied");
       } 
       const {_id,...restBody} = req.body;
       const updateProduct = await productModel.findByIdAndUpdate(_id,restBody);

       res.status(201).json({
        message : "Product updated successfully",
        error : false,
        success : true,
        data : updateProduct
       })

    } catch (error) {
        console.log("Error in update product controller");
        console.log(error.message);
        res.status(400).json({
            message : error.message || error,
            success : false,
            error : true
        })
    }
}

module.exports = updateProduct