import axios from 'axios';

export default() => {
  if (process.env.NODE_ENV === "development") {
    console.log("In development");
    return axios.create({
      baseURL: 'http://localhost:5000/api/',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.token}`
      }
    });
  } else if (process.env.NODE_ENV === "production") {
    console.log("In production, server running at port: ", process.env.PORT);
    return axios.create({
      baseURL: process.env.BASE_URL + '/api/',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.token}`
      }
    });
  }
};
