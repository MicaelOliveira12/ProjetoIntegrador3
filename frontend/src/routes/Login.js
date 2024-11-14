import { Form, FloatingLabel } from 'react-bootstrap';
import Styled from "styled-components";
import { Link, useNavigate }  from 'react-router-dom';
import React, {useState} from 'react';
import loginService from '../services/loginService';

const ContainerLogin = Styled.div`
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  display: grid;
  min-height: 100vh;
  grid-template-columns: 1fr;
  grid-template-rows: 20% 65% 10%;
  justify-content: center;
  box-sizing: border-box;
  overflow: hidden;
`
const ContainerTitle = Styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  max-width: 980px;
`
const Title = Styled.label`
    font-size: 40px;
    font-weight: 600;
    font-family: SF Pro Display, SF Pro Icons, Helvetica Neue, Helvetica, Arial, sans-serif;
    padding-top: 34px;
    line-height: 1.1;
    letter-spacing: 0;
`
const ContainerForm = Styled.form`
  width: auto;
  display: flex;
  flex-direction: column;
  align-items:center;
  min-width: 600px;
  min-height: 450px;
  padding-top: 4px;
`
const Subtitle = Styled.label`
position: relative;
font-size: 24px;
font-weight: 600;
color: #494949;
letter-spacing: .009em;
line-height: 1.16667;
font-family: SF Pro Display, SF Pro Icons, Helvetica Neue, Helvetica, Arial, sans-serif;
margin: 5px auto 13px;
margin-bottom: 40px;
`
const InputLogin = Styled(Form.Control)`
    
    width: 35em;
    font-size: 1em;
    border-radius: 10px 10px 0px 0px;
    border: 1px solid;
    border-bottom: none;
    background-color: #fff;
`
const InputSenha = Styled(Form.Control)`
    width: 35em;
    padding: 1em;
    font-size: 1em;
    border-radius: 0px 0px 10px 10px;
    border: 1px solid;
`
const LabelFloating = Styled(FloatingLabel)`
  font-size: 0.9rem;
  margin: 0;
  padding: 0;
  background-color: transparent !important;

&& form-label {
  color: #007bff;
  background-color: transparent !important;
}
  && form-label::after{
    background-color: transparent !important;
  }
`
const TextA = Styled.a`
  text-decoration: none;

  &: hover{
    text-decoration: underline;
  }
`
const ContainerBottom = Styled.div`
  width: 100%;
  border-top: 1px solid;
  height: 100%;
  padding: 0.85% 18% 0%;
`
const TextBottom = Styled.label`
text-decoration: none;
font-size: 18px;
`
const ContainerTextForm = Styled.div`
  display: flex;
  aling-items: center;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  line-height: 2em;
`
const ButtonSubmit = Styled.button`
  padding: 5px 50px;
  color: #fff;
  border-color: #1482d0;
  background-image: linear-gradient(to right, #0090f7, #ba62fc, #f2416b);
  border-radius: 10px;
  font-size: 24px;
  margin-top: 50px;
  &:hover{
    background: #fff;
    color: #1482d0;
  }

`

function Login() {
  const [email, setEmail] = useState('');
  const [senha , setSenha] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const loginData = {
      email,
      senha
    };
      console.log(loginData);
    try{
      const response = await loginService.fazerLogin(loginData);
      console.log("Login successful", response);
      resetForm();
      navigate('/home');
      window.location.reload();
    }catch(error) {
      console.error("Falha ao efetuar login.",error)
    }
  }

  const resetForm = () => {
    setEmail('');
    setSenha('');
  }

  return (
    <ContainerLogin>
      <ContainerTitle >
        <Title>Inicie sessão para finalizar a compra com rapidez.</Title>
      </ContainerTitle>
      <ContainerForm onSubmit={handleSubmit}>
        <Subtitle>Inicie sessão na Apple Store</Subtitle>
        <LabelFloating controlId="floatingInput" label="E-mail ou número de telefone">
          <InputLogin 
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="" />
        </LabelFloating>
        <LabelFloating controlId='floatingPassword' label="Senha">
          <InputSenha 
          type="password" 
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          placeholder=""
           />
        </LabelFloating>
        <ContainerTextForm>
          <TextA href="">Esqueceu a senha?</TextA>
          <label>Não tem uma Conta Apple? <Link to="/account">Crie a sua agora.</Link></label>
        </ContainerTextForm>
        <ButtonSubmit type="submit">Login</ButtonSubmit>
      </ContainerForm>
      <ContainerBottom>
        <TextBottom>Precisa de mais ajuda? <TextA href="">Entre no chat</TextA> ou ligue para 0800-761-0867.</TextBottom>
      </ContainerBottom>
    </ContainerLogin>
  )
}

export default Login;