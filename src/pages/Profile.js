// src/pages/Profile.js
import React from "react";
import {
  Container,
  Typography,
  Paper,
  Box,
  Stack,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
          👤 User Profile
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Typography><strong>Name:</strong> {user?.name}</Typography>
          <Typography><strong>Email:</strong> {user?.email}</Typography>
          <Typography><strong>Role:</strong> {user?.role || "User"}</Typography>
        </Box>
        <Stack direction="row" spacing={2} sx={{ mt: 4 }}>
          <Button variant="outlined" onClick={() => navigate("/")}>
            Home
          </Button>
          <Button variant="contained" color="error" onClick={handleLogout}>
            Logout
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
};

export default Profile;
