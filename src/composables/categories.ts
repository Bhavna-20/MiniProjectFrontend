import axios from 'axios';

export const getAllCategories = async (page, perPage) => {
  const { data } = await axios.get(
    `http://127.0.0.1:5000/categories?page=${page}&perPage=${perPage}`
  );
  return data;
};

export const createCategory = async (payload: object, headers: object) => {
  const { data } = await axios.post(
    'http://127.0.0.1:5000/categories',
    payload,
    headers
  );
  return data;
};

export const editCategory = async (id, payload: object, headers: object) => {
  console.log(id);
  console.log(payload);
  console.log(headers);
  const { data } = await axios.patch(
    'http://127.0.0.1:5000/categories/' + id,
    payload,
    headers
  );
  return data;
};

export const deleteCategory = async (id, headers: object) => {
  const { data } = await axios.delete(
    'http://127.0.0.1:5000/categories/' + id,
    headers
  );
  return data;
};
