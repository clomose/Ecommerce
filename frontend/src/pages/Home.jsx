import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import CategoryList from '../components/CategoryList'
import BannerProduct from '../components/BannerProduct'
import HorizontalCardProduct from '../components/HorizontalCardProduct'
import VerticalCardProduct from '../components/VerticalCardProduct'

const Home = () => {
  return (
    <>
    <div className='fixed z-20 w-full'>
      <Header></Header>
    </div>
    <div className='py-16'>
      <CategoryList></CategoryList>
      <BannerProduct></BannerProduct>
      <HorizontalCardProduct category={"camera"} heading={"Top's Camera"}></HorizontalCardProduct>
      <HorizontalCardProduct category={"trimmers"} heading={"Best Trimmers"}></HorizontalCardProduct>
      <VerticalCardProduct category={"mobiles"} heading={"Mobiles"}></VerticalCardProduct>
      <VerticalCardProduct category={"mouse"} heading={"Mouse"}></VerticalCardProduct>
      <VerticalCardProduct category={"televisions"} heading={"Television"}></VerticalCardProduct>
      <VerticalCardProduct category={"airpods"} heading={"Airpods"}></VerticalCardProduct>
      <VerticalCardProduct category={"earphones"} heading={"Earphones"}></VerticalCardProduct>
      <VerticalCardProduct category={"speakers"} heading={"Speakers"}></VerticalCardProduct>
      <VerticalCardProduct category={"watches"} heading={"Watches"}></VerticalCardProduct>
      <VerticalCardProduct category={"refrigerator"} heading={"Refrigerators"}></VerticalCardProduct>
      <VerticalCardProduct category={"processor"} heading={"Processors"}></VerticalCardProduct>
    </div>
    <Footer></Footer>
    </>
  )
}

export default Home