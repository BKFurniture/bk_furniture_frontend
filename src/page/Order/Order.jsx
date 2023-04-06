import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Tabs,
  Tab,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";
import ordersApi from "api/orders";

const Order = () => {
  const [filter, setFilter] = useState("All");
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await ordersApi.get();
      if (response.status === 404) {
        setAble(false);
      } else {
        setOrders(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleFilterChange = (event, newValue) => {
    setFilter(newValue);
  };

  const filteredOrders =
    filter === "All"
      ? orders
      : orders.filter && orders.filter((order) => {
          if (filter === "Processing") {
            return order.status === "processing";
          } else if (filter === "On Delivery") {
            return order.status === "on_delivery";
          } else if (filter === "Delivered") {
            return order.status === "delivered";
          } else if (filter === "Canceled") {
            return order.status === "canceled";
          } else {
            return false;
          }
        });

  return (
    <Container>
      <Typography
        variant="h5"
        component="h2"
        style={{ color: "#1264A9", fontWeight: 700 }}
        margin="10px"
      >
        My orders
      </Typography>
      <Box
        sx={{
          backgroundColor: "#fff",
          border: "1px solid #ccc",
          borderRadius: 2,
          marginBottom: 2,
        }}
      >
        <Tabs
          value={filter}
          onChange={handleFilterChange}
          variant="fullWidth"
          sx={{
            mb: 4,
            width: "80%",
            margin: "auto",
          }}
        >
          <Tab label="All" value="All" sx={{ color: "#000000" }} />
          <Tab label="Processing" value="Processing" sx={{ color: "#000000" }} />
          <Tab
            label="On Delivery"
            value="On Delivery"
            sx={{ color: "#000000" }}
          />

          <Tab label="Delivered" value="Delivered" sx={{ color: "#000000" }} />
          <Tab label="Canceled" value="Canceled" sx={{ color: "#000000" }} />
        </Tabs>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="order table">
          <TableHead>
            <TableRow>
              <TableCell
                align="center"
                sx={{ width: "10%", backgroundColor: "#1264A9", color: "#fff" }}
              >
                ID
              </TableCell>
              <TableCell
                align="center"
                sx={{ width: "20%", backgroundColor: "#1264A9", color: "#fff" }}
              >
                Order Date
              </TableCell>
              <TableCell
                align="center"
                sx={{ width: "40%", backgroundColor: "#1264A9", color: "#fff" }}
              >
                Products
              </TableCell>
              <TableCell
                align="center"
                sx={{ width: "15%", backgroundColor: "#1264A9", color: "#fff" }}
              >
                Total
              </TableCell>
              <TableCell
                align="center"
                sx={{ width: "15%", backgroundColor: "#1264A9", color: "#fff" }}
              >
                Status
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredOrders.map && filteredOrders.map((order, index) => (
              <TableRow
                key={order.id}
                style={{
                  borderBottom: "1px solid grey",
                }}
              >
                <TableCell component="th" scope="row" align="center">
                  <Link to={`/order/${order.id}`} style={{ color: "black" }}>
                    {order.id}
                  </Link>
                </TableCell>
                <TableCell align="center">{order.order_date}</TableCell>
                <TableCell align="left">
                  {order.order_items.length > 1
                    ? `${order.order_items[0].product.name} and ${
                        order.order_items.length - 1
                      } other${order.order_items.length > 2 ? "s" : ""}`
                    : order.order_items[0].product.name}
                </TableCell>
                <TableCell align="center">${order.total_price}</TableCell>
                <TableCell align="center">{order.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Order;
