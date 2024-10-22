import React from 'react';
import BaseForm from './BaseForm';
import { userFields } from './formFields'; 
import { registerUser } from '../services/apiService';
import { useUserContext } from '../context/UserContext';

const UserForm = () => {
  const { setUser } = useUserContext();

  const handleSubmit = async (data) => {
    try {
      const response = await registerUser(data);
      console.log('User registered:', response);
      setUser(response); 
    } catch (error) {
      console.error(error);
    }
  };

  return <BaseForm fields={userFields} onSubmit={handleSubmit} />;
};

export default UserForm;
