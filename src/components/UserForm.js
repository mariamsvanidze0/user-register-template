// UserForm კომპონენტი რეგულარული მომხმარებლის რეგისტრაციისთვის. 
// ის იყენებს BaseForm-ს რეგულარული მომხმარებლებისთვის საჭირო ველების გამოსატანად.

import React from 'react';
import BaseForm from './BaseForm';
import { userFields } from './formFields';
import { registerUser } from '../services/apiService';

const UserForm = () => {
  const handleSubmit = async (data) => {
    try {
      const response = await registerUser(data);
      console.log('User registered:', response);
    } catch (error) {
      console.error(error);
    }
  };

  return <BaseForm fields={userFields} onSubmit={handleSubmit} role="user" />;
};

export default UserForm;
