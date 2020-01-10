import axios from 'axios';

export default() => {
  return axios.create({
    baseURL: `http://localhost:5000/api/`,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.token}`
    }
  });
};
