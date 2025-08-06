import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md" sx={{ mt: 4, textAlign: 'center' }}>
      <Typography variant="h3" gutterBottom>
        Welcome to RedBus Clone
      </Typography>
      <Typography variant="h5" gutterBottom sx={{ mb: 4 }}>
        Book bus tickets easily
      </Typography>
      <Button 
        variant="contained" 
        size="large"
        onClick={() => navigate('/search')}
      >
        Search Buses
      </Button>
    </Container>
  );
}