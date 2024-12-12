import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import { media_base_url } from "../utils/utils";

export default function ProductCard({
  id,
  image,
  title,
  price,
  discount,
  originalPrice,
  rating,
  onclick_fun,
}) {
  return (
    <Card
      className="sahil"
      elevation={0}
      sx={{
        maxWidth: 300,
        margin: "auto",
        // boxShadow: 3,
        borderRadius: 2,
        "&:hover": {
          boxShadow: 6,
        },
      }}
      onClick={() => {
        onclick_fun(id);
      }}
    >
      {/* Product Image */}
      <CardMedia
        component="img"
        image={media_base_url + image}
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
          // variant="h6"
          sx={{
            // fontWeight: "bold",
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap",
          }}
        >
          {title}
        </Typography>

        {/* Price Section */}
        <Box sx={{ display: "flex", alignItems: "center", marginTop: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: "bold", marginRight: 1 }}>
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
              // fontWeight: "bold",
              marginTop: 0.5,
              marginBottom: 0.5,
            }}
          >
            ({discount}% OFF)
          </Typography>
        )}

        <Box display="flex" alignItems="center">
          <Rating name="read-only" value={rating} readOnly precision={0.5} />
          <Typography variant="body1" ml={1}>
            ({rating?.toFixed(1)})
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
