import { CUSTOM_LOGIN, CUSTOM_LOGIN_ERROR, GET_USER_INFO, GET_USER_INFO_ERROR, SET_ACCESS_TOKEN, CLEAN_ETHIC } from "./type";


const INITIAL_STATE = {
  accessToken: null,
  userInfo: null
};

const LoginReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CUSTOM_LOGIN:
      return {
        ...state,
        accessToken: action.payload,
      };
    case GET_USER_INFO:
      return {
        ...state,
        userInfo: action.payload
      }
    case SET_ACCESS_TOKEN:
      return {
        ...state,
        accessToken: action.payload
      }
    case CLEAN_ETHIC:
      return {
        ...state,
        accessToken: null,
        userInfo: null
      }

    default:
      return state;
  }
};

export default LoginReducer;
