import axios from 'axios'
import SummaryApi from '../common'
import { toast } from 'react-toastify';
const addToCart =  async(e,id) => {
    
    e?.stopPropagation();
    e?.preventDefault();

    const fetch = await axios.post(SummaryApi.addToCart.url,{productId : id},{
        withCredentials: true
    });
    const response = fetch.data
    console.log("response",response);
    if(response.success){
        toast.success(response.message);
    }else{
        toast.error(response.message)
    }
}

export default addToCart