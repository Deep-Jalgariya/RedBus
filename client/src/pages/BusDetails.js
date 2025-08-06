import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Button, Paper, Box } from '@mui/material';
import axios from 'axios';
import SeatSelection from '../components/SeatSelection';

export default function BusDetails() {
  const { id } = useParams();
  const [bus, setBus] = useState(null);

  useEffect(() => {
    const fetchBus = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/buses/${id}`);
        setBus(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchBus();
  }, [id]);

  if (!bus) return <div>Loading...</div>;

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h4" gutterBottom>{bus.name}</Typography>
        <Typography variant="h6" gutterBottom>
          {bus.departure} to {bus.arrival}
        </Typography>
        <Typography>Departure: {new Date(bus.departureTime).toLocaleString()}</Typography>
        <Typography>Arrival: {new Date(bus.arrivalTime).toLocaleString()}</Typography>
        <Typography>Price: ₹{bus.price}</Typography>
        <Typography>Available Seats: {bus.availableSeats}</Typography>
      </Paper>

      <SeatSelection bus={bus} />
    </Container>
  );
}