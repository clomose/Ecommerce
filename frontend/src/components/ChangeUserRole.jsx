import React, { useState } from 'react'
import ROLE from '../common/role'
import { IoClose } from "react-icons/io5";
import axios from 'axios';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
const ChangeUserRole = ({
    name,
    email,
    role,
    onClose,
    userId,
    callFunc
}) => {
    const [userRole,changeUserRole] = useState(role);
    const onChangeSelect = (e) => {
        changeUserRole(e.target.value)

    }
    const updateUserRole =  async () => {
        const response = await axios.post(SummaryApi.updateUser.url,{role : userRole,userId},{withCredentials:true})
        console.log(response.data);
        if(response.data.success){
            toast.success(response.data.message);
            onClose()
            callFunc()
        }
    }
  return (
    <div className='border p-4 w-[70vh] bg-white'>
        <button className='block ml-auto' onClick={onClose}>
            <IoClose></IoClose>
        </button>
        <h1 className='font-bold text-lg pb-4'>Change User Role</h1>
        <p>Name : {name}</p>
        <p>Email : {email}</p>
        <div className='flex justify-between mt-2 items-center' >
            <p>Role :</p>
            <select className='border px-4 py-1 cursor-pointer' value={userRole} onChange={onChangeSelect}>
                {
                    Object.values(ROLE).map(el => {
                        return(
                            <option value={el} key={el}>{el}</option>
                        )
                    })
                }
            </select>
        </div>
        <div className='flex justify-center items-center'>
            <button className='border rounded-full bg-red-600 px-4 text-white py-2' onClick={updateUserRole}>Change Role</button>
        </div>
    </div>
  )
}

export default ChangeUserRole