import axios from 'axios'
import React, { useEffect, useState } from 'react'
import SummaryApi from '../common'
import { Link } from 'react-router-dom'

const CategoryList = () => {
    const [categoryProducts,setCategoryProducts] = useState([])
    const [loading,setLoading] = useState(false);
    const categoryLoading = new Array(13).fill(null)
        
    const getCategoryProduct = async() => {
        setLoading(true)
        const response = await axios.get(SummaryApi.categoryProduct.url);
        setLoading(false)
        console.log(response.data);
        if(response?.data?.success){
            setCategoryProducts(response.data.data);
        }
    }

    useEffect(() => {
        getCategoryProduct()
    },[])
  return (
    <div className='container mx-auto p-4'>
        <div className='flex items-center gap-4 justify-between overflow-x-scroll no-scrollbar'>
            {

                loading ? (
                    categoryLoading.map((el,index) => {
                        return(
                            <div className='w-16 h-16 md:w-20 md:h-20 p-3 overflow-hidden bg-slate-200 rounded-full animate-pulse' key={"categoryIndex"+index}>
                                
                            </div>
                        )
                    })
                ) : (
                    categoryProducts.map((el,index) => {
                        return(
                            <Link to={'product-category?category='+el.category} className='cursor-pointer'>
                                <div className='w-16 h-16 rounded-full md:w-20 md:h-20 overflow-hidden p-3 bg-slate-200 flex items-center justify-center'>
                                    <img src={el?.productImage[2]} alt={el.category} className='h-full object-scale-down mix-blend-multiply hover:scale-110 transition-all'/>
                                </div>
                                <p className='text-center text-sm md:text-base capitalize'>
                                    {el?.category}
                                </p>
                            </Link>
                        )
                    })
                )
            }
        </div>
    </div>
  )
}

export default CategoryList