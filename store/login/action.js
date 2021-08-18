import { CUSTOM_LOGIN, SET_ACCESS_TOKEN, CLEAN_ETHIC } from './type';
import api from '../../constants/api';

export const customLogin = (data) => async (dispatch) => {
  console.log('DATA', data);

  try {
    const response = await api.post('/customer/login', data);

    console.log(response.data);

    dispatch({
      type: CUSTOM_LOGIN,
      payload: response.data.access_token,
    });
  } catch (error) {
    console.log('Error', error);
  }
};

export const setAccessToken = (accessToken) => async (dispatch) => {
  dispatch({
    type: SET_ACCESS_TOKEN,
    payload: accessToken,
  });
};

export const cleanEthic = () => async (dispatch) => {
  console.log('HELLO ETHIC');
  dispatch({
    type: CLEAN_ETHIC,
  });
};
