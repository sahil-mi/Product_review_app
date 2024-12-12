import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/auth/Signup";
import Signin from "./pages/auth/Signin";
import ProductList from "./pages/product/ProductList";
import Product from "./pages/product/Product";
import Navbar, { Loader, Snackbars } from "./components/BasicComponents";
import ProtectedRoute from "./utils/utils";

const App = () => {
  const [openSnack, setOpenSnack] = useState(false);
  const [snackData, setSnackData] = useState(null);
  const handleCloseSnack = () => {
    setOpenSnack(false);
  };

  return (
    <BrowserRouter>
      <Navbar />
      {openSnack ? (
        <Snackbars
          open={openSnack}
          setOpen={handleCloseSnack}
          data={snackData}
        />
      ) : null}

      <Routes>
        <Route
          path="/*"
          element={
            <Signin setOpenSnack={setOpenSnack} setSnackData={setSnackData} />
          }
        />
        <Route
          path="/sign-up"
          element={
            <Signup setOpenSnack={setOpenSnack} setSnackData={setSnackData} />
          }
        />
        <Route
          path="/sign-in/"
          element={
            <Signin setOpenSnack={setOpenSnack} setSnackData={setSnackData} />
          }
        />
        <Route
          path="/product-list/"
          element={
            <ProtectedRoute>
              <ProductList
                setOpenSnack={setOpenSnack}
                setSnackData={setSnackData}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/product-view/"
          element={
            <ProtectedRoute>
              <Product
                setOpenSnack={setOpenSnack}
                setSnackData={setSnackData}
              />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
