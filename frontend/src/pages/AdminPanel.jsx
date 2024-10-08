import React, { useEffect } from 'react'
import Header from '../components/Header'
import { useDispatch, useSelector } from 'react-redux';
import { FaRegCircleUser } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';
import ROLE from '../common/role';
const AdminPanel = () => {
    const user = useSelector(state => state.user)
    const navigate = useNavigate();

    useEffect(() => {
        if(user?.user?.data?.role !== ROLE.ADMIN){
            navigate('/')
        }
    },[user])
  return (
    <>
    <Header></Header>
    <div className='min-h-[calc(100vh-120px)] max-h-[calc(100vh-121px)] md:flex hidden'>
        <div className='min-h-full bg-white  w-full max-w-60 shadow-lg'>
            <div className='h-32 flex justify-center items-center flex-col'>
                <div className='cursor-pointer flex justify-center relative text-5xl'>
                    {user?.user?.data?.profilePic ? (
                        <img src={user?.user?.data?.profilePic} alt="" srcset="" className='h-20 w-20 rounded-full' />
                    ) : (<FaRegCircleUser></FaRegCircleUser>)}
                </div>
                <p className=' capitalize font-semibold text-lg'>{user?.user?.data?.name}</p>
                <p className='text-sm'>{user?.user?.data?.role}</p>
            </div>
            <div>
                <nav className='flex flex-col p-3'>
                    <Link to={"all-users"} className='px-2 py-2 hover:bg-slate-100'>All Users</Link>
                    <Link to={"products"} className='px-2 py-2 hover:bg-slate-100'>Products</Link>
                </nav>
            </div>
        </div>
        <div className='w-full h-full p-2'>
            main
        </div>
    </div>
    </>
  )
}

export default AdminPanel