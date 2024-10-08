import React, { useContext, useEffect, useRef, useState } from 'react'
import categoryWiseProduct from '../helpers/fetchCategoryWiseProduct';
import displayINRCurrency from '../helpers/displayCurrency';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import addToCart from '../helpers/addToCart';
import Context from '../context';

const HorizontalCardProduct = ({category,heading}) => {
    const [data,setData] = useState([]);
    const [loading,setLoading] = useState(true);
    const loadingList = new Array(13).fill(null)

    const fetch = async() => {
        setLoading(true)
        const fetchData = await categoryWiseProduct(category);
        setData(fetchData.data);
        setLoading(false)
    }

    useEffect(() => {
        fetch()
    },[])

    const [scroll,setScroll] = useState(0);
    const scrollElement = useRef()

    const scrollRight = () => {
        scrollElement.current.scrollLeft += 300
    }

    const scrollLeft = () => {
        scrollElement.current.scrollLeft -= 300
    }


    const {fetchAddToCart} = useContext(Context)
    const handleOnClick = async(e,id) => {
        await addToCart(e,id)
        fetchAddToCart();
    }
  return (
    <div className='container mx-auto px-4 py-4 relative'>
            <h2 className='text-2xl font-semibold py-4'>{heading}</h2>
            <div  className='flex gap-6 overflow-scroll no-scrollbar items-center transition-all' ref={scrollElement}>
                <button className='p-3 bg-white rounded-full absolute left-0 md:block hidden' onClick={scrollLeft}><FaChevronLeft /></button>
                <button className='p-3 bg-white rounded-full absolute right-0 md:block hidden' onClick={scrollRight}><FaChevronRight /></button>
                {
                    loading ? (
                        loadingList.map((image,index) => {
                            return(
                                <div className='w-full max-w-[280px] md:max-w-[320px] min-w-[280px] md:min-w-[320px] h-36 shadow rounded flex' key={image+index} >
                                    <div className='h-full max-w-[110px] w-full md:max-w-[150px] bg-slate-200 p-4 animate-pulse'>
                                    </div>
                                    <div className='p-4 grid w-full gap-2'>
                                        <div className='font-semibold bg-slate-200 p-1  animate-pulse rounded-full'></div>
                                        <div className='bg-slate-200 capitalize p-1 animate-pulse rounded-full'></div>
                                        <div className='flex gap-2'>
                                            <div className='text-red-500 bg-slate-200 p-1 w-full animate-pulse rounded-full'></div>
                                            <div className='text-slate-400 bg-slate-200 line-through p-1 w-full animate-pulse rounded-full'></div>
                                        </div>
                                        <button className=' text-sm bg-slate-200 p-1 rounded-full md:text-base animate-pulse'></button>
                                    </div>
                                </div>
                            )
                        })
                    ) : (
                        data.map((image,index) => {
                            return(
                                <Link to={'product/'+image?._id} className='w-full max-w-[280px] md:max-w-[320px] min-w-[280px] md:min-w-[320px] h-36 shadow rounded flex' key={image+index} >
                                    <div className='h-full max-w-[110px] w-full md:max-w-[150px] bg-slate-200 p-4'>
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
                    )
                }
            </div>
    </div>
  )
}

export default HorizontalCardProduct