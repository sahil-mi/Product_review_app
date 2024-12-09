import { useState } from "react";
import axios from "axios";
import "../../styles/product.css";

import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

import Grid from "@mui/material/Grid2";

import ProductCard from "../../components/card";
import img from "../../images/product2.jpeg";

function ProductList() {
  const [state, setState] = useState({
    data: [
      {
        title: "Casual Shirt",
        price: 400,
        originalPrice: 344,
        discount: 30,
        image: img,
        rating: 2,
      },
      {
        title: "Casual Shirt",
        price: 400,
        originalPrice: 344,
        discount: 30,
        image: img,
        rating: 2,
      },

      {
        title: "Casual Shirt",
        price: 400,
        originalPrice: 344,
        discount: 30,
        image: img,
        rating: 2,
      },

      {
        title: "Casual Shirt",
        price: 400,
        originalPrice: 344,
        discount: 30,
        image: img,
        rating: 2,
      },

      {
        title: "Casual Shirt",
        price: 400,
        originalPrice: 344,
        discount: 30,
        image: img,
        rating: 2,
      },

      {
        title: "Casual Shirt",
        price: 400,
        originalPrice: 344,
        discount: 30,
        image: img,
        rating: 2,
      },

      {
        title: "Casual Shirt",
        price: 400,
        originalPrice: 344,
        discount: 30,
        image: img,
        rating: 2,
      },
    ],
  });

  return (
    <div>
      {/* heading */}
      <h2 className="center-text">Product list</h2>

      {/* ===========prodcut list======== */}
      <React.Fragment>
        <CssBaseline />
        <Container fixed>
          <Box sx={{ flexGrow: 1 }}>
            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              {state.data.map((item, index) => (
                <Grid key={index} size={{ xs: 2, sm: 4, md: 4 }}>
                  <ProductCard
                    image={item.image}
                    title={item.title}
                    price={item.price}
                    originalPrice={item.originalPrice}
                    discount={item.discount}
                    rating={item.rating}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>
      </React.Fragment>
    </div>
  );
}

export default ProductList;
