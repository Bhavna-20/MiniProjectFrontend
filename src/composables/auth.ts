import axios from 'axios';

export const signinUser = async (payload: object) => {
  const data = await axios.post('http://127.0.0.1:5000/auth/login', payload);
  return data;
};

export const register = async (payload: object) => {
  const data = await axios.post('http://127.0.0.1:5000/auth/register', payload);
  return data;
};
