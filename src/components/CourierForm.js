// CourierForm კომპონენტი კურიერის მომხმარებლის რეგისტრაციისთვის. 
// ის იყენებს BaseForm-ს კურიერის მომხმარებლებისთვის საჭირო ველების გამოსატანად.

// CourierForm.js

import React from 'react';
import BaseForm from './BaseForm';
import { courierFields } from './formFields';
import { registerUser } from '../services/apiService';
import { useUserContext } from '../context/UserContext';

const CourierForm = () => {
  const { setUser } = useUserContext();

  const handleSubmit = async (data) => {
    try {
      const response = await registerUser(data);
      console.log('Courier registered:', response);
      setUser(response); // Save the user data in context
    } catch (error) {
      console.error('Error registering courier:', error);
    }
  };

  return <BaseForm fields={courierFields} onSubmit={handleSubmit} role="courier" />;
};

export default CourierForm;
