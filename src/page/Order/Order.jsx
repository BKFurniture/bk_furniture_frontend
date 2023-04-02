import React, { useState } from "react";
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

const orders = [
  {
    id: 1,
    orderDate: "01/01/2021",
    products: ["Product A", "Product B", "Product C"],
    total: 100.0,
    status: "To Pay",
  },
  {
    id: 2,
    orderDate: "01/01/2021",
    products: ["Product A", "Product D"],
    total: 50.0,
    status: "Processing",
  },
  {
    id: 3,
    orderDate: "01/01/2021",
    products: ["Product B", "Product C"],
    total: 75.0,
    status: "Shipping",
  },
  {
    id: 4,
    orderDate: "01/01/2021",
    products: ["Product E"],
    total: 20.0,
    status: "Delivered",
  },
  {
    id: 5,
    orderDate: "01/01/2021",
    products: ["Product F"],
    total: 15.0,
    status: "Cancelled",
  },
];

const Order = () => {
  const [filter, setFilter] = useState("All");

  const handleFilterChange = (event, newValue) => {
    setFilter(newValue);
  };

  const filteredOrders =
    filter === "All"
      ? orders
      : orders.filter((order) => order.status === filter);

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
          <Tab label="To Pay" value="To Pay" sx={{ color: "#000000" }} />
          <Tab
            label="Processing"
            value="Processing"
            sx={{ color: "#000000" }}
          />
          <Tab label="Shipping" value="Shipping" sx={{ color: "#000000" }} />
          <Tab label="Delivered" value="Delivered" sx={{ color: "#000000" }} />
          <Tab label="Cancelled" value="Cancelled" sx={{ color: "#000000" }} />
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
            {filteredOrders.map((order, index) => (
              <TableRow
                key={order.id}
                style={
                  index !== orders.length - 1
                    ? { borderBottom: "2px solid grey" }
                    : {}
                }
              >
                <TableCell component="th" scope="row" align="center">
                  {order.id}
                </TableCell>
                <TableCell align="center">{order.orderDate}</TableCell>
                <TableCell align="left">
                  {order.products.length > 1
                    ? `${order.products[0]} and ${
                        order.products.length - 1
                      } others`
                    : order.products[0]}
                </TableCell>
                <TableCell align="center">${order.total}</TableCell>
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
