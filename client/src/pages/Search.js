import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Grid, Paper, Typography } from '@mui/material';
import axios from 'axios';

export default function Search() {
  const [buses, setBuses] = useState([]);
  const [search, setSearch] = useState({
    departure: '',
    arrival: '',
    date: new Date().toISOString().split('T')[0]
  });

  const handleSearch = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/buses/search', {
        params: search
      });
      setBuses(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 3, my: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="From"
              value={search.departure}
              onChange={(e) => setSearch({...search, departure: e.target.value})}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="To"
              value={search.arrival}
              onChange={(e) => setSearch({...search, arrival: e.target.value})}
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <TextField
              fullWidth
              type="date"
              value={search.date}
              onChange={(e) => setSearch({...search, date: e.target.value})}
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <Button
              fullWidth
              variant="contained"
              onClick={handleSearch}
              sx={{ height: '56px' }}
            >
              Search
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {buses.map(bus => (
        <Paper key={bus._id} elevation={3} sx={{ p: 3, mb: 2 }}>
          <Typography variant="h6">{bus.name}</Typography>
          <Typography>{bus.departure} to {bus.arrival}</Typography>
          <Typography>Price: ₹{bus.price}</Typography>
          <Typography>Available Seats: {bus.availableSeats}</Typography>
        </Paper>
      ))}
    </Container>
  );
}