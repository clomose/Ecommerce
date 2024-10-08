import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { useDispatch, useSelector } from 'react-redux';
import { FaRegCircleUser } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import axios from 'axios';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import moment from 'moment'
import { MdModeEdit } from "react-icons/md";
import ChangeUserRole from '../components/ChangeUserRole';

const AllUsers = () => {
    const user = useSelector(state => state.user)
    const [allUser,setAllUser] = useState([]);
    const [openUpdateRole,setOpenUpdateRole] = useState(false)
    const [updateUserDetails,setUpdateUserDetails] = useState({
        name : "",
        email : "",
        role : "",
        _id: ""
    })
    const fetchAllUser = async() =>{
        const fetchData = await axios.get(SummaryApi.allUser.url,{withCredentials:true})
        if(fetchData.data.success){
            // console.log(fetchData.data.data);
            setAllUser(fetchData.data.data)
        }else{
            toast.error(fetchData.data.error);
        }
    }
    useEffect(() => {
        fetchAllUser()
    },[])
  return (
    <>
    <Header></Header>
    <div className='min-h-[calc(100vh-120px)] md:flex hidden'>
        <div className='min-h-full bg-white w-full max-w-60 shadow-lg'>
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
                    <Link to={"/adminPanel/all-users"} className='px-2 py-2 hover:bg-slate-100'>All Users</Link>
                    <Link to={"/adminPanel/products"} className='px-2 py-2 hover:bg-slate-100'>Products</Link>
                </nav>
            </div>
        </div>
        <div className='w-full h-full p-2'>
            <div>
                <table className='w-full border bg-white font-medium'>
                    <thead>
                        <tr className='bg-black text-white'>
                            <th className='border'>Sr.</th>
                            <th className='border'>Name</th>
                            <th className='border'>Email</th>
                            <th className='border'>Role</th>
                            <th className='border'>Created Date</th>
                            <th className='border'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allUser.map((el,index) => {
                                return(
                                    <tr key={index}>
                                        <td className='border text-center font-semibold p-2'>{index+1}</td>
                                        <td className='border text-center font-semibold p-2'>{el?.name}</td>
                                        <td className='border text-center font-semibold p-2'>{el?.email}</td>
                                        <td className='border text-center font-semibold p-2'>{el?.role}</td>
                                        <td className='border text-center font-semibold p-2'>{moment(el?.createdAt).format('ll')}</td>
                                        <td className='border text-center font-semibold'>
                                            <button className='bg-green-300 p-2 rounded-full hover:bg-green-700 hover:text-white' onClick={() => {
                                                setUpdateUserDetails(el)
                                                setOpenUpdateRole(true)}}>
                                                <MdModeEdit></MdModeEdit>
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
            {
                openUpdateRole && (
                    <div className='fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center z-10 bg-slate-200 bg-opacity-50'>
                <ChangeUserRole onClose={() => setOpenUpdateRole(false)}
                    name={updateUserDetails.name}
                    role={updateUserDetails.role}
                    email={updateUserDetails.email}
                    userId={updateUserDetails._id}
                    callFunc={fetchAllUser}
                ></ChangeUserRole>
                    </div>
                )
            }
        </div>
    </div>
    </>
  )
}

export default AllUsers