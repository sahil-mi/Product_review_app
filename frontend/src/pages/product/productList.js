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
import api from "../../utils/api";
import { useNavigate } from "react-router-dom";

function ProductList() {
  const navigate = useNavigate()
  const [state, setState] = useState({
    data: [
    ],
  });


  const navigate_to_view = (id) =>{
    navigate("/product-view/",{state:{"id":id}})
  }






  const fetchData = async () => {
    try {
      let payload = {
        // page:page,
        // search:search
      }
      const response = await api.get('/api/product/');
      if (response.status === 200){
        
        setState({...state,data:response.data})
      }

      console.log('Data:', response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  React.useEffect(()=>{
    fetchData()
  },[])


console.log(state);


  return (
    <div>
      {/* heading */}
      <h2 className="center-text">
        {/* Product list */}
        </h2>

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
                    id={item.id}
                    image={item.product_images[0].image}
                    title={item.title}
                    price={item.price}
                    originalPrice={item.original_price}
                    discount={item.discount}
                    rating={item.rating}
                    onclick_fun={navigate_to_view}
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
