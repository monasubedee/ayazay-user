import { GET_OTP_REQUEST, OTP_LOGIN, ERROR_MESSAGE } from './type';

const initialState = {
  phone: '',
  message: {},
}


const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_OTP_REQUEST:
      return { ...state, phone: action.payload.phone, message: { ...action.payload.response } }
    case OTP_LOGIN:
      return { ...state, message: { ...action.payload.response } }
    case ERROR_MESSAGE:
      return { ...state, message: { ...action.payload.response } }
    default:
      return state
  }
}

export default userReducer