import { configureStore } from "@reduxjs/toolkit";

/* Reducers */
import cartReducer from './cartSlice';

export default configureStore({
    reducer: {
        cart: cartReducer,
    },
});