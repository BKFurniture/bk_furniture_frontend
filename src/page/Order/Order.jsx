import React, { useState, useEffect } from 'react'
import {useParams} from 'react-router-dom'
import {useNavigate} from 'react-router-dom'
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
import ordersApi from "api/orders";

const Order = () => {
  const [filter, setFilter] = useState("All");
  const [orders, setOrders] = useState({})

  const fetchOrders = async () => {
    
    try {
      const response = await ordersApi.get();
      console.log(response);
      if (response.status === 404) {
        setAble(false);
      } else {
        setOrders(response);
      }
    } catch (error) {
      console.log(1);
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
            label="On delivery"
            value="On delivery"
            sx={{ color: "#000000" }}
          />
        
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
            {filteredOrders.map((orders, index) => (
              <TableRow
                key={orders.id}
                style={
                  index !== orders.length - 1
                    ? { borderBottom: "2px solid grey" }
                    : {}
                }
              >
                <TableCell component="th" scope="row" align="center">
                  {orders.id}
                </TableCell>
                <TableCell align="center">{orders.orderDate}</TableCell>
                <TableCell align="left">
                  {orders.products.length > 1
                    ? `${orders.products[0]} and ${
                        orders.products.length - 1
                      } others`
                    : orders.products[0]}
                </TableCell>
                <TableCell align="center">${orders.total}</TableCell>
                <TableCell align="center">{orders.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Order;
