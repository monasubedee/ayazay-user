import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
let apiToken = '';
if (process.browser) {
  apiToken = localStorage.getItem('userToken');
  // apiToken = useSelector((state) => state.login.accessToken);
}

export default axios.create({
  baseURL: process.env.NEXT_PUBLIC_REACT_APP_BASE_URL,
  timeout: 5000,
  headers: {
    Accept: 'applicaiton/json',
    language: 'English',
    Authorization: `Bearer ${apiToken}`,
  },
});
