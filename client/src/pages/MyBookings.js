import React, { useState, useEffect } from 'react';
import { Container, Typography, Paper, List, ListItem, ListItemText } from '@mui/material';
import axios from 'axios';

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/bookings', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setBookings(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchBookings();
  }, []);

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>My Bookings</Typography>
      {bookings.length === 0 ? (
        <Typography>No bookings found</Typography>
      ) : (
        <List>
          {bookings.map(booking => (
            <Paper key={booking._id} elevation={2} sx={{ mb: 2 }}>
              <ListItem>
                <ListItemText
                  primary={`${booking.bus.name} (${booking.departure} to ${booking.arrival})`}
                  secondary={`Seats: ${booking.seats.join(', ')} | Total: ₹${booking.totalAmount}`}
                />
              </ListItem>
            </Paper>
          ))}
        </List>
      )}
    </Container>
  );
}