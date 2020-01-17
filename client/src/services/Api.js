import axios from 'axios';

export default() => {
  if (process.env.NODE_ENV === "development") {
    console.log("In development, port: ", process.env.PORT);
    return axios.create({
      baseURL: 'http://localhost:' + process.env.PORT + '/api/',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.token}`
      }
    });
  } else if (process.env.NODE_ENV === "production") {
    console.log("In production, api port is: ", process.env.PORT);
    return axios.create({
      baseURL: '' + process.env.PORT + '/api/',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.token}`
      }
    });
  }
};
