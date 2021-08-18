import axios from 'axios';

export default axios.create({
  /* baseURL: "https://api.uat-aya-zay.com", */
  // baseURL: "https://api.uat-aya-zay.com",
  baseURL: process.env.NEXT_PUBLIC_REACT_APP_BASE_URL,
  timeout: 5000,
  headers: {
    Accept: 'application/json',
    language: 'English'
  },
});

