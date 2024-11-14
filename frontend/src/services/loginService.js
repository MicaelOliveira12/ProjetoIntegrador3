/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';

const ecommerceAPI = axios.create({ baseURL: 'http://localhost:8080/' });

const criarLogin = async (cadastro) => {
    try {
        const response = await ecommerceAPI.post('/usuario', cadastro);
        return response.data;
    } catch (error) {
        console.error('Erro ao criar Usuario', error.response || error.message || error);
        throw error;
    }
};

const fazerLogin = async(login) => {
    try{
        const response = await ecommerceAPI.post('/login',login);
        
        if(response.status === 200) {
            const userData = {
                id: response.data.id,
                nome: response.data.nomeUsuario
            };

            sessionStorage.setItem('user', JSON.stringify(userData));
        }

        console.log("Response:",response.data);
        return response.data;
    }catch (error) {
        console.error('Erro ao fazer login', error.response || error.message || error)
        throw error;
    }
};

export default {
    criarLogin,
    fazerLogin
};