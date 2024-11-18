/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';
const ecommerceAPI = axios.create({ baseURL: 'http://localhost:8080/usuario' });

const criarUsuario = async (cadastro) => {
    try {
        const response = await ecommerceAPI.post('', cadastro);
        return response.data;
    } catch (error) {
        console.error('Erro ao criar Usuario', error.response || error.message || error);
        throw error;
    }
};

const atualizarUsuario = async (userData) => {
    try {
      const response = await ecommerceAPI.put('', userData);
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : 'Erro ao atualizar as informações';
    }
  };

export default{
    criarUsuario,
    atualizarUsuario
}