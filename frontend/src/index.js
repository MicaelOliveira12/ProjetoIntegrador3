import React from 'react';
import ReactDOM from 'react-dom/client';
import Loja from './routes/Loja.js';
import Login from './routes/Login.js';
import Home from './routes/Home.js';
import Product from './routes/RegisterProduct.js'
import { createGlobalStyle } from 'styled-components';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './component/Header/Header';
import Footer from './component/Footer/index.jsx';
import Account from './routes/createAccount.js';
import ProductRegister from './routes/RegisterProduct.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Buffer } from 'buffer';

global.Buffer = Buffer;
const GlobalStyle = createGlobalStyle`
  body{
    margin: 0;
    -webkit-font-smoothing: antialised;
    -mox-osx-font-smoothing: grayscale;
  }

  *{
  font-family: SF Pro Text, SF Pro Icons, Helvetica Neue, Helvetica, Arial, sans-serif;
  }

  li{
  list-style: none;
  }
`

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GlobalStyle />
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path="/" element={<Navigate to="/home"/>}/>
        <Route path="/home" element={<Home />} />
        <Route path="/loja" element={<Loja />} />
        <Route path="/login" element={<Login />} />
        <Route path="/product" element={<Product />} />
        <Route path="/account" element={<Account />} />
        <Route path="/productRegister" element={<ProductRegister />} />
        
      </Routes>
      <Footer/>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
