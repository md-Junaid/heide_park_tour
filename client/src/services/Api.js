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
    console.log("In production, api port is: ", process.env.PORT);
    console.log("Check base URL: ", process.env.BASE_URL);
    console.log("Check env: ", process.env);
    return axios.create({
      baseURL: '' + process.env.PORT + '/api/',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.token}`
      }
    });
  }
};
