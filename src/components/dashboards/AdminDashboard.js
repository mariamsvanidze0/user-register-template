import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  Button, Typography, Box, Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, TablePagination, Select, MenuItem, TextField, Dialog, DialogTitle, DialogContent, DialogActions 
} from '@mui/material';
import { getUsers, assignTask, getUserDetails, updateUserDetails, deleteUserProfile } from '../../services/apiService';

export const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filter, setFilter] = useState('user');
  const [selectedUser, setSelectedUser] = useState(null);
  const [newTask, setNewTask] = useState({ name: '', description: '', time: '', priority: '' });
  const [openTaskDialog, setOpenTaskDialog] = useState(false);
  const [taskCourierId, setTaskCourierId] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const fetchedUsers = await getUsers({ filter, page, rowsPerPage });
      setUsers(fetchedUsers);
    };
    fetchUsers();
  }, [filter, page, rowsPerPage]);

  const handleTaskAssign = async () => {
    if (!newTask.name || !newTask.description || !newTask.time || !newTask.priority) return;
    await assignTask(taskCourierId, newTask);
    setOpenTaskDialog(false);
    setNewTask({ name: '', description: '', time: '', priority: '' });
  };

  const handleOpenTaskDialog = (courierId) => {
    setTaskCourierId(courierId);
    setOpenTaskDialog(true);
  };

  const handleSelectUser = async (userId) => {
    const userDetails = await getUserDetails(userId);
    setSelectedUser(userDetails);
  };

  const handleUpdateUser = async () => {
    if (!selectedUser) return;
    await updateUserDetails(selectedUser.id, selectedUser);
  };

  const handleDeleteCourier = async (courierId) => {
    await deleteUserProfile(courierId);
    setUsers(users.filter(user => user.id !== courierId));
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
                      <>
                        <Button onClick={() => handleOpenTaskDialog(user.id)}>Assign Task</Button>
                        <Button color="error" onClick={() => handleDeleteCourier(user.id)}>Delete</Button>
                      </>
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

      <Dialog open={openTaskDialog} onClose={() => setOpenTaskDialog(false)}>
        <DialogTitle>Assign Task</DialogTitle>
        <DialogContent>
          <TextField
            label="Task Name"
            value={newTask.name}
            onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
            fullWidth
          />
          <TextField
            label="Description"
            value={newTask.description}
            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
            fullWidth
            sx={{ mt: 2 }}
          />
          <TextField
            label="Time"
            value={newTask.time}
            onChange={(e) => setNewTask({ ...newTask, time: e.target.value })}
            fullWidth
            sx={{ mt: 2 }}
          />
          <TextField
            label="Priority"
            value={newTask.priority}
            onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
            fullWidth
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenTaskDialog(false)}>Cancel</Button>
          <Button onClick={handleTaskAssign} color="primary">Assign</Button>
        </DialogActions>
      </Dialog>

      <Button variant="contained" color="secondary" onClick={logout} sx={{ mt: 2 }}>
        Logout
      </Button>
    </Box>
  );
};
