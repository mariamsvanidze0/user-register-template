const API_URL = 'https://crudapi.co.uk/api/v1'; 
const API_KEY = 'J56vJ74k00TyRbhOTHCR5eQSpiM75ee4rB1mX9CcRXPVOfoCaA';

export const registerUser = async (userData) => {
  try {
    const response = await fetch(`${API_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`, 
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json(); 
      console.error('Failed to register user:', errorData);
      throw new Error('Failed to register user');
    }

    return await response.json();
  } catch (error) {
    console.error('Error during API call:', error);
    throw error;
  }
};
