import React, { useContext, useState } from 'react'
import Logo from './Logo'
import { IoSearch } from "react-icons/io5";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { setUserDetails } from '../store/userSlice';
import ROLE from '../common/role';
import Context from '../context';
const Header = () => {
    const user = useSelector(state => state.user)
    const dispatch = useDispatch();
    const [menuDisplay,setMenuDisplay] = useState(false)
    console.log("user-header",user?.user)
    const navigate = useNavigate();

    const context = useContext(Context)
    const {search,setSearch} = useContext(Context);
    const handleLogout = async () => {
        const fetchData = await axios.get(SummaryApi.logout_user.url,{withCredentials:true})

        if(fetchData.data.success){
            toast.success(fetchData.data.message)
            dispatch(setUserDetails(null))
            navigate('/')
        }else{
            toast.error(fetchData.data.message)
        }
    }
    const handleSearch = (e) => {
        const {value} = e.target
        if(value){
            navigate(`/search?q=${value}`)
        }else{
            navigate('/search')
        }
    }
  return (
    <header className='h-16 shadow-lg bg-white'>
        <div className='h-full container mx-auto flex items-center px-4 justify-between'>
            <Link to={'/'} className='text-lg font-bold text-red-500'>
                Shopify
            </Link>
            <div className='hidden lg:flex items-center max-w-sm justify-between w-full border rounded-full focus-within:shadow-md pl-3'>
                <input type="text" placeholder='search product here' value={search} className='w-full outline-none ' onChange={(e) => {
                    setSearch(e.target.value)
                    handleSearch(e)}}/>
                <div className='text-white text-lg bg-red-700 min-w-[50px] h-8 flex justify-center items-center rounded-r-full'>
                    <IoSearch></IoSearch>
                </div>
            </div>
            <div className='flex items-center gap-6'>
                <div className='relative flex justify-center'>
                    <div className='text-3xl cursor-pointer' onClick={() => setMenuDisplay(prev => !prev)}>
                        {user?.user?.data?.profilePic ? (
                            <img src={user.user.data.profilePic} alt="" srcset="" className='h-8 w-8 rounded-full' />
                        ) : (<FaRegCircleUser></FaRegCircleUser>)}
                    </div>
                    {menuDisplay && (
                        <div className='absolute bottom-0 top-11 bg-white h-fit p-2 shadow-lg rounded'>
                            {
                                user?.user?.data?.role === ROLE.ADMIN && (<Link to={'/adminPanel'} className=' md:block hidden whitespace-nowrap p-2 hover:bg-slate-100 '>Admin Panel</Link>)
                            }
                    </div>
                    )}
                </div>
                <Link to={'/cart'}>
                {
                   user.user?.data?._id && (
                    <div className='text-2xl relative'>
                    <span><FaShoppingCart></FaShoppingCart></span>
                    <div className=' bg-red-600 h-5 w-5 flex items-center justify-center rounded-full p-1 text-white absolute -top-2 -right-3 '>
                        <p className='text-xs'>{context?.countCart}</p>
                    </div>
                </div>
                   ) 
                }
                </Link>
                <div>
                    {user.user?.data?._id ? (
                        <button onClick={handleLogout} className=' bg-red-600 px-3 py-1 rounded-full text-white hover:bg-red-700'>Logout</button>
                    ):(
                        <Link to={'/login'} className=' bg-red-600 px-3 py-1 rounded-full text-white hover:bg-red-700'>Login</Link>
                    )}
                </div>
            </div>
        </div>
    </header>
  )
}

export default Header