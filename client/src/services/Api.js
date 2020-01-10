import axios from 'axios';

export default() => {
  if (process.env.NODE_ENV === "development") {
    return axios.create({
      baseURL: 'http://localhost:5000/api/',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.token}`
      }
    });
  } else {
    return axios.create({
      baseURL: 'http://localhost:' + process.env.PORT + '/api/',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.token}`
      }
    });
  }
};
