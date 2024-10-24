//განსაზღვრავს  admin, user და courier

export const adminFields = [
  { name: 'firstName', label: 'First Name', optional: false },
  { name: 'lastName', label: 'Last Name', optional: true },
  { name: 'pid', label: 'Personal ID', optional: false },
  { name: 'phoneNumber', label: 'Phone Number', optional: false },
  { name: 'email', label: 'Email', optional: false },
  { name: 'password', label: 'Password', optional: false },
  { name: 'profileImage', label: 'Profile Image', optional: true },
];

export const userFields = [
  { name: 'firstName', label: 'First Name', optional: false },
  { name: 'lastName', label: 'Last Name', optional: true },
  { name: 'pid', label: 'Personal ID', optional: false },
  { name: 'phoneNumber', label: 'Phone Number', optional: false },
  { name: 'email', label: 'Email', optional: false },
  { name: 'password', label: 'Password', optional: false },
  { name: 'longitude', label: 'Longitude', optional: false },
  { name: 'latitude', label: 'Latitude', optional: false },
  { name: 'profileImage', label: 'Profile Image', optional: true },
];

export const courierFields = [
  { name: 'firstName', label: 'First Name', optional: false },
  { name: 'lastName', label: 'Last Name', optional: true },
  { name: 'pid', label: 'Personal ID', optional: false },
  { name: 'phoneNumber', label: 'Phone Number', optional: false },
  { name: 'email', label: 'Email', optional: false },
  { name: 'password', label: 'Password', optional: false },
  { name: 'profileImage', label: 'Profile Image', optional: true },
  { name: 'vehicle', label: 'Vehicle', optional: false },
  
];

