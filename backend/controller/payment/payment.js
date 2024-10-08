const stripe = require('stripe')(process.env.STRIPE_SECRET)

const payment = async(req,res) => {
    try {
        const {products} = req.body

        const lineItems = products.map((product) => ({
            price_data:{
                currency:"inr",
                product_data : {
                    name : product.productId.productName,
                    images : [product.productId.productImage[0]]
                },
                unit_amount: Math.round(product.productId.selling * 100),
            },
            quantity : product.quatity
        }))

        const session = await stripe.checkout.sessions.create({
            payment_method_types : ["card"],
            line_items:lineItems,
            mode:"payment",
            success_url : "http://localhost:5173/",
            cancel_url :   "http://localhost:5173/cart"
        })
        res.json({id:session.id})
    } catch (error) {
        console.log("Error",error.message)
    }
}

module.exports = payment;