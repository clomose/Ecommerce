const backendDomain = "http://localhost:8080"

const SummaryApi = {
    signUp : {
        url : `${backendDomain}/api/signup`
    },
    signIn : {
        url : `${backendDomain}/api/signin`
    },
    current_user : {
        url : `${backendDomain}/api/user-details`
    },
    logout_user : {
        url : `${backendDomain}/api/userLogout`
    },
    allUser : {
        url : `${backendDomain}/api/all-user`
    },
    updateUser : {
        url : `${backendDomain}/api/update-user`
    },
    uploadProduct : {
        url : `${backendDomain}/api/upload-product`
    },
    allProduct : {
        url : `${backendDomain}/api/get-product`
    },
    updateProduct : {
        url : `${backendDomain}/api/update-product`
    },
    categoryProduct : {
        url : `${backendDomain}/api/get-categoryProduct`
    },
    categoryWiseProduct : {
        url : `${backendDomain}/api/category-product`
    },
    productDetails : {
        url : `${backendDomain}/api/product-details`
    },
    addToCart : {
        url : `${backendDomain}/api/addToCart`
    },
    countAddToCart : {
        url : `${backendDomain}/api/countAddToCart`
    },
    addToCartProductView : {
        url : `${backendDomain}/api/view-cart-products`
    },
    updateCartProduct : {
        url : `${backendDomain}/api/update-cart-product`
    },
    deleteCartProduct : {
        url : `${backendDomain}/api/delete-cart-product`
    },
    searchProduct : {
        url : `${backendDomain}/api/search`
    },
    filterProduct : {
        url : `${backendDomain}/api/filter-product`
    },
    payment : {
        url : `${backendDomain}/api/payment`
    }
}

export default SummaryApi