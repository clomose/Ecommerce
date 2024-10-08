import React, { useContext, useEffect, useState } from 'react'
import Header from '../components/Header'
import { useLocation } from 'react-router-dom'
import axios from 'axios';
import SummaryApi from '../common';
import VerticalProductCart from '../components/VerticalProductCart';
import Context from '../context';

const SearchProduct = () => {
    const query = useLocation();
    const [data,setData] = useState([])
    const [loading,setLoading] = useState(false)

    const fetchProduct = async() => {
        setLoading(true);
        const fetch = await axios.get(SummaryApi.searchProduct.url+query.search);
        const response = fetch.data;
        setLoading(false);
        setData(response.data)

    }

    useEffect(() => {
        fetchProduct();
    },[query])
    console.log(data);
  return (
    <>
    <Header></Header>
    <div className='container mx-auto p-4'>
        {
            loading && (
                <p className='text-lg text-center'>Loading ....</p>
            )
        }
        <p className='text-lg font-semibold my-3'>Search Results : {data.length}</p>

        {
            data.length===0 && !loading &&(
                <p className='bg-white text-center text-lg p-4'>No data found....</p>
            )
        }
        {
            data.length!==0 && !loading && (
                <VerticalProductCart loading={loading} data={data}></VerticalProductCart>
            )
            
        }
    </div>
    </>
  )
}

export default SearchProduct