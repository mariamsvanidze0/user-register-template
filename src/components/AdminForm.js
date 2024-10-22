// AdminForm კომპონენტი ადმინისტრატორის მომხმარებლის რეგისტრაციისთვის. 
// ის იყენებს BaseForm-ს ადმინისტრატორის მომხმარებლებისთვის საჭირო ველების გამოსატანად.

import React from 'react';
import BaseForm from './BaseForm';
import { adminFields } from './formFields';
import { registerUser } from '../services/apiService';
import { useUserContext } from '../context/UserContext';

const AdminForm = () => {
  const { setUser } = useUserContext();

  const handleSubmit = async (data) => {
    try {
      const response = await registerUser(data);
      console.log('Admin registered:', response);
      setUser(response); 
    } catch (error) {
      console.error(error);
    }
  };

  return <BaseForm fields={adminFields} onSubmit={handleSubmit} role="admin" />;
};

export default AdminForm;
