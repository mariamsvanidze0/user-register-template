// src/components/dashboards/UserDashboard.js
import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Button, Typography, Box } from '@mui/material';

export const UserDashboard = () => {
  const { user, logout } = useAuth();

  return (
    <Box p={3}>
      <Typography variant="h4">User Dashboard</Typography>
      <Typography variant="body1">Welcome, {user.firstName}!</Typography>
      <Box mt={2}>
        <Typography>Email: {user.email}</Typography>
        <Typography>Address: {user.address?.lat}, {user.address?.lng}</Typography>
      </Box>
      <Button variant="contained" color="secondary" onClick={logout} sx={{ mt: 2 }}>
        Logout
      </Button>
    </Box>
  );
};
