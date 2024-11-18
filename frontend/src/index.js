import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Buffer } from 'buffer';
import { createGlobalStyle } from 'styled-components';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider } from './Context/userContext.js';
import Header from './component/Header/Header';
import Footer from './component/Footer/index.jsx';
import Home from './routes/Home.js';
import Store from './routes/Store.js';
import Login from './routes/Login.js';
import Account from './routes/Account.js';
import Product from './routes/Product/RegisterProduct.js';
import DisplayProduct from './routes/Product/DisplayProduct.js';

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
      <UserProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/store" element={<Store />} />
          <Route path="/login" element={<Login />} />
          <Route path="/product" element={<Product />} />
          <Route path="/account" element={<Account />} />
          <Route path="/displayProduct" element={<DisplayProduct />} />
        </Routes>
        <Footer />
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);