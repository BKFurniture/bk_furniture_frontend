import {
  Button,
  Divider,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Radio,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import NewAddressModal from "./AddNewModal";
import UpdateAddressModal from "./UpdateModal";

const ITEMS = {
  fullName: "Duong Lam",
  phoneNumber: "(+84) 942826536",
  location: "248 Ly Thuong Kiet, Quan 10, Ho Chi Minh City, Viet Nam",
  cost: 2,
  isActive: false,
};
const Address = () => {
  const [item, setItem] = useState(ITEMS);
  const [modalAdd, setModalAdd] = React.useState({
    open: false,
  });
  const [modalUpdate, setModalUpdate] = React.useState({
    open: false,
    value: {
      fullName: "",
      phoneNumber: "",
    },
  });

  return (
    <>
      <Paper elevation={0} style={{ padding: 10 }}>
        <Typography
          variant="h6"
          component="h2"
          style={{ color: "#1264A9", fontWeight: 700, marginBottom: 20 }}>
          Your Address
          <Button
            color="primary"
            variant="contained"
            style={{ float: "right" }}
            onClick={() => setModalAdd({ open: true })}>
            + Add new address
          </Button>
        </Typography>
        <Divider />
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Radio
              checked={item.isActive}
              onChange={() => {
                console.log(item);
              }}
            />
          </ListItemAvatar>
          <ListItemText
            primary=<div style={{ fontWeight: 500 }}>{item.fullName}</div>
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  variant="body2"
                  color="text.primary">
                  {item.phoneNumber}
                </Typography>
                <div style={{ width: 500 }}>
                  {" "}
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary">
                    {item.location}
                  </Typography>
                </div>
              </React.Fragment>
            }
          />
          <Typography
            variant
            style={{ color: "#1264A9", paddingTop: 35, cursor: "pointer" }}
            onClick={() =>
              setModalUpdate({
                open: true,
                value: {
                  fullName: item.fullName,
                  phoneNumber: item.phoneNumber,
                },
              })
            }>
            Edit
          </Typography>
        </ListItem>
      </Paper>
      <NewAddressModal
        open={modalAdd.open}
        handleClose={() => setModalAdd({ open: false })}
      />
      <UpdateAddressModal
        open={modalUpdate.open}
        value={modalUpdate.value}
        handleClose={() =>
          setModalUpdate({
            open: false,
            value: { fullName: "", phoneNumber: "" },
          })
        }
      />
    </>
  );
};

export default Address;
