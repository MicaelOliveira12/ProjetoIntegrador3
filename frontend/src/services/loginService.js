/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';

const ecommerceAPI = axios.create({ baseURL: 'http://localhost:8080/' });

const fazerLogin = async (login) => {
    try {
        const response = await ecommerceAPI.post('/login', login);
        if (response.status === 200) {
            const userData = {
                id: response.data.id,
                nome: response.data.nomeUsuario
            };
            sessionStorage.setItem('user', JSON.stringify(userData));
        }
        return response.data;
    } catch (error) {
        console.error('Erro ao fazer login', error.response || error.message || error)
        return error;
    }
};


export default {
    fazerLogin
};