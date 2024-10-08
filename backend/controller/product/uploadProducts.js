const productModel = require("../../models/productModel");
const permission = require("../../helper/permission")
async function uploadProductController(req,res){
    try {
        
        const sessionUser = req.userId;
        
        if(!permission(sessionUser)){
            throw new Error("Permission denied!")
        }
        const uploadProduct = new productModel(req.body);
        const saveProduct = await uploadProduct.save();

        res.status(201).json({
            message : "Product uploaded successfully",
            success : true,
            error : false,
            data : saveProduct
        })

    } catch (error) {
        console.log("Errpr in uploadProduct controller");
        console.log(error.message);
        res.status(400).json({
            message : error.message || error,
            success : false,
            error : true
        })
    }
}

module.exports = uploadProductController