import React, { useState } from 'react'
import { IoClose } from "react-icons/io5";
import productCategory from '../helpers/productCategory';
import { IoMdCloudUpload } from "react-icons/io";
import uploadImage from '../helpers/uploadImage';
import DisplayImage from './DisplayImage';
import { MdDelete } from "react-icons/md";
import axios from 'axios';
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const UploadProduct = ({
    onClose,
    fetchData
}) => {
    const [data,setData] = useState({
        productName : "",
        brandName : "",
        category : "",
        productImage : [],
        description : "",
        price : "",
        selling : ""
    })
    const [fullScreenImage,setFullScreenImage] = useState('');
    const [openFullScreenImage,setOpenFullScreeImage] = useState(false);

    const handleUploadImage = async(e) => {
        const files = e.target.files[0];
        const uploadImageCloudinary = await uploadImage(files);
        setData((prev) => {
            return {
                ...prev,
                productImage : [...prev.productImage,uploadImageCloudinary.url]
            }
        })
    }

    const handelDeleteProductImage = (index) => {
        const Product = [...data.productImage];
        Product.splice(index,1);
        setData((prev) => {
            return{
                ...prev,
                productImage : [...Product]
            }
        })
    }

    const handleOnChange = (e) => {
        const {name , value} = e.target;
        setData((prev) => {
            return{
                ...prev,
                [name] : value
            }
        })
    }

    const handleOnSubmit = async(e) => {
        e.preventDefault();
        
        const response = await axios.post(SummaryApi.uploadProduct.url,data,{withCredentials: true});
        if(response?.data?.success){
            toast.success(response?.data?.message);
            onClose()
            fetchData();
        }else{
            toast.error(response?.data?.message);
        }
    }
  return (
    <div className='fixed bg-slate-400 bg-opacity-35 bottom-0 top-0 right-0 left-0 flex justify-center items-center'>
        <div className='p-4 bg-white roundex w-full max-w-2xl h-full max-h-[80%] overflow-hidden'>
            <div className='flex justify-between items-center'>
                <h1 className='font-bold text-lg'>Upload Product</h1>
                <div className='text-lg cursor-pointer hover:text-red-500' onClick={() => {onClose()}}><IoClose></IoClose></div>
            </div>

            <form className='grid gap-2 p-4 overflow-y-scroll h-full' onSubmit={handleOnSubmit}>
                <label htmlFor="productName">Product Name : </label>
                <input type="text" 
                id='productName' 
                placeholder='Enter the product name' 
                name='productName'
                value={data.productName} 
                onChange={handleOnChange}
                className='bg-slate-100 p-2 border rounded' required/>

                <label htmlFor="brandName" className='mt-3'>Brand Name : </label>
                <input type="text" 
                id='brandName' 
                placeholder='Enter the brand name' 
                name='brandName'
                value={data.brandName} 
                onChange={handleOnChange}
                className='bg-slate-100 p-2 border rounded' required/>

                <label htmlFor="category" className='mt-3'>Select Category : </label>
                <select value={data.category} name='category' onChange={handleOnChange} className='bg-slate-100 p-2 border rounded' required>
                    <option value="">Select Category</option>
                    {
                        productCategory.map((el,index) => {
                            return(
                                <option value={el.value} key={el.value+index}>{el.label}</option>
                            )
                        })
                    }
                </select>

                <label htmlFor="productImage" className='mt-3'>Product Image : </label>
                <label htmlFor="uploadInputImage">
                    <div className='p-2 bg-slate-100 border rounded w-full h-48 flex items-center justify-center cursor-pointer'>
                        <div className='text-slate-500 flex items-center justify-center flex-col gap-2'>
                            <span className='text-4xl'><IoMdCloudUpload></IoMdCloudUpload></span>
                            <p className='text-sm'>Upload product image</p>
                            <input type="file" id='uploadInputImage' className='hidden' onChange={handleUploadImage}/>
                        </div>
                    </div>
                </label>
                <div>
                    {data?.productImage[0] ? (
                        <div className='flex items-center gap-2'>
                            {data.productImage.map((el,index) => {
                            return (
                                <div className='relative group'>
                                    <img src={el}  
                                        alt='el' 
                                        width={80} 
                                        height={80} 
                                        className='bg-slate-100 border cursor-pointer' 
                                        onClick={() => {setOpenFullScreeImage(true)
                                            setFullScreenImage(el)
                                    }}/>
                                    <div className='absolute bottom-0 right-0 p-1 text-white bg-red-500 rounded-full hidden group-hover:block' onClick={() => {handelDeleteProductImage(index)}}>
                                        <MdDelete />
                                    </div>
                                </div>
                            )
                        })}
                        </div>
                    ) : (
                        <p className='text-red-600 text-xs'>*Please Upload Image</p>
                    )}
                </div>
                
                <label htmlFor="price" className='mt-3'>Price : </label>
                <input type="number" 
                id='price' 
                placeholder='Enter the price' 
                name='price'
                value={data.price} 
                onChange={handleOnChange}
                className='bg-slate-100 p-2 border rounded' required/>
                
                <label htmlFor="seling" className='mt-3'>Selling Price : </label>
                <input type="number" 
                id='selling' 
                placeholder='Enter the selling price' 
                name='selling'
                value={data.selling} 
                onChange={handleOnChange}
                className='bg-slate-100 p-2 border rounded' required/>

                <label htmlFor="description" className='mt-3'>Discription : </label>
                <textarea onChange={handleOnChange} 
                className='w-full h-28 bg-slate-100 rounded border resize-none p-1' 
                placeholder='Enter the discription' 
                name='description'
                value={data.description}
                />
    

                <button className='px-3 py-2 bg-red-600 hover:bg-red-700 text-white mb-10'>Upload Product</button>
            </form>
        </div>
        {
            openFullScreenImage && (
                <DisplayImage onClose={() => {setOpenFullScreeImage(false)}} imgUrl={fullScreenImage}></DisplayImage>
            )
        }
    </div>
  )
}

export default UploadProduct