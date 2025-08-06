import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Button, Paper } from '@mui/material';
import axios from 'axios';

export default function Booking() {
  const [booking, setBooking] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // In a real app, you would fetch the booking details here
    const exampleBooking = {
      id: '123',
      busName: 'Express Travels',
      from: 'Chennai',
      to: 'Bangalore',
      date: new Date().toLocaleDateString(),
      seats: ['A1', 'A2'],
      total: 2400
    };
    setBooking(exampleBooking);
  }, []);

  const handleConfirm = async () => {
    try {
      // In a real app, you would send booking data to backend
      await axios.post('http://localhost:5000/api/bookings', booking);
      navigate('/my-bookings');
    } catch (err) {
      console.error(err);
    }
  };

  if (!booking) return <div>Loading...</div>;

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>Booking Summary</Typography>
        <Typography>Bus: {booking.busName}</Typography>
        <Typography>Route: {booking.from} to {booking.to}</Typography>
        <Typography>Date: {booking.date}</Typography>
        <Typography>Seats: {booking.seats.join(', ')}</Typography>
        <Typography variant="h6" sx={{ mt: 2 }}>Total: ₹{booking.total}</Typography>
        <Button 
          variant="contained" 
          sx={{ mt: 3 }}
          onClick={handleConfirm}
        >
          Confirm Booking
        </Button>
      </Paper>
    </Container>
  );
}