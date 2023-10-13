import axios from 'axios';

export const getAllUsers = async () => {
  const { data } = await axios.get('http://127.0.0.1:5000/users');
  return data;
};

export const createUser = async (payload: object, headers: object) => {
  const { data } = await axios.post(
    'http://127.0.0.1:5000/users',
    payload,
    headers
  );
  return data;
};

export const editUser = async (id, payload: object, headers: object) => {
  console.log(id);
  console.log(payload);
  console.log(headers);
  const { data } = await axios.patch(
    'http://127.0.0.1:5000/users/' + id,
    payload,
    headers
  );
  return data;
};

export const deleteUser = async (id, headers: object) => {
  const { data } = await axios.delete(
    'http://127.0.0.1:5000/users/' + id,
    headers
  );
  return data;
};
