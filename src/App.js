// src/App.js
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import axios from "axios";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  List,
  ListItem,
  Divider,
  Stack,
  CssBaseline,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import Navbar from "./Components/Navbar";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import AdminPanel from "./pages/AdminPanel";
import ProtectedRoute from "./Components/ProtectedRoute";

const theme = createTheme({
  palette: {
    mode: "light",
  },
});

function App() {
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [rides, setRides] = useState([]);

  const getRides = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/rides`);
      setRides(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!pickup || !drop) return;

    try {
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/rides`, { pickup, drop });
      setPickup("");
      setDrop("");
      getRides();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/api/rides/${id}`);
      getRides();
    } catch (error) {
      console.error(error);
    }
  };

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await axios.put(`${process.env.REACT_APP_API_BASE_URL}/api/rides/${id}/status`, {
        status: newStatus,
      });
      getRides();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getRides();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route path="/admin" element={<AdminPanel />} />
          <Route
            path="/"
            element={
              <Container maxWidth="sm" sx={{ mt: 5 }}>
                <Typography variant="h4" gutterBottom textAlign="center">
                  🚖 Book a Ride
                </Typography>

                <Box
                  component="form"
                  onSubmit={handleSubmit}
                  sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                >
                  <TextField
                    label="Pickup Location"
                    value={pickup}
                    onChange={(e) => setPickup(e.target.value)}
                    required
                  />
                  <TextField
                    label="Drop Location"
                    value={drop}
                    onChange={(e) => setDrop(e.target.value)}
                    required
                  />
                  <Button type="submit" variant="contained">
                    Book Ride
                  </Button>
                </Box>

                <Typography variant="h6" sx={{ mt: 4 }}>
                  📜 Ride History
                </Typography>

                <List>
                  {rides.map((ride) => (
                    <React.Fragment key={ride._id}>
                      <ListItem
                        secondaryAction={
                          <Stack direction="row" spacing={1}>
                            <Button
                              variant="outlined"
                              size="small"
                              onClick={() => handleStatusUpdate(ride._id, "In Progress")}
                            >
                              In Progress
                            </Button>
                            <Button
                              variant="outlined"
                              size="small"
                              onClick={() => handleStatusUpdate(ride._id, "Completed")}
                            >
                              Completed
                            </Button>
                            <Button
                              variant="outlined"
                              color="error"
                              size="small"
                              onClick={() => handleDelete(ride._id)}
                            >
                              Cancel
                            </Button>
                          </Stack>
                        }
                      >
                        <Box>
                          <Typography>
                            {ride.pickup} ➡️ {ride.drop}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Status: {ride.status}
                          </Typography>
                        </Box>
                      </ListItem>
                      <Divider />
                    </React.Fragment>
                  ))}
                </List>
              </Container>
            }
          />
        </Routes>
        <Toaster position="top-right" />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
