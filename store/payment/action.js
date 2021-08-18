import { GET_QRCODE } from './type';
import api from '../../constants/api';
import authapi from '../../constants/authApi';

export const getQrcode = (id) => async (dispatch) => {
    const response = await authapi.get(`/payment/ayapay/request-qr?order_id=${id}`);
    try{
       dispatch({
           type: GET_QRCODE,
           payload:response.data
       });

    }catch(error){
        console.log("error",error);
        dispatch({
            type: GET_QRCODE,
            payload:response.data
        })
    }
}