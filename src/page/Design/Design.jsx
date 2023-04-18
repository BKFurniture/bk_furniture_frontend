import React, { useState } from "react";
import { TextField, Typography, Button, Stack } from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import SendIcon from "@mui/icons-material/Send";
import { useSelector } from "react-redux";
import productApi from "api/product";
import { mailerCustomDesign } from "api/mailer";

const Design = () => {
  const [images, setImages] = useState([]);
  const [filteredImages, setFilteredImages] = useState([]);
  const { email, username } = useSelector((state) => state.user);
  const [description, setDescription] = useState("");
  // const [uploadedImages, setUploadedImages] = useState([]);

  const handleImageChange = (e) => {
    const newImages = Array.from(e.target.files);
    const filteredImages = newImages.filter((image) => image);
    setImages([...images, ...filteredImages]);
    setFilteredImages(filteredImages);
  };

  // const handleImageChange = (event) => {
  //   const files = event.target.files;
  //   const selectedImages = [];
  //   for (let i = 0; i < files.length; i++) {
  //     selectedImages.push(files[i]);
  //   }
  //   // call your function to upload the images here, passing in the selectedImages array
  // };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSendRequest = () => {
    // console.log("description: ", description);
    const formData = new FormData();
    formData.append("description", description);

    // console.log(filteredImages);

    for (let i = 0; i < filteredImages.length; i++) {
      formData.append(`uploaded_images[${i}]`, filteredImages[i]);
    }

    // for (const pair of formData.entries()) {
    //   console.log(pair[0] + ', ' + pair[1]);
    // }

    // const uploadedImages = formData.getAll("uploaded_images");
    // console.log(uploadedImages);

    productApi
      .uploadCustomDesign(formData)
      .then((response) => {
        console.log(response);
        console.log(response.custom_design_images);
        console.log(response.description);
        const urls =
          response.custom_design_images?.map((image) => image.url) ?? [];
        mailerCustomDesign(username, email, {
          imgUrls: urls,
          description: response.description,
        });
        // navigate('/design')
        // })
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // const handleSendRequest = () => {
  //   productApi
  //     .uploadCustomDesign({
  //       description: "asdasd",
  //       upload_images: [
  //         "",// pass all image here
  //       ],
  //     })
  //     // .then((res) => {
  //     //   dispatch(setCartItems([]))
  //     //   dispatch(
  //     //     setSnackbar({
  //     //       open: true,
  //     //       message: 'Place order successfully!',
  //     //       severity: 'success',
  //     //     }),
  //     //   )
  //       mailerCustomDesign(username, email, {
  //         imgUrls: [
  //           "https://bk-furniture-frontend.vercel.app/static/media/poster-home.e9c2c25e21e638b64ee4.png",
  //         ],
  //         descriptions: 'asdad'
  //       })
  //       navigate('/')
  //     // })
  // }

  return (
    <Stack spacing="20px">
      <Typography
        variant="h5"
        component="h2"
        style={{ color: "#1264A9", fontWeight: 700 }}
        margin="10px"
      >
        Upload design
      </Typography>
      <div align="center">
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
            style={{
              marginTop: "10px",
              borderWidth: "2px",
              borderStyle: "solid",
              borderColor: "#1264A9",
              borderRadius: "5px",
            }}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
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
          <Button
            variant="contained"
            component="span"
            endIcon={<UploadFileIcon color="primary" />}
            style={{
              border: `2px solid #1264A9`,
              backgroundColor: "#ffffff",
              borderRadius: "5px",
              height: "40px",
            }}
          >
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
            width: "180px",
          }}
          endIcon={<SendIcon />}
          onClick={handleSendRequest}
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
