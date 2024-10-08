const express = require('express')
const router = express.Router();
const signUp = require('../controller/user/userSignUp')
const signIn = require('../controller/user/userSignIn');
const authToken = require('../middleware/authToken');
const userDetails = require('../controller/user/userDetails');
const userLogout = require('../controller/user/userLogout');
const allUsers = require('../controller/user/allUsers');
const updateUser = require('../controller/user/updateUser');
const uploadProductController = require('../controller/product/uploadProducts');
const getProduct = require('../controller/product/getProduct');
const updateProduct = require('../controller/product/updateProduct');
const getCategoryProduct = require('../controller/product/getCategoryProduct');
const getCategoryWiseProduct = require('../controller/product/getCategoryWiseProducts');
const getProductDetails = require('../controller/product/getProductDetails');
const addToCart = require('../controller/user/addToCart');
const countAddToCart = require('../controller/user/countAddToCart');
const viewAddToCart = require('../controller/user/viewAddToCart');
const updateAddToCart = require('../controller/user/updateAddToCart');
const deleteAddToCart = require('../controller/user/deleteAddToCart');
const searchProduct = require('../controller/product/serachProduct');
const filterProduct = require('../controller/product/filterProduct');
const payment = require('../controller/payment/payment');

router.post("/signup",signUp);
router.post("/signin",signIn);
router.get('/user-details',authToken,userDetails);
router.get('/userLogout',userLogout)

//admin routes
router.get('/all-user',authToken,allUsers)
router.post('/update-user',authToken,updateUser)

//product
router.post("/upload-product",authToken,uploadProductController)
router.get("/get-product",getProduct)
router.post("/update-product",authToken,updateProduct)
router.get("/get-categoryProduct",getCategoryProduct)
router.post("/category-product",getCategoryWiseProduct)
router.post("/product-details",getProductDetails)
router.get("/search",searchProduct);
router.post("/filter-product",filterProduct)

//cart
router.post("/addToCart",authToken,addToCart)
router.get('/countAddToCart',authToken,countAddToCart)
router.get("/view-cart-products",authToken,viewAddToCart)
router.post("/update-cart-product",authToken,updateAddToCart)
router.post("/delete-cart-product",authToken,deleteAddToCart)

//payment
router.post("/payment",payment)

module.exports = router