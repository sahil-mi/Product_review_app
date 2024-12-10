import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';


import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from "./pages/auth/signup"
import Signin from "./pages/auth/signin"
import ProductList from "./pages/product/productList"
import Product from "./pages/product/Product"
import { Snackbars } from './components/BasicComponents';
import ProtectedRoute from './utils/utils';

const App = () => {
  const [openSnack, setOpenSnack] = useState(false);
  const [snackData, setSnackData] = useState(null);
  const handleCloseSnack = () => {
    setOpenSnack(false);
  };

  return (
    <BrowserRouter>
          {openSnack ? (
        <Snackbars open={openSnack} setOpen={handleCloseSnack} data={snackData} />
      ) : null}
      <Routes>
        <Route path="/*" element={<Signup setOpenSnack={setOpenSnack} setSnackData={setSnackData} />} />
        <Route path="/sign-up" element={<Signup setOpenSnack={setOpenSnack} setSnackData={setSnackData} /> } />
        <Route path="/sign-in/" element={<Signin setOpenSnack={setOpenSnack} setSnackData={setSnackData} /> } />
        <Route path="/product-list/" element={<ProtectedRoute><ProductList setOpenSnack={setOpenSnack} setSnackData={setSnackData} /></ProtectedRoute> } />
        <Route path="/product-view/" element={<ProtectedRoute><Product setOpenSnack={setOpenSnack} setSnackData={setSnackData} /></ProtectedRoute> } />
        {/* <Route path="/product/" element={<ProductList />} /> */}

      </Routes>
    </BrowserRouter>  
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);