import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";

export default function ProductCard({
  image,
  title,
  price,
  discount,
  originalPrice,
  rating,
}) {
  return (
    <Card
      sx={{
        maxWidth: 300,
        margin: "auto",
        boxShadow: 3,
        borderRadius: 2,
        "&:hover": {
          boxShadow: 6,
        },
      }}
    >
      {/* Product Image */}
      <CardMedia
        component="img"
        image={image}
        alt={title}
        sx={{
          height: 300,
          objectFit: "cover",
        }}
      />

      {/* Product Info */}
      <CardContent>
        {/* Product Title */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap",
          }}
        >
          {title}
        </Typography>

        {/* Price Section */}
        <Box sx={{ display: "flex", alignItems: "center", marginTop: 1 }}>
          <Typography
            variant="h6"
            sx={{ color: "primary.main", fontWeight: "bold", marginRight: 1 }}
          >
            ₹{price}
          </Typography>
          {originalPrice && (
            <Typography
              variant="body2"
              sx={{ textDecoration: "line-through", color: "text.secondary" }}
            >
              ₹{originalPrice}
            </Typography>
          )}
        </Box>

        {/* Discount */}
        {discount && (
          <Typography
            variant="body2"
            sx={{
              color: "green",
              fontWeight: "bold",
              marginTop: 0.5,
            }}
          >
            {discount}% OFF
          </Typography>
        )}

        <Typography>
          <Rating name="read-only" value={rating} readOnly />
        </Typography>
      </CardContent>

      {/* Add to Cart Button */}
      {/* <Box sx={{ padding: 2 }}>
        <Button
          variant="contained"
          fullWidth
          sx={{
            backgroundColor: "primary.main",
            "&:hover": {
              backgroundColor: "primary.dark",
            },
          }}
        >
          Add to Cart
        </Button>
      </Box> */}
    </Card>
  );
}
