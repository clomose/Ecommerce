import React, { useCallback, useContext, useEffect, useState } from 'react'
import Header from '../components/Header'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import SummaryApi from '../common'
import { FaStar } from "react-icons/fa";
import displayINRCurrency from '../helpers/displayCurrency'
import CategoryWiseProduct from '../components/CategoryWiseProduct'
import Context from '../context'
import addToCart from '../helpers/addToCart'

const ProductDetails = () => {
    const [data,setData] = useState({
      productName : "",
      brandName : "",
      category : "",
      productImage : [],
      description : "",
      price : "",
      selling : ""
    })
    const params = useParams();
    const [loading,setLoading] = useState(true)
    const productImage = new Array(4).fill(null)
    const [image,setImage] = useState("");
    const [imageCoordinate,setImageCoordinate] = useState({
      x : 0,
      y : 0
    })
    const [zoom,setZoom] = useState(false);
    const navigate = useNavigate()

    const fetch = async() => {
      setLoading(true)
      const response = await axios.post(SummaryApi.productDetails.url,{productId : params.id})
      setData(response?.data?.data);
      setImage(response?.data?.data?.productImage[0]);
      setLoading(false)
    }
    useEffect(() => {
      fetch()
    },[params])

    const handleZoom = useCallback((e) => {
      setZoom(true)
      const {left,top,width,height} = e.target.getBoundingClientRect();

      const x = (e.clientX - left)/width;
      const y = (e.clientY - top)/height;
      setImageCoordinate({
        x,y
      })
    },[imageCoordinate])

    const handleLeaveZoom = (e) => {
      setZoom(false)
    }

    const {fetchAddToCart} = useContext(Context)

    const handleAddToCart = async(e,id) =>{
      await addToCart(e,id)
      fetchAddToCart()
    }

    const handleBuyProduct = async(e,id) => {
      await addToCart(e,id)
      fetchAddToCart()
      navigate('/cart')
    }
    console.log("Hello-------",data);
  return (
    <>
        <Header></Header>
        <div className='container mx-auto p-4'>
          <div className='min-h-[200px] flex flex-col lg:flex-row gap-4'>
            {/* product */}
            <div className='h-96 flex flex-col lg:flex-row-reverse gap-4'>

              <div className='bg-slate-200 h-[300px] w-[300px] lg:h-96 lg:w-96 relative p-6' onMouseMove={handleZoom} onMouseLeave={handleLeaveZoom}>
                <img src={image} className='h-full w-full object-scale-down mix-blend-multiply' />
                {
                  zoom && (
                    <div className='min-w-[500px] min-h-[400px] bg-slate-200 p-1 absolute top-0 -right-[510px] hidden lg:block overflow-hidden'>
                      <div className='w-full min-h-[400px] min-w-[500px] h-full bg-slate-200 mix-blend-multiply scale-125' style={{
                          backgroundImage : `url(${image})`,
                          backgroundRepeat : 'no-repeat',
                          backgroundPosition : `${imageCoordinate.x * 100}% ${imageCoordinate.y * 100}%` 
                        }
                      }>

                      </div>
                    </div>
                  )
                }
              </div>

              <div className='h-full'>
                {
                    loading ? (
                      <div className='flex gap-2 lg:flex-col overflow-scroll no-scrollbar'>{
                          productImage.map((el,index) => {
                          return(
                            <div className='bg-slate-200 h-20 w-20 rounded animate-pulse' key={el+index}>

                            </div>
                          )
                        })}
                      </div>
                    ) : (
                      <div className='flex gap-2 lg:flex-col overflow-scroll no-scrollbar'>
                        {
                          data.productImage.map((el,index) => {
                          return(
                            <div className='bg-slate-200 h-20 w-20 rounded p-1' key={el}>
                              <img src={el} alt="" className='w-full h-full object-scale-down mix-blend-multiply cursor-pointer' onClick={() => {
                                setImage(el)
                              }}/>
                            </div>
                          )
                        })}
                      </div>
                    )
                  }
              </div>
              

              </div>
              {/* product details */}
              {loading ? (
                <div className='grid gap-1 w-full'>
                <p className=' p-1 rounded-full inline-block w-full h-6 bg-slate-200 animate-pulse'></p>
                <h2 className='text-2xl lg:text-4xl font-medium h-6 bg-slate-200 animate-pulse rounded-full'></h2>
                <p className='text-slate-400 capitalize h-6 bg-slate-200 animate-pulse rounded-full'></p>
                <div className='text-red-500 flex items-center gap-1 h-6 bg-slate-200 animate-pulse rounded-full'>
                </div>
                <div className='flex gap-3 text-2xl font-medium w-full'>
                  <p className='text-red-500 bg-slate-200 h-6 p-1 animate-pulse rounded-full w-full'></p>
                  <p className='text-slate-400 line-through bg-slate-200 h-6 p-1 animate-pulse rounded-full w-full'></p>
                </div>
                <div className='flex gap-3 items-center my-2'>
                  <button className=' min-w-[120px] font-medium h-6 p-1 bg-slate-200 animate-pulse rounded-full w-full'></button>
                  <button className=' min-w-[120px] font-medium h-6 p-1 bg-slate-200 animate-pulse rounded-full w-full'></button>
                </div>
                <div className='flex flex-col gap-2'>
                  <div className='h-6 p-1 bg-slate-200 animate-pulse rounded-full w-full'></div>
                  <div className='h-6 p-1 bg-slate-200 animate-pulse rounded-full w-full'></div>
                </div>
              </div>
              ) : (
                <div className='flex flex-col gap-1'>
                <p className='bg-red-200 text-red-600 p-1 rounded-full inline-block w-fit'>{data?.brandName}</p>
                <h2 className='text-2xl lg:text-4xl font-medium'>{data?.productName}</h2>
                <p className='text-slate-400 capitalize'>{data?.category}</p>
                <div className='text-red-500 flex items-center gap-1'>
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                </div>
                <div className='flex gap-3 text-2xl font-medium'>
                  <p className='text-red-500'>{displayINRCurrency(data?.selling)}</p>
                  <p className='text-slate-400 line-through'>{displayINRCurrency(data?.price)}</p>
                </div>
                <div className='flex gap-3 items-center my-2'>
                  <button className='border-2 border-red-500 px-2 py-2 rounded min-w-[120px] text-red-600 font-medium hover:bg-red-500 hover:text-white' onClick={(e) => {handleBuyProduct(e,data?._id)}}>Buy</button>
                  <button className='border-2 border-red-500 px-2 py-2 rounded min-w-[120px] font-medium bg-red-500 text-white hover:text-red-500 hover:bg-white' onClick={(e) => {handleAddToCart(e,data?._id)}}>Add To Cart</button>
                </div>
                <div>
                  <div className='text-slate-600 my-1'>Description : </div>
                  <div>{data?.description}</div>
                </div>
              </div>
              )}
              <div>
            </div>
          
          </div>
          {
            data?.category && ( <CategoryWiseProduct category={data?.category} heading={"Recommended Products"}></CategoryWiseProduct>
            )
          }
        </div>
    </>
  )
}

export default ProductDetails