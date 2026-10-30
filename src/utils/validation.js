export function validateAuth({ name, email, password, mode }) {
  const errors = {};
  if (mode === 'signup' && !name.trim()) errors.name = 'Please enter your name.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) errors.email = 'Enter a valid email address.';
  if (password.length < 8) errors.password = 'Use at least 8 characters.';
  return errors;
}

export const getInitials = (name = 'Luma User') =>
  name.split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase();
