import React, { useState } from "react";
import { TextField, Typography, Button, Stack } from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import SendIcon from '@mui/icons-material/Send';


const Design = () => {
  const [images, setImages] = useState([]);

  const handleImageChange = (e) => {
    const newImages = Array.from(e.target.files);
    setImages([...images, ...newImages]);
  };

  return (
    <Stack spacing='20px'>
      <Typography
        variant="h5"
        component="h2"
        style={{ color: "#1264A9", fontWeight: 700 }}
        margin="10px"
      >
        Upload design
      </Typography>
      <div align="center" >
        {images.length > 0 ? (
          <div
            style={{
              display: "flex",
              overflowX: "scroll",
              overflowY: "hidden",
              maxHeight: 441,
              maxWidth: 1000,
              whiteSpace: "nowrap",
            }}
          >
            {images.map((image, index) => (
              <div
                key={index}
                style={{
                  display: "inline-block",
                  margin: 5,
                }}
              >
                {image ? (
                  <img
                    src={URL.createObjectURL(image)}
                    alt="uploaded image"
                    style={{ maxWidth: "auto", height: 300 }}
                  />
                ) : (
                  <div
                    style={{
                      width: 150,
                      height: 150,
                      backgroundColor: "#E0E0E0",
                    }}
                  ></div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <Typography>No images uploaded yet</Typography>
        )}
      </div>
      <div style={{ marginLeft: "10px" }}>
        <Typography variant="h6" component="h2" style={{ marginLeft: "90px" }}>
          Short description
        </Typography>
        <div style={{ marginLeft: "90px", marginRight: "90px" }}>
          <TextField
            fullWidth
            multiline
            rows={6}
            variant="outlined"
            style={{ marginTop: "10px" }}
          />
        </div>
      </div>
      <div align="center">
        <input
          accept="image/*"
          id="image-upload"
          type="file"
          multiple
          style={{ display: "none" }}
          onChange={handleImageChange}
    
        />
        <label htmlFor="image-upload">
          <Button variant="contained" component="span" 
          endIcon={<UploadFileIcon color="primary" />}
          style={{
              border: `2px solid #1264A9`,
              backgroundColor: "#ffffff",
              borderRadius: "5px",
              height: "40px",
            }}>
            <Typography
              color="primary"
              fontSize={18}
              variant="button"
              style={{ textTransform: "none" }}
            >
              Upload design
            </Typography>
          </Button>
        </label>
      </div>

      <div align="center">
        <Button
          variant="contained"
          color="primary"
          sx={{
            borderRadius: "10px",
            height: "45px",
            width: "180px", // add this line
          }}
          endIcon={<SendIcon />}
        >
          <Typography
            fontSize={18}
            variant="button"
            style={{ textTransform: "none" }}
          >
            Send Request
          </Typography>
        </Button>
      </div>
    </Stack>
  );
};

export default Design;
