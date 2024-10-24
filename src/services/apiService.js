const API_URL = process.env.REACT_APP_API_URL;
const API_KEY = process.env.REACT_APP_API_KEY; 

export const registerUser = async (userData) => {
  try {
    const formattedData = new FormData();

    
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
