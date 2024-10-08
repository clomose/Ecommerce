import React, { useState} from 'react'
import Header from '../components/Header'
import userImage from '../assets/signin.gif'
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom'
import imageToBase64 from '../helpers/imageToBase64';
import axios from 'axios'
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const Signup = () => {
    const [showPassword,setPassword] = useState(false)
    const [showConfirmPassword,setConfirmPassword] = useState(false)
    const [data,setData] = useState({
        email : "",
        password : "",
        name : "",
        confirmPassword : "",
        profilePic : ""
    })
    const navigate = useNavigate();

    const handleOnChange = (e) => {
        const {name,value} = e.target
        setData((prev) => {
            return {
                ...prev,
                [name] : value
            }
        })
    }

    const handleUploadPic = async (e) => {
      const file = e.target.files[0]
      const imagePic = await imageToBase64(file)
      setData((prev) => {
        return{
          ...prev,
          profilePic : imagePic
        }
      })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        if(data.password === data.confirmPassword){
            const userData  = await axios.post(SummaryApi.signUp.url,data);
            if(userData.data.success){
                toast.success(userData.data.message);
                navigate('/login')
            }else{
                toast.error(userData.data.message);
            }
        }else{
            toast.error("Passwords are not the same");
        }
    }
  return (
    <>
    <Header></Header>
    <section id='signup'>
        <div className='mx-auto container p-4'> 
            <div className='bg-white max-w-sm mx-auto p-5'>
                <div className='w-20 h-20 mx-auto relative overflow-hidden rounded-full'>
                    <div>
                      <img src={data.profilePic || userImage} alt="login icons"/>
                    </div>
                    <form action="">
                      <label>
                        <div className='bg-slate-200 absolute bottom-0 w-full text-xs text-center py-4 opacity-70 cursor-pointer'>
                          Upload Photo
                        </div>
                        <input type="file"  className='hidden' onChange={handleUploadPic}/>
                      </label>
                    </form>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className='grid'>
                        <label htmlFor="text">Name : </label>
                        <div className='bg-slate-100 p-2'>
                            <input type="text" 
                            name='name'
                            value={data.name}
                            onChange={handleOnChange}
                            required
                            placeholder='enter name' 
                            className='outline-none w-full h-full bg-transparent'/>
                        </div>
                    </div>
                    <div className='grid'>
                        <label htmlFor="email">Email : </label>
                        <div className='bg-slate-100 p-2'>
                            <input type="email" 
                            name='email'
                            required
                            value={data.email}
                            onChange={handleOnChange}
                            placeholder='enter email' 
                            className='outline-none w-full h-full bg-transparent'/>
                        </div>
                    </div>
                    <div className='grid'>
                        <label htmlFor="password">Password : </label>
                        <div className='bg-slate-100 p-2 flex'>
                            <input type={showPassword ? "text" : "password"} 
                            placeholder='enter password' 
                            name='password'
                            required
                            value={data.password}
                            onChange={handleOnChange}
                            className='outline-none w-full h-full bg-transparent'/>
                            <div className='text-xl hover:cursor-pointer' onClick={() => {setPassword((val) => !val)}}>
                                <span>
                                    {showPassword ? (<FaEyeSlash></FaEyeSlash>) : (<FaEye></FaEye>)}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className='grid'>
                        <label htmlFor="password">Confirm Password : </label>
                        <div className='bg-slate-100 p-2 flex'>
                            <input type={showConfirmPassword ? "text" : "password"} 
                            placeholder='confirm password' 
                            name='confirmPassword'
                            required
                            value={data.confirmPassword}
                            onChange={handleOnChange}
                            className='outline-none w-full h-full bg-transparent'/>
                            <div className='text-xl hover:cursor-pointer' onClick={() => {setConfirmPassword((val) => !val)}}>
                                <span>
                                    {showConfirmPassword ? (<FaEyeSlash></FaEyeSlash>) : (<FaEye></FaEye>)}
                                </span>
                            </div>
                        </div>
                    </div>
                    <button className='px-5 py-2 bg-red-500 rounded-full mt-3 mb-2 block m-auto max-w-[150px] w-full text-white hover:scale-110 hover:bg-red-600 transition-all'>
                        Sign Up
                    </button>
                </form>
                <p>Already have account ? <Link to={"/login"} className='text-red-400 hover:underline hover:text-red-500'>Login</Link></p>
            </div>
        </div>
    </section>
    </>
  )
}

export default Signup