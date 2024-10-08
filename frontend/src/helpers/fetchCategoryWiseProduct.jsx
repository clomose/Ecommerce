import axios from 'axios'
import SummaryApi from '../common'

const categoryWiseProduct = async(category) =>{
    const response = await axios.post(SummaryApi.categoryWiseProduct.url,{category})
    return response.data
}

export default categoryWiseProduct