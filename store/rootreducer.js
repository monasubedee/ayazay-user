import { combineReducers } from "redux";
import LoginReducer from "../store/login/reducer";
import productReducer from "./product/reducer";
import shopReducer from "../store/shops/reducer";
import userReducer from "../store/user/reducer";
import HomeReducer from "./home/reducer";
import cartReducer from '../store/cart/cart.reducer'
import paymentReducer from '../store/payment/reducer';

const rootReducer = combineReducers({
    login: LoginReducer,
    product: productReducer,
    shop: shopReducer,
    user: userReducer,
    cart: cartReducer,
    home: HomeReducer,
    payment:paymentReducer
});

export default rootReducer;
