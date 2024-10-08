
import React, { useState } from 'react'
import { MdModeEdit } from "react-icons/md";
import AdminEditProduct from './AdminEditProduct';
const AdminProductCard = (
    {
        data,
        fetchData
    }
) => {
    const [editProduct,setEditProduct] = useState(false);

  return (
    <div className='bg-white p-4 rounded flex flex-col justify-center items-center w-40 relative'>
        <div className='h-32 w-32 flex justify-center items-center'>
            <img src={data.productImage[0]} className='mx-auto object-fill h-full'/>
        </div>
        <h1>{data.productName}</h1>
        <div className='w-fit ml-auto p-2 bg-green-100 hover:bg-green-600 absolute bottom-0 right-0 rounded-full hover:text-white cursor-pointer text-lg' onClick={() => {setEditProduct(true)}}>
            <MdModeEdit />
        </div>
        {
            editProduct && (<AdminEditProduct product={data} onClose={() => {setEditProduct(false)}} fetchData={fetchData}/>)
        }
    </div>
  ) 
}

export default AdminProductCard