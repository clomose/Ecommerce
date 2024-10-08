import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import productCategory from '../helpers/productCategory';
import axios from 'axios';
import SummaryApi from '../common';
import VerticalProductCart from '../components/VerticalProductCart';

const CategoryProduct = () => {
    const navigate = useNavigate()
    const [data,setData] = useState([]);
    const [loading,setLoading] = useState(false);
    const [categoryFilterList,setCategoryFilterList] = useState([]);
    const [sortBy,setSortBy] = useState("");
    const location = useLocation();
    const urlSearch = new URLSearchParams(location.search);
    const urlCategoryListinArray = urlSearch.getAll("category")

    const urlCategoryListObject = {};
    urlCategoryListinArray.forEach(el => {
      urlCategoryListObject[el] = true;
    })

    // console.log("urlCategoryListObject",urlCategoryListObject);
    // console.log("urlCategoryListinArray",urlCategoryListinArray);
    
    const [selectCategory,setSelectCategory] = useState(urlCategoryListObject);
    const fetchProduct = async(req,res) => {
      const fetch = await axios.post(SummaryApi.filterProduct.url,{category : categoryFilterList})
      const response = fetch.data;
      setData(response.data)
    }

    useEffect(()=>{
      fetchProduct() 
    },[categoryFilterList])

    const handleSelectCategory = (e) =>{
      const {name,value,checked} = e.target

      setSelectCategory((prev) => {
        return{
          ...prev,
          [value] : checked
        }
      })
    }
    // console.log("hello",selectCategory);

    const handleOnChange =(e) => {
      const {value} = e.target;
      setSortBy(value)
      if(value === 'asc'){
        setData(prev => prev.sort((a,b) => a.selling - b.selling));
      }
      if(value === 'dec'){
        setData(prev => prev.sort((a,b) => b.selling - a.selling));
      }
    }

    useEffect(() => {
      const arrayOfCategory = Object.keys(selectCategory).map(categoryKeyName => {
        if(selectCategory[categoryKeyName]){
          return categoryKeyName
        }
        return null
      }).filter(el => el);

      setCategoryFilterList(arrayOfCategory);

      const urlFormat = arrayOfCategory.map((el,index) => {
        if((arrayOfCategory.length-1) === index){
          return `category=${el}`
        }
        return `category=${el}&&`
      })
      navigate("/product-category?"+urlFormat.join(""))
    },[selectCategory])

    useEffect(() => {},[sortBy])
  return (
    <>
        <Header></Header>
        <div className='container mx-auto p-4'>
            <div className='hidden lg:flex gap-2'>
              {/* left */}
              <div className='min-w-60 min-h-[calc(100vh-120px)] max-h-[calc(100vh-120px)] bg-white overflow-y-auto'>
                {/* sort  */}
                <div className='p-2'>
                  <h3 className='p-2 uppercase text-lg font-medium border-b text-slate-500 border-slate-300'>Sort by</h3>
                  <form action="" className='flex flex-col text-sm gap-2 mt-2'>
                    <div className='flex items-center gap-3'>
                      <input type="radio" name='sort' value={"asc"} checked={sortBy==='asc'} onChange={handleOnChange}/>
                      <label>Price - low to high</label>
                    </div>
                    <div className='flex items-center gap-3'>
                      <input type="radio" name='sort' value={"dec"} checked={sortBy==='dec'}  onChange={handleOnChange}/>
                      <label>Price - high to low</label>
                    </div>
                  </form>
                </div>

                {/* filter */}
                <div className='p-2'>
                  <h3 className='p-2 uppercase text-lg font-medium border-b text-slate-500 border-slate-300'>Filter by</h3>
                  <form action="" className='flex flex-col text-sm gap-2 mt-2'>
                    {
                      productCategory.map((product,index) => {
                        return(
                          <div className='flex items-center gap-2'>
                            <input type="checkbox" value={product?.value} checked={selectCategory[product?.value]} id={product?.value} name='category' onChange={handleSelectCategory}/>
                            <label htmlFor={product?.value}>{product?.label}</label>
                          </div>
                        )
                      })
                    }
                  </form>
                </div>
              </div>
              {/* right */}
              <div>
                <div>
                  <p className='font-medium text-slate-800 text-lg my-2'>Search Results : {data.length}</p>
                </div>
                <div className='max-h-[calc(100vh-164px)] overflow-y-auto no-scrollbar'>
                  {
                    data.length!==0 && !loading && (
                          <VerticalProductCart loading={loading} data={data}></VerticalProductCart>
                    )
                  } 
                </div>
              </div>
            </div>
        </div>
    </>
  )
}

export default CategoryProduct