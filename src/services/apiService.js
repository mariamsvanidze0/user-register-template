const API_URL = 'https://crudapi.co.uk/api/v1'; // Base URL for CRUD API
const API_KEY = 'J56vJ74k00TyRbhOTHCR5eQSpiM75ee4rB1mX9CcRXPVOfoCaA'; // Our API key

export const registerUser = async (userData) => {
  const response = await fetch(`${API_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_KEY}`, // Add your API key here
      
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const errorData = await response.json(); // Get the error response data
  console.error('Error response:', errorData); // Log the error response
  console.error('Response status:', response.status); // Log the response status
  throw new Error('Failed to register user');  }
  return await response.json();
};
