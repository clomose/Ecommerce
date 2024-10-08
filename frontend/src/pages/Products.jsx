import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { useDispatch, useSelector } from 'react-redux';
import { FaRegCircleUser } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import UploadProduct from '../components/UploadProduct';
import axios from 'axios';
import SummaryApi from '../common';
import AdminProductCard from '../components/AdminProductCard';
const Products = () => {
    const user = useSelector(state => state.user)
    const [openUploadProduct,setOpenUploadProduct] = useState(false);
    const [allProduct,setAllProduct] = useState([]);

    const fetchAllProducts = async() =>{
        const products = await axios.get(SummaryApi.allProduct.url);
        // console.log("All products ---->",products.data.data);
        setAllProduct(products?.data?.data || [])
    }

    useEffect(()=>{
        fetchAllProducts()
    },[])

  return (
    <>
    <Header></Header>
    <div className='min-h-[calc(100vh-120px)] md:flex hidden max-h-[calc(100vh-120px)]'>
        <div className='min-h-full bg-white w-full max-w-60 shadow-lg'>
            <div className='h-32 flex justify-center items-center flex-col'>
                <div className='cursor-pointer flex justify-center relative text-5xl'>
                    {user?.user?.data?.profilePic ? (
                        <img src={user?.user?.data?.profilePic} alt="" srcset="" className='h-20 w-20 rounded-full' />
                    ) : (<FaRegCircleUser></FaRegCircleUser>)}
                </div>
                <p className=' capitalize font-semibold text-lg'>{user?.user?.data?.name}</p>
                <p className='text-sm'>{user?.user?.data?.role}</p>
            </div>
            <div>
                <nav className='flex flex-col p-3'>
                    <Link to={"/adminPanel/all-users"} className='px-2 py-2 hover:bg-slate-100'>All Users</Link>
                    <Link to={"/adminPanel/products"} className='px-2 py-2 hover:bg-slate-100'>Products</Link>
                </nav>
            </div>
        </div>
        <div className='w-full h-full p-2'>
            <div>
                <div className='bg-white py-2 px-4 flex justify-between items-center'>
                    <div className='font-bold text-lg'>All Products</div>
                    <button className='border py-2 px-3 rounded-full cursor-pointer transition-all border-red-500 text-red-500 hover:bg-red-600 hover:text-white' onClick={() => {setOpenUploadProduct(true)}}>Upload Products</button>
                </div>

                {/* All Products */}
                <div className='flex items-center flex-wrap gap-5 py-4 h-[calc(100vh-190px)] overflow-y-scroll'>
                    {
                        allProduct.map((product,index) =>{
                            return(
                                <AdminProductCard data={product} key={index+"allProduct"} fetchData={fetchAllProducts} ></AdminProductCard>
                            )
                        })
                    }
                </div>

                {openUploadProduct && (
                    <UploadProduct onClose={() => {setOpenUploadProduct(false)}} fetchData={fetchAllProducts}></UploadProduct>
                )}
            </div>
        </div>
    </div>
    </>
  )
}

export default Products