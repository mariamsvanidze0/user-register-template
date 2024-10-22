// CourierForm კომპონენტი კურიერის მომხმარებლის რეგისტრაციისთვის. 
// ის იყენებს BaseForm-ს კურიერის მომხმარებლებისთვის საჭირო ველების გამოსატანად.

import React from 'react';
import BaseForm from './BaseForm';
import { courierFields } from './formFields';
import { registerUser } from '../services/apiService';

const CourierForm = () => {
  const handleSubmit = async (data) => {
    try {
      const response = await registerUser(data);
      console.log('Courier registered:', response);
    } catch (error) {
      console.error(error);
    }
  };

  return <BaseForm fields={courierFields} onSubmit={handleSubmit} />;
};

export default CourierForm;

