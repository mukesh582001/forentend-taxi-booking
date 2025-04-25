// src/pages/AdminPanel.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Stack,
} from "@mui/material";
import toast from "react-hot-toast";

const AdminPanel = () => {
  const [rides, setRides] = useState([]);

  const fetchRides = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/rides`);
      setRides(res.data);
    } catch (err) {
      toast.error("Failed to fetch rides");
    }
  };

  const handleStatus = async (id, status) => {
    try {
      await axios.put(`${process.env.REACT_APP_API_BASE_URL}/api/rides/${id}/status`, { status });
      toast.success("Status updated");
      fetchRides();
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/api/rides/${id}`);
      toast.success("Ride deleted");
      fetchRides();
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  useEffect(() => {
    fetchRides();
  }, []);

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h5" gutterBottom>
        Admin Panel – All Rides
      </Typography>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Pickup</TableCell>
            <TableCell>Drop</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rides.map((ride) => (
            <TableRow key={ride._id}>
              <TableCell>{ride.pickup}</TableCell>
              <TableCell>{ride.drop}</TableCell>
              <TableCell>{ride.status}</TableCell>
              <TableCell>
                <Stack direction="row" spacing={1}>
                  <Button
                    size="small"
                    onClick={() => handleStatus(ride._id, "In Progress")}
                  >
                    In Progress
                  </Button>
                  <Button
                    size="small"
                    onClick={() => handleStatus(ride._id, "Completed")}
                  >
                    Completed
                  </Button>
                  <Button
                    size="small"
                    color="error"
                    onClick={() => handleDelete(ride._id)}
                  >
                    Cancel
                  </Button>
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};

export default AdminPanel;
