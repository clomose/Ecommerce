import React from 'react'
import { IoClose } from 'react-icons/io5'

const DisplayImage = ({imgUrl,onClose}) => {
  return (
    <div className='fixed bottom-0 top-0 right-0 left-0 flex items-center justify-center'>
        <div className='bg-white shadow-lg rounded max-w-5xl mx-auto p-4'>
            <div className='w-fit text-lg cursor-pointer hover:text-red-500 ml-auto' onClick={() => {onClose()}}>
                <IoClose></IoClose>
            </div>
            <div className='flex justify-center items-center p-4 max-w-[80vh] max-h-[80vh]'>
                <img src={imgUrl} alt="" className='w-full h-full' />
            </div>
        </div>
    </div>
  )
}

export default DisplayImage