import { useState } from "react";
import "../../styles/product.css";
import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Carousel from "../../components/Carousel";
import {
  Rating,
  Typography,
  TextField,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import api from "../../utils/api";
import { useLocation } from "react-router-dom";
import ReviewModal from "../../components/ReviewModal";

function Product(props) {
  const { setOpenSnack, setSnackData } = props;

  const location = useLocation();
  const { id } = location.state;

  const [state, setState] = useState({
    product: {},
  });

  const [updateReview, setUpdateReview] = useState({
    review: "",
    rating: 0,
    id: null,
  });
  const [isReviewModal, setIsReviewModal] = useState(false);
  const handleReviewOpen = (rating, review, id) => {
    setUpdateReview({
      review,
      rating,
      id,
    });
    setIsReviewModal(true);
  };
  const handleReviewClose = () => setIsReviewModal(false);

  const [reviews, setReviews] = useState([]);

  const [newReview, setNewReview] = useState({
    rating: 0,
    review: "",
  });

  const handleAddReview = () => {
    SubmitReview();
  };

  const handleDeleteReview = async (review_id) => {
    const confirmed = window.confirm("Are you sure you want to delete ?");
    if (confirmed) {
      let message = "Success";
      try {
        let response = await api.delete(
          `/api/rating-and-review/delete/${review_id}/`
        );

        if (response.status === 200) {
          let newReviews = reviews.slice(1);
          setReviews([...newReviews]);
          setState({ ...state, is_reviewed: false });

          message = response.data.message;
          setOpenSnack(true);
          setSnackData({
            type: "success",
            message: message,
          });
        }
      } catch (error) {
        setOpenSnack(true);
        setSnackData({
          type: "error",
          message: "Error",
        });
      }
    }
  };

  const SubmitReview = async (is_update = false) => {
    let payload = {
      product: state.product.id,
      rating: newReview.rating,
      review: newReview.review,
    };
    let response = null;
    let message = "Success";

    let old_reviews = reviews
    try {
      if (is_update === true) {
        payload = {
          product: state.product.id,
          rating: updateReview.rating,
          review: updateReview.review,
        };
        response = await api.put(
          `/api/rating-and-review/update/${updateReview.id}/`,
          payload
        );
        old_reviews = old_reviews.slice(1)
        setIsReviewModal(false)
        setUpdateReview({
          review: "",
          rating: 0,
          id: null,
        })
      } else {
        response = await api.post("/api/rating-and-review/create/", payload);
      }

      if (response) {
        message = response.data.message;

        let newData = response.data.data;
        let new_reviews = [newData, ...old_reviews];
        setReviews(new_reviews);

        setState({ ...state, is_reviewed: true });
        setNewReview({
          rating: 0,
          review: "",
        });
      }

      setOpenSnack(true);
      setSnackData({
        type: "success",
        message: message,
      });
    } catch (error) {
      console.error("Error:", error.response.data);
      setOpenSnack(true);
      setSnackData({
        type: "error",
        message: "Error",
      });
    }
  };

  const fetchReviews = async () => {
    let is_reviewed = false;
    try {
      const response_reviews = await api.get(
        `/api/rating-and-review/?product_id=${id}`
      );
      let reviews = [];
      if (response_reviews.status === 200) {
        reviews = response_reviews.data.results;
        is_reviewed = response_reviews.data.is_reviewed;
        setReviews(reviews);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }

    return is_reviewed;
  };

  const fetchData = async () => {
    try {
      const response = await api.get(`/api/product/${id}/`);
      let is_reviewed = await fetchReviews();
      if (response.status === 200) {
        setState({
          ...state,
          product: response.data,
          is_reviewed: is_reviewed,
        });
      }

      console.log("Data:", response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  console.log(state, "state==");
  console.log(reviews, "revi");

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
              <Carousel images={state.product?.product_images ?? []} />
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

            <Rating
              name="read-only"
              value={state.product?.rating ?? 0}
              readOnly
            />

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
              MRP{" "}
              <span
                style={{
                  textDecoration: "line-through",
                  marginRight: "5px",
                  fontWeight: "normal",
                }}
              >
                ₹{state.product.original_price}{" "}
              </span>{" "}
              ({state.product.discount}% OFF)
            </Typography>

            <Box>
              <h2 class="prod-heading">
                <strong>Product Details</strong>
              </h2>

              {/* <p> */}
              <ul class="prod-list">
                {state.product.descriptions?.map((item) => (
                  <li class="detail-list">{item.description}</li>
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
          {state?.is_reviewed === false && (
            <>
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
                  onChange={(e, newValue) =>
                    setNewReview({ ...newReview, rating: newValue })
                  }
                />
                <TextField
                  label="Review"
                  variant="outlined"
                  multiline
                  rows={4}
                  value={newReview.review}
                  onChange={(e) =>
                    setNewReview({ ...newReview, review: e.target.value })
                  }
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
            </>
          )}

          {/* Display Reviews */}
          <List>
            {reviews.map((review, index) => (
              <ListItem
                key={index}
                alignItems="flex-start"
                sx={{ marginBottom: 2 }}
              >
                <Box>
                  <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                    {review.username}

                    {review.is_editable && (
                      <>
                        <Typography
                          variant="body2"
                          component="span"
                          sx={{
                            cursor: "pointer",
                            color: "#1976d2",
                            paddingRight: 2,
                            paddingLeft: 2,
                            "&:hover": { textDecoration: "underline" },
                          }}
                          onClick={() => {
                            handleReviewOpen(
                              review.rating,
                              review.review,
                              review.id
                            );
                          }}
                        >
                          Edit
                        </Typography>
                        <Typography
                          variant="body2"
                          component="span"
                          sx={{
                            cursor: "pointer",
                            color: "#d32f2f",
                            "&:hover": { textDecoration: "underline" },
                          }}
                          onClick={() => {
                            handleDeleteReview(review.id);
                          }}
                        >
                          Delete
                        </Typography>
                      </>
                    )}
                  </Typography>

                  <Rating name="read-only" value={review.rating} readOnly />
                  <Typography variant="body2" sx={{ marginTop: 1 }}>
                    {review.review}
                  </Typography>
                </Box>
              </ListItem>
            ))}
          </List>
        </Box>
        <ReviewModal
          open={isReviewModal}
          setOpen={setIsReviewModal}
          handleOpen={handleReviewOpen}
          handleClose={handleReviewClose}
          review={updateReview}
          setReview={setUpdateReview}
          onSubmit={SubmitReview}
        />
      </Container>
    </React.Fragment>
  );
}

export default Product;
