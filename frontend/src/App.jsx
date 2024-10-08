import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import { Forgot } from './pages/Forgot'
import Signup from './pages/Signup'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import SummaryApi from './common'
import { useEffect, useState} from 'react'
import Context from './context'
import { useDispatch } from 'react-redux'
import { setUserDetails } from './store/userSlice'
import AdminPanel from './pages/AdminPanel'
import AllUsers from './pages/AllUsers'
import Products from './pages/Products'
import CategoryProduct from './pages/CategoryProduct'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'
import SearchProduct from './pages/SearchProduct'

function App() {
  const dispatch = useDispatch()

  const [countCart,setCountCart] = useState(0);
  const [search,setSearch] = useState("");

  const fetchUserDetails = async() => {
    const dataResponse = await axios.get(SummaryApi.current_user.url,{withCredentials:true});
    if(dataResponse.data.success){
      dispatch(setUserDetails(dataResponse.data))
    }
  }

  const fetchAddToCart = async() => {
    const dataResponse = await axios.get(SummaryApi.countAddToCart.url,{withCredentials: true});
    const data = dataResponse.data?.data;
    setCountCart(data);

  }
  useEffect(() => {
    fetchUserDetails();
    fetchAddToCart();
  },[])
  return ( 
    <>
    <Context.Provider value={{
      fetchUserDetails, //user details
      countCart, //cart count
      fetchAddToCart,
      search, //search,
      setSearch
      }}>
    <ToastContainer position='top-center'></ToastContainer>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/forgot' element={<Forgot></Forgot>}></Route>
        <Route path='/signup' element={<Signup></Signup>}></Route>
        <Route path='/adminPanel' element={<AdminPanel></AdminPanel>}></Route>
        <Route path='/adminPanel/all-users' element={<AllUsers></AllUsers>}></Route>
        <Route path='/adminPanel/products' element={<Products></Products>}></Route>
        <Route path='/product-category' element={<CategoryProduct></CategoryProduct>}></Route>
        <Route path='/product/:id' element={<ProductDetails></ProductDetails>}></Route>
        <Route path='/cart' element={<Cart></Cart>}></Route>
        <Route path='/search' element={<SearchProduct></SearchProduct>}></Route>
      </Routes>
    </BrowserRouter>
    </Context.Provider>
    </>
  )
}

export default App
