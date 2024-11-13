import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Button, Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Select, MenuItem, TextField } from '@mui/material';
import { getUsers, assignTask, getUserDetails, updateUserDetails } from '../../services/apiService';

export const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filter, setFilter] = useState('user');
  const [selectedUser, setSelectedUser] = useState(null);
  const [newTask, setNewTask] = useState({ name: '', description: '', time: '', priority: '' });

  useEffect(() => {
    const fetchUsers = async () => {
      const fetchedUsers = await getUsers({ filter, page });
      setUsers(fetchedUsers);
    };
    fetchUsers();
  }, [filter, page]);

  const handleTaskAssign = async (courierId) => {
    if (!newTask.name || !newTask.description || !newTask.time || !newTask.priority) return;

    await assignTask(courierId, newTask);
    setNewTask({ name: '', description: '', time: '', priority: '' });
  };

  const handleSelectUser = async (userId) => {
    const userDetails = await getUserDetails(userId);
    setSelectedUser(userDetails);
  };

  const handleUpdateUser = async () => {
    if (!selectedUser) return;

    await updateUserDetails(selectedUser.id, selectedUser);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Box p={3}>
      <Typography variant="h4">Admin Dashboard</Typography>
      <Typography variant="body1">Welcome, {user.firstName}!</Typography>
      <Box mt={2}>
        <Typography>Email: {user.email}</Typography>
        <Typography>Role: {user.role}</Typography>
      </Box>
      <Box mt={3}>
        <Select value={filter} onChange={(e) => setFilter(e.target.value)} displayEmpty>
          <MenuItem value="user">User</MenuItem>
          <MenuItem value="courier">Courier</MenuItem>
        </Select>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.firstName} {user.lastName}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleSelectUser(user.id)}>View</Button>
                    {user.role === 'courier' && (
                      <Button onClick={() => handleTaskAssign(user.id)}>Assign Task</Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 20, 30]}
          component="div"
          count={users.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
      
      {selectedUser && (
        <Box mt={3}>
          <Typography variant="h5">Update User: {selectedUser.firstName}</Typography>
          <TextField 
            label="Name"
            value={selectedUser.firstName}
            onChange={(e) => setSelectedUser({ ...selectedUser, firstName: e.target.value })}
            fullWidth 
          />
          <TextField 
            label="Email"
            value={selectedUser.email}
            onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
            fullWidth 
            sx={{ mt: 2 }}
          />
          <Button variant="contained" color="primary" onClick={handleUpdateUser} sx={{ mt: 2 }}>
            Update User
          </Button>
        </Box>
      )}

      <Button variant="contained" color="secondary" onClick={logout} sx={{ mt: 2 }}>
        Logout
      </Button>
    </Box>
  );
};
