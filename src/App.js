// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import RegistrationPage from './pages/RegistrationPage';
import { AdminDashboard } from './components/dashboards/AdminDashboard';
import { UserDashboard } from './components/dashboards/UserDashboard';
import { CourierDashboard } from './components/dashboards/CourierDashboard';
import PrivateRoute from './components/PrivateRoute';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<RegistrationPage />} />
          <Route
            path="/admin-dashboard"
            element={
              <PrivateRoute allowedRoles={['admin']}>
                <AdminDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/user-dashboard"
            element={
              <PrivateRoute allowedRoles={['user']}>
                <UserDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/courier-dashboard"
            element={
              <PrivateRoute allowedRoles={['courier']}>
                <CourierDashboard />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;