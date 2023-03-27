import React, { useEffect, useState } from "react";
import Mapbox from "./Mapbox";
import {
  Button,
  Typography,
  Box,
  Modal,
  TextField,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  height: 650,
  bgcolor: "background.paper",
  padding: "40px 30px",
  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
  borderRadius: "30px",
  gap: 30,
};

function NewAddressModal(props) {
  const [childProp, setChildProp] = useState();
  const [address, setAddress] = useState();

  const [specificAddress, setSpecificAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [fullName, setFullName] = useState("");
  const [isDefault, setIsDefault] = useState(false);

  const [price, setPrice] = useState(0);

  const ParentcallbackFunction = (choosenAddressData) => {
    setChildProp(choosenAddressData);
  };

  useEffect(() => {
    if (childProp) {
      var splitChoosenAdd = childProp.choosenAdd.split(",");
      var [, ...rest] = splitChoosenAdd;
      if (specificAddress.length === 0) setAddress(`${childProp.choosenAdd}`);
      else if (specificAddress.length !== 0 && !isNaN(splitChoosenAdd[0]))
        setAddress(`${specificAddress}, ${rest}`);
    }
  }, [specificAddress, childProp]);

  useEffect(() => {
    if (childProp) {
      var distance = childProp.distance;
      if (distance > 40) {
        setPrice(9.99);
      }
      if (distance > 100) {
        setPrice(14.99);
      }
      if (distance > 150) {
        setPrice(20.99);
      }
      if (distance > 200) {
        setPrice(24.99);
      }
      if (distance > 300) {
        setPrice(29.99);
      }
    }
  }, [childProp]);

  function handleAddNewAddress() {
    let submitAddress = "";
    if (address) submitAddress = address;
    else if (childProp) submitAddress = childProp.choosenAdd;

    if (((address || childProp) && phoneNumber && fullName && specificAddress)) {
      console.log("In NewAddressModal data", {
        location: submitAddress,
        price: price,
        phone_number: phoneNumber,
        isDefault,
      });
      props.handleClose();
    }
  }

  return (
    <Modal
      open={props.open}
      onClose={() => props.handleClose()}
      aria-labelledby="modal-modal-title">
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          New Address
        </Typography>
        <TextField
          margin="normal"
          size="small"
          required
          label="Full Name"
          type="text"
          onChange={(e) => setFullName(e.target.value)}
        />
        <TextField
          margin="normal"
          size="small"
          style={{ marginLeft: "30px" }}
          required
          label="Phone Number"
          type="text"
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <TextField
          margin="normal"
          size="small"
          required
          fullWidth
          label="Specific address"
          type="text"
          onChange={(e) => setSpecificAddress(e.target.value)}
        />
        <div style={{ marginTop: 16 }}>
          <Mapbox
            ParentcallbackFunction={ParentcallbackFunction}
            address={address}
          />
        </div>
        <FormControlLabel
          label="Set as default address"
          control={
            <Checkbox color="success" onChange={() => setIsDefault(true)} />
          }
        />
        <div style={{ display: "flex", justifyContent: "end" }}>
          <Button
            variant="text"
            style={{ marginRight: 5, color: "#828282" }}
            onClick={() => props.handleClose()}>
            Cancel
          </Button>
          <Button
            color="primary"
            disabled={
              !(
                (address || childProp) &&
                phoneNumber &&
                fullName &&
                specificAddress
              )
            }
            variant="contained"
            onClick={handleAddNewAddress}>
            OK
          </Button>
        </div>
      </Box>
    </Modal>
  );
}

export default NewAddressModal;
