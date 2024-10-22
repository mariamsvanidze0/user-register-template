// src/components/BaseForm.js - განახლებული ვერსია
import React from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button } from '@mui/material';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const BaseForm = ({ fields, onSubmit, role }) => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const validationSchema = Yup.object().shape(
    fields.reduce((schema, field) => {
      if (field.optional) {
        return schema;
      }
      return { ...schema, [field.name]: Yup.string().required(`${field.label} is required`) };
    }, {})
  );

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const handleFormSubmit = async (data) => {
    try {
      const response = await onSubmit(data);
      // Add role to user data
      const userData = { ...response, role };
      login(userData);
      
      // Redirect based on role
      switch(role) {
        case 'admin':
          navigate('/admin-dashboard');
          break;
        case 'user':
          navigate('/user-dashboard');
          break;
        case 'courier':
          navigate('/courier-dashboard');
          break;
        default:
          navigate('/');
      }
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      {fields.map((field) => (
        <div key={field.name}>
          <TextField
            {...register(field.name)}
            label={field.label}
            variant="outlined"
            error={!!errors[field.name]}
            helperText={errors[field.name]?.message}
            fullWidth
            margin="normal"
            type={field.name === 'password' ? 'password' : 'text'}
          />
        </div>
      ))}
      <Button type="submit" variant="contained" color="primary">Submit</Button>
    </form>
  );
};

export default BaseForm;