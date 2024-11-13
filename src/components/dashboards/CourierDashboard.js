import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Button, Typography, Box, TextField } from '@mui/material';
import { getCourierData, updateCourierData, getAssignedTasks } from '../../services/apiService';

export const CourierDashboard = () => {
  const { user, logout } = useAuth();
  const [workingDays, setWorkingDays] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [newWorkingDay, setNewWorkingDay] = useState({ day: '', hours: '' });

  useEffect(() => {
    const fetchCourierData = async () => {
      const courierData = await getCourierData();
      setWorkingDays(courierData.workingDays);
      setTasks(await getAssignedTasks(user.id));
    };
    fetchCourierData();
  }, [user]);

  const handleAddWorkingDay = () => {
    setWorkingDays([...workingDays, newWorkingDay]);
    setNewWorkingDay({ day: '', hours: '' });
  };

  const handleUpdateProfile = async () => {
    await updateCourierData({ workingDays });
  };

  return (
    <Box p={3}>
      <Typography variant="h4">Courier Dashboard</Typography>
      <Typography variant="body1">Welcome, {user.firstName}!</Typography>
      <Box mt={2}>
        <Typography>Email: {user.email}</Typography>
        <Typography>Vehicle: {user.vehicle}</Typography>
      </Box>
      <Box mt={2}>
        <Typography variant="h6">Working Schedule:</Typography>
        {workingDays.map((wd, index) => (
          <Box key={index}>
            <Typography>{wd.day} - {wd.hours}</Typography>
          </Box>
        ))}
        <TextField
          label="Day"
          value={newWorkingDay.day}
          onChange={(e) => setNewWorkingDay({ ...newWorkingDay, day: e.target.value })}
          fullWidth 
        />
        <TextField
          label="Hours"
          value={newWorkingDay.hours}
          onChange={(e) => setNewWorkingDay({ ...newWorkingDay, hours: e.target.value })}
          fullWidth 
          sx={{ mt: 2 }}
        />
        <Button variant="contained" color="primary" onClick={handleAddWorkingDay} sx={{ mt: 2 }}>
          Add Working Day
        </Button>
        <Button variant="contained" color="primary" onClick={handleUpdateProfile} sx={{ mt: 2 }}>
          Update Profile
        </Button>
      </Box>
      <Box mt={2}>
        <Typography variant="h6">Assigned Tasks:</Typography>
        {tasks.length ? (
          tasks.map((task, index) => (
            <Box key={index}>
              <Typography>Name: {task.name}</Typography>
              <Typography>Description: {task.description}</Typography>
              <Typography>Time: {task.time}</Typography>
              <Typography>Priority: {task.priority}</Typography>
            </Box>
          ))
        ) : (
          <Typography>No tasks assigned.</Typography>
        )}
      </Box>
      <Button variant="contained" color="secondary" onClick={logout} sx={{ mt: 2 }}>
        Logout
      </Button>
    </Box>
  );
};
