import { GET_QRCODE } from './type';


const initialState = {
    ayaPay : {}
}

const PaymentReducer = (state=initialState,action) => {
    switch(action.type){
        case GET_QRCODE:
            return{
                ...state,
                ayaPay:action.payload
            }
        default:
            return state;
    }
}

export default PaymentReducer;