// CourierDashboard.js

import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Button, Typography, Box, MenuItem, Select } from '@mui/material';

export const CourierDashboard = () => {
  const { user, logout } = useAuth(); // Fetch user data from context
  const [workingDays, setWorkingDays] = useState([
    { day: 'Monday', startHours: '00:00', endHours: '15:20' },
    { day: 'Tuesday', startHours: '09:00', endHours: '18:20' },
    { day: 'Wednesday', startHours: '11:00', endHours: '20:00' }
  ]);

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const hours = Array.from({ length: 48 }, (_, i) => `${String(Math.floor(i / 2)).padStart(2, '0')}:${i % 2 === 0 ? '00' : '30'}`);

  const addDayField = () => {
    if (workingDays.length < 7) {
      setWorkingDays([...workingDays, { day: '', startHours: '00:00', endHours: '00:00' }]);
    }
  };

  const handleDayChange = (index, field, value) => {
    const updatedDays = workingDays.map((item, i) => (i === index ? { ...item, [field]: value } : item));
    setWorkingDays(updatedDays);
  };

  const handleSubmit = async () => {

  };

  return (
    <Box p={3}>
      <Typography variant="h4">Courier Dashboard</Typography>
      <Typography variant="body1">Welcome, {user.firstName}!</Typography>
      <Box mt={2}>
        <Typography>Email: {user.email}</Typography>
        <Typography>Vehicle: {user.vehicle}</Typography>
        <Typography variant="h6" sx={{ mt: 2 }}>Working Schedule:</Typography>

        {workingDays.map((workDay, index) => (
          <Box key={index} display="flex" gap={2} mb={2}>
            <Select
              value={workDay.day}
              onChange={(e) => handleDayChange(index, 'day', e.target.value)}
              displayEmpty
              sx={{ width: '150px' }}
            >
              <MenuItem value="" disabled>Select Day</MenuItem>
              {daysOfWeek.map((day) => (
                <MenuItem key={day} value={day}>{day}</MenuItem>
              ))}
            </Select>

            <Select
              value={workDay.startHours}
              onChange={(e) => handleDayChange(index, 'startHours', e.target.value)}
              sx={{ width: '100px' }}
            >
              {hours.map((time) => (
                <MenuItem key={time} value={time}>{time}</MenuItem>
              ))}
            </Select>

            <Select
              value={workDay.endHours}
              onChange={(e) => handleDayChange(index, 'endHours', e.target.value)}
              sx={{ width: '100px' }}
            >
              {hours.map((time) => (
                <MenuItem key={time} value={time}>{time}</MenuItem>
              ))}
            </Select>
          </Box>
        ))}

        <Button variant="contained" color="primary" onClick={addDayField} disabled={workingDays.length >= 7}>
          Add Day
        </Button>

        <Button variant="contained" color="success" onClick={handleSubmit} sx={{ ml: 2 }}>
          Submit
        </Button>
      </Box>

      <Button variant="contained" color="secondary" onClick={logout} sx={{ mt: 2 }}>
        Logout
      </Button>
    </Box>
  );
};
