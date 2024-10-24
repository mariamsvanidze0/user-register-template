// src/components/CourierForm.js
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { 
  TextField, 
  Button, 
  Box, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  Typography,
  IconButton 
} from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { registerUser } from '../services/apiService';
import { useUserContext } from '../context/UserContext';

const DAYS_OF_WEEK = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday'
];

const generateTimeSlots = () => {
  const slots = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute of ['00', '30']) {
      const timeString = `${hour.toString().padStart(2, '0')}:${minute}`;
      slots.push(timeString);
    }
  }
  return slots;
};

const TIME_SLOTS = generateTimeSlots();

const validationSchema = yup.object().shape({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string(),
  pid: yup.string().required('Personal ID is required'),
  phoneNumber: yup.string().required('Phone number is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required'),
  vehicle: yup.string().required('Vehicle information is required'),
  workingDays: yup.array().of(
    yup.object().shape({
      day: yup.string().required('Day is required'),
      startHours: yup.string().required('Start time is required'),
      endHours: yup.string().required('End time is required')
    })
  ).min(5, 'At least 5 working days are required')
});

const CourierForm = () => {
  const { setUser } = useUserContext();
  const [workingDaysCount, setWorkingDaysCount] = useState(5);

  const { control, handleSubmit, formState: { errors }, watch } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      workingDays: Array(5).fill({
        day: '',
        startHours: '',
        endHours: ''
      })
    }
  });

  const workingDays = watch('workingDays');

  const handleAddWorkingDay = () => {
    setWorkingDaysCount(prev => Math.min(prev + 1, 7));
  };

  const handleRemoveWorkingDay = (index) => {
    setWorkingDaysCount(prev => Math.max(prev - 1, 5));
  };

  const onSubmit = async (data) => {
    const transformedWorkingDays = data.workingDays.reduce((acc, { day, startHours, endHours }) => {
      if (day && startHours && endHours) {
        acc[day] = { startHours, endHours };
      }
      return acc;
    }, {});

    const courierData = {
      ...data,
      workingDays: transformedWorkingDays
    };

    try {
      const response = await registerUser(courierData);
      console.log('Courier registered:', response);
      setUser(response);
    } catch (error) {
      console.error(error);
    }
  };

  const usedDays = workingDays?.map(wd => wd.day) || [];

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ maxWidth: 600, mx: 'auto', p: 2 }}>
      <Typography variant="h5" gutterBottom>Courier Registration</Typography>
      
      <Controller
        name="firstName"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            label="First Name"
            error={!!errors.firstName}
            helperText={errors.firstName?.message}
            fullWidth
            margin="normal"
          />
        )}
      />

      <Controller
        name="lastName"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            label="Last Name"
            fullWidth
            margin="normal"
          />
        )}
      />

      <Controller
        name="pid"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            label="Personal ID"
            error={!!errors.pid}
            helperText={errors.pid?.message}
            fullWidth
            margin="normal"
          />
        )}
      />

      <Controller
        name="phoneNumber"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            label="Phone Number"
            error={!!errors.phoneNumber}
            helperText={errors.phoneNumber?.message}
            fullWidth
            margin="normal"
          />
        )}
      />

      <Controller
        name="email"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            label="Email"
            error={!!errors.email}
            helperText={errors.email?.message}
            fullWidth
            margin="normal"
          />
        )}
      />

      <Controller
        name="password"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            label="Password"
            type="password"
            error={!!errors.password}
            helperText={errors.password?.message}
            fullWidth
            margin="normal"
          />
        )}
      />

      <Controller
        name="vehicle"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            label="Vehicle"
            error={!!errors.vehicle}
            helperText={errors.vehicle?.message}
            fullWidth
            margin="normal"
          />
        )}
      />

      <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>Working Days Schedule</Typography>
      
      {Array.from({ length: workingDaysCount }).map((_, index) => (
        <Box key={index} sx={{ display: 'flex', gap: 2, mb: 2, alignItems: 'flex-start' }}>
          <Controller
            name={`workingDays.${index}.day`}
            control={control}
            defaultValue=""
            render={({ field }) => (
              <FormControl fullWidth error={!!errors.workingDays?.[index]?.day}>
                <InputLabel>Day</InputLabel>
                <Select {...field} label="Day">
                  {DAYS_OF_WEEK.map((day) => (
                    <MenuItem
                      key={day}
                      value={day}
                      disabled={usedDays.includes(day) && field.value !== day}
                    >
                      {day.charAt(0).toUpperCase() + day.slice(1)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          />

          <Controller
            name={`workingDays.${index}.startHours`}
            control={control}
            defaultValue=""
            render={({ field }) => (
              <FormControl fullWidth error={!!errors.workingDays?.[index]?.startHours}>
                <InputLabel>Start Time</InputLabel>
                <Select {...field} label="Start Time">
                  {TIME_SLOTS.map((time) => (
                    <MenuItem key={time} value={time}>{time}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          />

          <Controller
            name={`workingDays.${index}.endHours`}
            control={control}
            defaultValue=""
            render={({ field }) => (
              <FormControl fullWidth error={!!errors.workingDays?.[index]?.endHours}>
                <InputLabel>End Time</InputLabel>
                <Select {...field} label="End Time">
                  {TIME_SLOTS.map((time) => (
                    <MenuItem key={time} value={time}>{time}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          />

          {workingDaysCount > 5 && (
            <IconButton 
              onClick={() => handleRemoveWorkingDay(index)}
              sx={{ mt: 1 }}
              color="error"
            >
              <DeleteIcon />
            </IconButton>
          )}
        </Box>
      ))}

      {workingDaysCount < 7 && (
        <Button
          startIcon={<AddIcon />}
          onClick={handleAddWorkingDay}
          sx={{ mb: 2 }}
        >
          Add Working Day
        </Button>
      )}

      {errors.workingDays && (
        <Typography color="error" sx={{ mb: 2 }}>
          {errors.workingDays.message}
        </Typography>
      )}

      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        size="large"
      >
        Register
      </Button>
    </Box>
  );
};

export default CourierForm;