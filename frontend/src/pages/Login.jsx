import React, { useContext, useState} from 'react'
import Header from '../components/Header'
import userImage from '../assets/signin.gif'
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import Context from '../context';
const Login = () => {
    const [showPassword,setPassword] = useState(false)
    const [data,setData] = useState({
        email : "",
        password : ""
    })
    const navigate = useNavigate();
    const {fetchUserDetails,fetchAddToCart} = useContext(Context)
    const handleOnChange = (e) => {
        const {name,value} = e.target
        setData((prev) => {
            return {
                ...prev,
                [name] : value
            }
        })
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        const userData = await axios.post(SummaryApi.signIn.url,data,{withCredentials: true});
        // console.log(userData);
        if(userData.data.success){
            toast.success(userData.data.message);
            navigate('/')
            fetchUserDetails()
            fetchAddToCart()
        }else{
            toast.error(userData.data.message)
        }
    }
  return (
    <>
    <Header></Header>
    <section id='login'>
        <div className='mx-auto container p-4'> 
            <div className='bg-white max-w-sm mx-auto p-5'>
                <div className='w-20 h-20 mx-auto'>
                    <img src={userImage} alt="login icons"/>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className='grid'>
                        <label htmlFor="email">Email : </label>
                        <div className='bg-slate-100 p-2'>
                            <input type="email" 
                            name='email'
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
                    <Link to={'/forgot'} className='text-sm block ml-auto w-fit text-red-400 hover:text-red-500 hover:underline'>Forgot Password ? </Link>
                    <button className='px-5 py-2 bg-red-500 rounded-full mt-3 mb-2 block m-auto max-w-[150px] w-full text-white hover:scale-110 hover:bg-red-600 transition-all'>
                        Login
                    </button>
                </form>
                <p>Don't have account ? <Link to={"/signup"} className='text-red-400 hover:underline hover:text-red-500'>Sign Up</Link></p>
            </div>
        </div>
    </section>
    </>
  )
}

export default Login