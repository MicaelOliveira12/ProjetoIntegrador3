/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';

const ecommerceAPI = axios.create({ baseURL: 'http://localhost:8080/produto/' });

const salvarProduto = async (produto) => {
    try {
        const response = await ecommerceAPI.post('/cadastrar-produto', produto);
        return response.data;
    } catch (error) {
        console.error('Erro ao salvar produto: ', error);
        throw error;
    }
}

async function getProduct() {
    const response = await ecommerceAPI.get('/listar')

    console.log(response.data);

    return response.data

}

async function getProductCompleto(id) {
    try {
        const response = await ecommerceAPI.get(`/listar-produto-completo/${id}`);
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar produto completo:", error);
        throw error;
    }
}



export default {
    salvarProduto,
    getProduct,
    getProductCompleto,
};
