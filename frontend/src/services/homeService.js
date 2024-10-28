import axios from 'axios';

const ecommerceAPI = axios.create({baseURL: 'http://localhost:8080/produto/'})

async function getProduct() {
    const response = await ecommerceAPI.get('/listar')
    
    console.log(response.data);

    return response.data
    
    
}

export {
    getProduct
}