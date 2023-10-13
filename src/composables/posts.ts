import axios from 'axios';

export const getAllPosts = async (page, perPage) => {
  const { data } = await axios.get(
    `http://127.0.0.1:5000/posts?page=${page}&perPage=${perPage}`
  );
  return data;
};

export const getSinglePost = async (id) => {
  const { data } = await axios.get('http://127.0.0.1:5000/posts/' + id);
  return data;
};

export const createPost = async (payload: object, headers: object) => {
  const { data } = await axios.post('http://127.0.0.1:5000/posts', payload, {
    headers,
  });
  return data;
};

export const editPost = async (id, payload: object, headers: object) => {
  console.log(typeof id);
  const { data } = await axios.patch(
    'http://127.0.0.1:5000/posts/' + id,
    payload,
    headers
  );
  return data;
};

export const deletePost = async (id, headers: object) => {
  const { data } = await axios.delete(
    'http://127.0.0.1:5000/posts/' + id,
    headers
  );
  return data;
};
