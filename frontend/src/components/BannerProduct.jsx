import React, { useEffect, useState } from 'react'
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";

import image1 from '../assets/banner/img1.webp'
import image2 from '../assets/banner/img2.webp'
import image3 from '../assets/banner/img3.jpg'
import image4 from '../assets/banner/img4.jpg'
import image5 from '../assets/banner/img5.webp'

import image1mobile from '../assets/banner/img1_mobile.jpg'
import image2mobile from '../assets/banner/img2_mobile.webp'
import image3mobile from '../assets/banner/img3_mobile.jpg'
import image4mobile from '../assets/banner/img4_mobile.jpg'
import image5mobile from '../assets/banner/img5_mobile.png'

const BannerProduct = () => {
    const desktopImages = [
        image1,
        image2,
        image3,
        image4,
        image5
    ]

    const mobileImage = [
        image1mobile,
        image2mobile,
        image3mobile,
        image4mobile,
        image5mobile
    ]

    const [slide,setSlide] = useState(0);

    const left = () => {
        if(slide!=0){
            setSlide(e => e-1)
        }
    }

    const right = () => {
        if(desktopImages.length-1>slide){
            setSlide(e => e+1)
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            if(desktopImages.length-1>slide){
                right();
            }else{
                setSlide(0);
            }
        },5000);

        return ()=> clearInterval(interval);
    },[slide])

  return (
    <div className='container mx-auto p-4 rounded'>
        <div className='h-60 bg-slate-200 md:h-72 w-full relative overflow-hidden'>
            <div className='absolute z-10 w-full h-full p-2'>
                <div className='md:flex w-full h-full justify-between items-center hidden'>
                    <button onClick={left} className='p-3 bg-white rounded-full'><FaChevronLeft /></button>
                    <button onClick={right} className='p-3 bg-white rounded-full'><FaChevronRight /></button>
                </div>
            </div>
            {/* desktop version */}
            <div className='h-full w-full md:flex hidden'>
                {
                    desktopImages.map((image,index) => {
                        return(
                            <div className='min-h-full min-w-full h-full w-full transition-all' key={image} style={{transform : `translateX(-${slide*100}%)`}}>
                                <img src={image} className='h-full w-full'/>
                            </div>
                        )
                    })
                }
            </div>
            {/* mobile version */}
            <div className='h-full w-full md:hidden flex'>
                {
                    mobileImage.map((image,index) => {
                        return(
                            <div className='min-h-full min-w-full h-full w-full transition-all' key={image} style={{transform : `translateX(-${slide*100}%)`}}>
                                <img src={image} className='h-full w-full object-cover'/>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    </div>
  )
}

export default BannerProduct