import React, { useState } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Card, CardMedia } from "@mui/material";
import { media_base_url } from "../utils/utils";

export default function ProductCarousel({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Go to the previous slide
  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1,
    );
  };

  // Go to the next slide
  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1,
    );
  };

  return (
    <Box
      sx={{
        width: "400px", // Fixed width for the carousel
        height: "600px", // Fixed height for the carousel
        margin: "auto",
        overflow: "hidden",
        position: "relative",
        marginTop: 4,
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      {/* Image */}
      {images ? (
        <Card sx={{ width: "100%", height: "100%" }}>
          <CardMedia
            component="img"
            image={media_base_url + images[currentIndex]?.image}
            alt={images[currentIndex]?.alt}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover", // Ensures the image scales proportionally to fill the area
            }}
          />
        </Card>
      ) : null}

      {/* Navigation Arrows */}
      <IconButton
        onClick={handlePrev}
        sx={{
          position: "absolute",
          top: "50%",
          left: 10,
          transform: "translateY(-50%)",
        }}
      >
        <ArrowBackIosIcon />
      </IconButton>

      <IconButton
        onClick={handleNext}
        sx={{
          position: "absolute",
          top: "50%",
          right: 10,
          transform: "translateY(-50%)",
        }}
      >
        <ArrowForwardIosIcon />
      </IconButton>

      {/* Dots Navigation */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: 2,
        }}
      >
        {images.map((_, index) => (
          <Box
            key={index}
            onClick={() => setCurrentIndex(index)}
            sx={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              backgroundColor:
                currentIndex === index ? "primary.main" : "grey.400",
              margin: "0 5px",
              cursor: "pointer",
            }}
          />
        ))}
      </Box>
    </Box>
  );
}
