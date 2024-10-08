import React, { useContext, useEffect, useRef, useState } from 'react'
import categoryWiseProduct from '../helpers/fetchCategoryWiseProduct';
import displayINRCurrency from '../helpers/displayCurrency';
import addToCart from '../helpers/addToCart';
import Context from '../context';
import { Link } from 'react-router-dom';
import scrollTop from '../helpers/scrollTop';

const CategoryWiseProduct = ({category,heading}) => {
    const [data,setData] = useState([]);
    const [loading,setLoading] = useState(true);
    const loadingList = new Array(13).fill(null)

    const fetch = async() => {
        setLoading(true)
        const fetchData = await categoryWiseProduct(category);
        setData(fetchData.data);
        setLoading(false)
    }
    const {fetchAddToCart} = useContext(Context)
    const handleOnClick = async(e,id) => {
        await addToCart(e,id)
        fetchAddToCart();
    }
    useEffect(() => {
        fetch()
    },[])
  return (
    <div className='container mx-auto px-4 py-4 relative'>
            <h2 className='text-2xl font-semibold py-4'>{heading}</h2>
            <div  className='flex flex-wrap gap-20 p-1 items-center transition-all'>
                {loading ? (
                    loadingList.map((image,index) => {
                        return(
                            <div className='w-full max-w-[280px] md:max-w-[320px] min-w-[280px] md:min-w-[320px] shadow rounded' key={image+index} >
                                <div className='h-48 min-w-[120px] w-full md:min-w-[145px] bg-slate-200 p-4 flex items-center justify-center animate-pulse'>
                                </div>
                                <div className='p-4 grid gap-2'>
                                    <div className='font-semibold p-1 py-2 bg-slate-200 animate-pulse rounded-full'></div>
                                    <div className='text-slate-400 capitalize p-1 py-2 bg-slate-200 animate-pulse rounded-full'></div>
                                    <div className='flex gap-2'>
                                        <div className='text-red-500 bg-slate-200 py-2  p-1 w-full animate-pulse rounded-full'></div>
                                        <div className='bg-slate-200  line-through py-2 p-1 w-full animate-pulse rounded-full'></div>
                                    </div>
                                    <button className='bg-slate-200 text-sm text-white p-1 rounded-full md:text-base animate-pulse py-2'></button>
                                </div>
                            </div>
                        )
                    })
                ) : (
                    data.map((image,index) => {
                        return(
                            <Link to={"/product/"+image?._id} className='w-full max-w-[280px] md:max-w-[320px] min-w-[280px] md:min-w-[320px] shadow rounded' key={image+index} onClick={scrollTop}>
                                <div className='h-48 min-w-[120px] w-full md:min-w-[145px] bg-slate-200 p-4 flex items-center justify-center'>
                                    <img src={image.productImage[0]} alt="" className='object-scale-down h-full mix-blend-multiply hover:scale-110 transition-all'/>
                                </div>
                                <div className='p-4 grid'>
                                    <div className='font-semibold '>{image.productName}</div>
                                    <div className='text-slate-400 capitalize'>{image.category}</div>
                                    <div className='flex gap-2'>
                                        <div className='text-red-500'>{displayINRCurrency(image.selling)}</div>
                                        <div className='text-slate-400 line-through'>{displayINRCurrency(image.price)}</div>
                                    </div>
                                    <button className='bg-red-500 text-sm hover:bg-red-600 text-white p-1 rounded-full md:text-base' onClick={(e) => handleOnClick(e,image?._id)}>Add to cart</button>
                                </div>
                            </Link>
                        )
                    })
                )}
            </div>
    </div>
  )
}

export default CategoryWiseProduct