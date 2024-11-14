/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';

const ecommerceAPI = axios.create({baseURL: 'http://localhost:8080/produto/cadastrar-produto'});

const salvarProduto = async (produto) => {
    try {
        const response = await ecommerceAPI.post('',produto);
        return response.data;
    }catch (error){
        console.error('Erro ao salvar produto: ', error);
        throw error;
    }
}

export default{
    salvarProduto,
};
    