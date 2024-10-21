//ეს გვერდი საშუალებას აძლევს მომხმარებლებს აირჩიონ თავიანთი როლი (ადმინისტრატორი, მომხმარებელი, კურიერი) ღილაკების გამოყენებით.
//შერჩეული როლიდან გამომდინარე, იგი პირობითად გამოსცემს შესაბამის ფორმას.

import React, { useState } from 'react';
import { Button } from '@mui/material';
import AdminForm from '../components/AdminForm';
import UserForm from '../components/UserForm';
import CourierForm from '../components/CourierForm';

const RegistrationPage = () => {
  const [role, setRole] = useState('');

  const handleRoleSelection = (selectedRole) => {
    setRole(selectedRole);
  };

  return (
    <div>
      <h1>User Registration</h1>
      <div>
        <Button onClick={() => handleRoleSelection('admin')}>Admin</Button>
        <Button onClick={() => handleRoleSelection('user')}>User</Button>
        <Button onClick={() => handleRoleSelection('courier')}>Courier</Button>
      </div>
      {role === 'admin' && <AdminForm />}
      {role === 'user' && <UserForm />}
      {role === 'courier' && <CourierForm />}
    </div>
  );
};

export default RegistrationPage;
