const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    productId : {
        ref : 'product',
        type : String
    },
    quatity : Number,
    userId : String
},{timestamps : true})

const cartModel = mongoose.model("addToCart",cartSchema);

module.exports = cartModel;