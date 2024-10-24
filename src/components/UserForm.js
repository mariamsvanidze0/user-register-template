import React from 'react';
import BaseForm from './BaseForm';
import { userFields } from './formFields'; 
import { registerUser } from '../services/apiService';
import { useUserContext } from '../context/UserContext';

const UserForm = () => {
  const { setUser } = useUserContext();

  const handleSubmit = async (data) => {
    const formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);
    }

    try {
      const response = await registerUser(formData);
      console.log('User registered:', response);
      setUser(response); 
    } catch (error) {
      console.error(error);
    }
  };

  return <BaseForm fields={userFields} onSubmit={handleSubmit} role="user" />;
};

export default UserForm;

