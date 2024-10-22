// src/components/dashboards/CourierDashboard.js
import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Button, Typography, Box } from '@mui/material';

export const CourierDashboard = () => {
  const { user, logout } = useAuth();

  return (
    <Box p={3}>
      <Typography variant="h4">Courier Dashboard</Typography>
      <Typography variant="body1">Welcome, {user.firstName}!</Typography>
      <Box mt={2}>
        <Typography>Email: {user.email}</Typography>
        <Typography>Vehicle: {user.vehicle}</Typography>
        <Typography variant="h6" sx={{ mt: 2 }}>Working Schedule:</Typography>
        {Object.entries(user.workingDays || {}).map(([day, hours]) => (
          <Typography key={day}>
            {day}: {hours.startHours} - {hours.endHours}
          </Typography>
        ))}
      </Box>
      <Button variant="contained" color="secondary" onClick={logout} sx={{ mt: 2 }}>
        Logout
      </Button>
    </Box>
  );
};