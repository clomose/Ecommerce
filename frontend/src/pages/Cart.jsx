import React, { useContext, useEffect, useState } from 'react'
import Header from '../components/Header'
import axios from 'axios';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import Context from '../context';
import displayINRCurrency from '../helpers/displayCurrency';
import { MdDelete } from "react-icons/md";
import {loadStripe} from '@stripe/stripe-js';


const Cart = () => {
    const [data,setData] = useState([]);
    const [loading,setLoading] = useState(false);
    const context = useContext(Context);

    const loadingCart = new Array(context.countCart).fill(null);
    const fetchData = async() => {
        
        const fetch = await axios.get(SummaryApi.addToCartProductView.url,{withCredentials : true});
        const response = fetch.data;

        if(response.success){
            setData(response.data);
        }else{
            toast.error(response.message);
        }
          
    }

    const handleLoading = async() =>{
        setLoading(true);
        await fetchData()
        setLoading(false);
    }
    useEffect(() => {
        handleLoading()
    },[])

    // console.log("Cart data",data);

    const increaseQty = async(id,qty) => {
        const fetch = await axios.post(SummaryApi.updateCartProduct.url,{quantity : qty+1,_id:id},{withCredentials:true});

        const response = fetch.data;
        if(response.success){
            fetchData();
        }
    }

    const decreaseQty = async(id,qty) => {
        if(qty>=2){
            const fetch = await axios.post(SummaryApi.updateCartProduct.url,{quantity : qty-1,_id : id},{withCredentials:true});

            const response = fetch.data
            if(response.success){
                fetchData();
            }
        }
    }

    const deleteProduct = async(id) => {
        const fetch = await axios.post(SummaryApi.deleteCartProduct.url,{_id:id},{withCredentials:true});

        const response = fetch.data;
        if(response.success){
            fetchData();
            context.fetchAddToCart();
        }
    }

    const totalQty = data.reduce((prev,curr)=> prev+curr.quatity,0);
    const totalPrice = data.reduce((prev,curr) => prev+(curr.quatity * curr?.productId?.selling),0);
    console.log("cart data",data); 


    const makePayment = async() =>{
        const stripe = await loadStripe("pk_test_51PyZ5BFy9kd0BTbNr99CFmit93B8pAA2hDH5yJfMoNOHdslnDYnDxLFnXDjlFopnL8i7zCMWUq6jl3XsxyTO8zBG00hN28XEa9")

        const fetch = await axios.post(SummaryApi.payment.url,{products : data})
        const response = fetch.data;
        const result = stripe.redirectToCheckout({
            sessionId : response.id
        })
    }
  return (
    <>
    <Header></Header>
    <div className='container mx-auto'>
        <div className='text-center text-lg my-3'>
            {
                data.length===0 && !loading && (
                    <p className='bg-white py-5'>No Data</p>
                )
            }
        </div>
        <div className='flex flex-col lg:flex-row gap-10 lg:justify-between'>
            {/* view product  */}
            <div className='w-full max-w-3xl'>
                {
                    loading ? (
                        loadingCart.map((el,index) => {
                            return(
                                <div key={index} className='w-full bg-slate-200 h-32 rounded my-2 border border-slate-300 animate-pulse'>
                                 
                                </div>
                            )
                        }) 
                    ) : (
                        data.map((product,index) => { 
                            return(
                                <div key={index+"product"} className='w-full bg-white h-32 rounded my-2 border border-slate-300 mx-auto'>
                                    <div className='h-32 flex relative'>
                                        <div className='h-full w-32 bg-slate-200'>
                                            <img src={product?.productId?.productImage[0]} alt="" className='h-full w-full object-scale-down mix-blend-multiply'/>
                                        </div>
                                        <div className='px-4 py-2 w-full'>
                                            <div className='text-lg lg:text-xl'>{product?.productId?.productName}</div>
                                            <div className='capitalize text-slate-500'>{product?.productId?.category}</div>
                                            <div className='flex justify-between items-center w-full'>
                                                <p className='text-lg font-medium text-red-600'>{displayINRCurrency(product?.productId?.selling)}</p>
                                                <p className='text-lg font-medium text-slate-600'>{displayINRCurrency(product?.productId?.selling * product?.quatity)}</p>
                                            </div>
                                            <div className='flex gap-2 mt-1'>
                                                <button onClick={() => {decreaseQty(product?._id,product?.quatity)}} className='h-6 w-6 border text-red-700 border-red-700 flex items-center justify-center rounded hover:bg-red-500 hover:text-white'>-</button>
                                                <span>{product?.quatity}</span>
                                                <button onClick={() => {increaseQty(product?._id,product?.quatity)}} className='h-6 w-6 border text-red-700 border-red-700 flex items-center justify-center rounded hover:bg-red-500 hover:text-white'>+</button>
                                            </div>
                                        </div>
                                        <div onClick={() => {deleteProduct(product?._id)}} className='absolute right-0 rounded-full p-2 text-red-600 hover:bg-red-600 hover:text-white cursor-pointer'>
                                                <MdDelete />
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    )
                }
            </div>
            <div className='mt-5 lg:mt-0 w-full max-w-sm'>
                {
                    loading ? (
                        <div className='h-36 bg-slate-200 border border-slate-300 animate-pulse'>
                            total
                        </div>
                    ) : (
                        <div className='h-36 bg-white'>
                            <div className='p-2 bg-red-500 text-white'>Summary</div>
                            <div className='flex items-center text-lg justify-between px-4 text-slate-700'>
                                <p className='font-bold'>Quantity</p>
                                <p>{totalQty}</p>
                            </div>
                            <div className='flex items-center text-lg justify-between px-4 text-slate-700'>
                                <p className='font-bold'>Total Price</p>
                                <p>{displayINRCurrency(totalPrice)}</p>
                            </div>
                            <button className='w-full bg-blue-700 p-2 mt-2 text-white' onClick={makePayment}>Payment</button>
                        </div>
                    )
                }
            </div>
        </div>
    </div>
    </>
  )
}

export default Cart