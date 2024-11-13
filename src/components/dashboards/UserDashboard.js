import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Button, Typography, Box, TextField } from '@mui/material';
import { updateUserData, deleteUserProfile } from '../../services/apiService';

export const UserDashboard = () => {
  const { user, logout } = useAuth();
  const [name, setName] = useState(user.firstName);
  const [email, setEmail] = useState(user.email);

  const handleUpdateProfile = async () => {
    const updatedData = { firstName: name, email };
    await updateUserData(updatedData);
  };

  const handleDeleteProfile = async () => {
    await deleteUserProfile();
  };

  return (
    <Box p={3}>
      <Typography variant="h4">User Dashboard</Typography>
      <Typography variant="body1">Welcome, {user.firstName}!</Typography>
      <Box mt={2}>
        <Typography>Email: {user.email}</Typography>
      </Box>
      <Box mt={3}>
        <TextField 
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth 
        />
        <TextField 
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth 
          sx={{ mt: 2 }}
        />
        <Button variant="contained" color="primary" onClick={handleUpdateProfile} sx={{ mt: 2 }}>
          Update Profile
        </Button>
        <Button variant="contained" color="error" onClick={handleDeleteProfile} sx={{ mt: 2 }}>
          Delete Profile
        </Button>
      </Box>
      <Button variant="contained" color="secondary" onClick={logout} sx={{ mt: 2 }}>
        Logout
      </Button>
    </Box>
  );
};
