// src/components/dashboards/AdminDashboard.js
import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Button, Typography, Box } from '@mui/material';

export const AdminDashboard = () => {
  const { user, logout } = useAuth();

  return (
    <Box p={3}>
      <Typography variant="h4">Admin Dashboard</Typography>
      <Typography variant="body1">Welcome, {user.firstName}!</Typography>
      <Box mt={2}>
        <Typography>Email: {user.email}</Typography>
        <Typography>Role: {user.role}</Typography>
      </Box>
      <Button variant="contained" color="secondary" onClick={logout} sx={{ mt: 2 }}>
        Logout
      </Button>
    </Box>
  );
};


