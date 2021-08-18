import { GET_OTP_REQUEST, OTP_LOGIN, ERROR_MESSAGE } from './type'
import api from '../../constants/api'


export const getOtprequest = (phone) => async (dispatch) => {

  try {
    const response = await api.get(`customer/otprequest?phone=${phone}`)
    dispatch({
      type: GET_OTP_REQUEST,
      payload: { response, phone },
    });
  } catch (error) {
    dispatch({
      type: ERROR_MESSAGE,
      payload: error.response
    })
  }

}

export const otpLogin = (data) => async (dispatch) => {
  console.log(data)
  try {
    const response = await api.post(`/customer/otplogin`, data)
    dispatch({
      type: OTP_LOGIN,
      payload: { response },
    });
  } catch (error) {
    dispatch({
      type: ERROR_MESSAGE,
      payload: error.response
    })
  }

}