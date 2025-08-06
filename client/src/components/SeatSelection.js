import React, { useState } from 'react';
import { Grid, Button, Typography, Box } from '@mui/material';

export default function SeatSelection({ bus, onSeatSelect }) {
  const [selectedSeats, setSelectedSeats] = useState([]);

  const handleSeatClick = (seatNumber) => {
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter(seat => seat !== seatNumber));
    } else {
      if (selectedSeats.length < 5) {
        setSelectedSeats([...selectedSeats, seatNumber]);
      }
    }
  };

  const renderSeats = () => {
    const seats = [];
    for (let i = 1; i <= bus.seats; i++) {
      const isSelected = selectedSeats.includes(i);
      const isBooked = bus.availableSeats < i;

      seats.push(
        <Grid item xs={2} key={i}>
          <Button
            variant={isSelected ? 'contained' : 'outlined'}
            color={isSelected ? 'primary' : isBooked ? 'secondary' : 'default'}
            disabled={isBooked}
            onClick={() => handleSeatClick(i)}
            sx={{ minWidth: '40px' }}
          >
            {i}
          </Button>
        </Grid>
      );
    }
    return seats;
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>Select Seats</Typography>
      <Grid container spacing={1}>
        {renderSeats()}
      </Grid>
      <Box sx={{ mt: 2 }}>
        <Typography>Selected: {selectedSeats.length} seat(s)</Typography>
        <Typography>Total: ₹{selectedSeats.length * bus.price}</Typography>
        <Button
          variant="contained"
          disabled={selectedSeats.length === 0}
          onClick={() => onSeatSelect(selectedSeats)}
          sx={{ mt: 1 }}
        >
          Book Selected Seats
        </Button>
      </Box>
    </Box>
  );
}