import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Rating, TextField } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function ReviewModal(props) {
const {open,setOpen,handleOpen,handleClose,review,setReview,onSubmit } = props


  return (
    <div>
      
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Update review
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              marginBottom: 3,
            }}
          >
            <Rating
              value={review?.rating}
              onChange={(e, newValue) =>
                setReview({ ...review, rating: newValue })
              }
            />
            <TextField
              label="Review"
              variant="outlined"
              multiline
              rows={4}
              value={review?.review}
              onChange={(e) =>
                setReview({ ...review, review: e.target.value })
              }
              fullWidth
            />
            <Button
              variant="contained"
              color="primary"
              onClick={()=>{onSubmit(true)}}
              sx={{ alignSelf: "flex-start" }}
            >
              Update Review
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
