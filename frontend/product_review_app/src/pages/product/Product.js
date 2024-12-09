import { useState } from "react";
import "../../styles/product.css";
import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Carousel from "../../components/Carousel";
import { Rating, Typography, TextField, Button, Divider, List, ListItem, ListItemText } from "@mui/material";

function Product() {
  const [state, setState] = useState({
    product: {
      title: "Casual Shirt",
      price: 400,
      originalPrice: 344,
      discount: 30,
      rating: 2,
      description:["We recommend you buy a size larger","Regular Fit","Package contains: 1 sweatshirt","Machine wash","Cotton","Product Code: 700194282011"]
    },
  });

  const [reviews, setReviews] = useState([
    { name: "John", rating: 4, comment: "Great product, very comfortable!" },
    { name: "Alice", rating: 5, comment: "Absolutely loved it!" },
  ]);

  const [newReview, setNewReview] = useState({ name: "", rating: 0, comment: "" });

  const handleAddReview = () => {
    if (newReview.name && newReview.comment) {
      setReviews([...reviews, newReview]);
      setNewReview({ name: "", rating: 0, comment: "" });
    }
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container fixed>
        {/* Product and Carousel Section */}
        <Grid container spacing={4} alignItems="center">
          {/* Carousel Section */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Carousel />
            </Box>
          </Grid>

          {/* Product Details Section */}
          <Grid item xs={12} md={6}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                textOverflow: "ellipsis",
                overflow: "hidden",
                whiteSpace: "nowrap",
                marginBottom: 1,
              }}
            >
              {state.product.title}
            </Typography>

            <Rating name="read-only" value={state.product.rating} readOnly />

            <Box
              sx={{
                display: "flex",
                alignItems: "baseline",
                marginTop: 2,
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  // color: "primary.main", 
                  fontWeight: "bold",
                  marginRight: 1,
                }}
              >
                ₹{state.product.price}
              </Typography>


            </Box>
            
            <Typography
                variant="body2"
                sx={{
                  // textDecoration: "line-through",
                  fontWeight: "bold",
                  color: "text.secondary",
                }}
              >
                
               MRP <span style={{textDecoration: "line-through",marginRight:"5px",fontWeight:"normal"}}>₹{state.product.originalPrice} </span>  ({state.product.discount}% OFF)
              </Typography>


              <Box
                  
              >
                <h2 class="prod-heading"><strong>Product Details</strong></h2>

                {/* <p> */}
                <ul class="prod-list">
                {state.product.description.map((item)=>(

              <li class="detail-list">{item}</li>
                ))}

                </ul>

                {/* </p> */}
              </Box>

    
          </Grid>
        </Grid>

        {/* Review and Rating Section */}
        <Box sx={{ marginTop: 4 }}>
          <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 2 }}>
            Reviews & Ratings
          </Typography>
          <Divider sx={{ marginBottom: 2 }} />

          {/* Add Review Form */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              marginBottom: 3,
            }}
          >

            <Rating
              value={newReview.rating}
              onChange={(e, newValue) => setNewReview({ ...newReview, rating: newValue })}
            />
            <TextField
              label="Review"
              variant="outlined"
              multiline
              rows={4}
              value={newReview.comment}
              onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
              fullWidth
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddReview}
              sx={{ alignSelf: "flex-start" }}
            >
              Submit Review
            </Button>
          </Box>

          {/* Display Reviews */}
          <List>
            {reviews.map((review, index) => (
              <ListItem key={index} alignItems="flex-start" sx={{ marginBottom: 2 }}>
                <Box>
                  <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                    {review.name}
                  </Typography>
                  <Rating name="read-only" value={review.rating} readOnly />
                  <Typography variant="body2" sx={{ marginTop: 1 }}>
                    {review.comment}
                  </Typography>
                </Box>
              </ListItem>
            ))}
          </List>
        </Box>
      </Container>
    </React.Fragment>
  );
}

export default Product;
