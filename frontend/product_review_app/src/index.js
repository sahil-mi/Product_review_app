import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';


import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from "./pages/auth/signup"
import Signin from "./pages/auth/signin"
import ProductList from "./pages/product/productList"
import Product from "./pages/product/Product"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<Signup />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/sign-in/" element={<Signin />} />
        <Route path="/product-list/" element={<ProductList />} />
        <Route path="/product-view/" element={<Product />} />
        {/* <Route path="/product/" element={<ProductList />} /> */}

      </Routes>
    </BrowserRouter>  
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);