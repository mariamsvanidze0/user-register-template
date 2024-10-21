//ეს კომპონენტი აიღებს ველების ჩამონათვალს და დინამიურად გამოიტანს მათ.

import React from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button } from '@mui/material';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const BaseForm = ({ fields, onSubmit }) => {
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

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
          />
        </div>
      ))}
      <Button type="submit" variant="contained" color="primary">Submit</Button>
    </form>
  );
};

export default BaseForm;


//ეს კომპონენტი იღებს ორ რეკვიზიტს: ველებს (ფორმის ველების მასივი) და onSubmit (ფუნქცია ფორმის წარდგენის დასამუშავებლად).
//ის იყენებს React Hook Form-ს ფორმის სახელმწიფო მართვისთვის და Yup-ს ვალიდაციისთვის.
//ფორმის თითოეული ველი დინამიურად არის გადმოცემული ველების მასივის საფუძველზე.