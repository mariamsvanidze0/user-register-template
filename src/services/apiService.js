const API_URL = process.env.REACT_APP_API_URL;
const API_KEY = process.env.REACT_APP_API_KEY;


// ახალი იუზერის რეგისტრაცია
export const registerUser = async (userData) => {
  try {
    const formattedData = new FormData();

    // სამუშაო დღეები
    for (const [key, value] of Object.entries(userData)) {
      if (Array.isArray(value)) {
        value.forEach(item => {
          if (item.day && item.startHours && item.endHours) {
            formattedData.append(`workingDays[${item.day}][startHours]`, item.startHours);
            formattedData.append(`workingDays[${item.day}][endHours]`, item.endHours);
          }
        });
      } else {
        formattedData.append(key, value);
      }
    }

    formattedData.append('created_at', new Date().toISOString());

    const response = await fetch(`${API_URL}/users`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Accept': 'application/json',
      },
      body: formattedData,
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('API Error Response:', data);
      throw new Error(data.message || 'Registration failed');
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    if (error.message.includes('Failed to fetch')) {
      throw new Error('Could not connect to the server. Please check your internet connection.');
    }

    throw new Error(error.message || 'Failed to register user. Please try again.');
  }
};

// თასქის მინიჭება კურიერისთვის
export const assignTask = async (courierId, task) => {
  const response = await fetch(`${API_URL}/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({ courierId, ...task }),
  });

  if (!response.ok) {
    throw new Error('Failed to assign task');
  }

  return await response.json();
};


export const getUsers = async ({ filter, page }) => {
  const response = await fetch(`${API_URL}/users?filter=${filter}&page=${page}`, {
    headers: { 'Authorization': `Bearer ${API_KEY}` },
  });

  return await response.json();
};

// კურიერის დეითას აფდეითი
export const updateCourierData = async (data) => {
  const response = await fetch(`${API_URL}/courier`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_KEY}`,
    },
    body: JSON.stringify(data),
  });

  return await response.json();
};

// იუზერის დეითას აფდეითი
export const updateUserData = async (data) => {
  const response = await fetch(`${API_URL}/user`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_KEY}`,
    },
    body: JSON.stringify(data),
  });

  return await response.json();
};

// უსერის პროფილის წაშლა
export const deleteUserProfile = async () => {
  const response = await fetch(`${API_URL}/user`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${API_KEY}` },
  });

  return await response.json();
};

// იუსერის პროფილის დეტალების ამოღება იდ-იით
export const getUserDetails = async (userId) => {
  const response = await fetch(`${API_URL}/users/${userId}`, {
    headers: { 'Authorization': `Bearer ${API_KEY}` },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch user details');
  }

  return await response.json();
};

// იუსერის დეტალების აფდეითი
export const updateUserDetails = async (userId, data) => {
  const response = await fetch(`${API_URL}/users/${userId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_KEY}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Failed to update user details');
  }

  return await response.json();
};

// Get courier details by ID
export const getCourierData = async (courierId) => {
  const response = await fetch(`${API_URL}/couriers/${courierId}`, {
    headers: { 'Authorization': `Bearer ${API_KEY}` },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch courier data');
  }

  return await response.json();
};

// Get tasks assigned to a courier
export const getAssignedTasks = async (courierId) => {
  const response = await fetch(`${API_URL}/tasks?courierId=${courierId}`, {
    headers: { 'Authorization': `Bearer ${API_KEY}` },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch assigned tasks');
  }

  return await response.json();
};
