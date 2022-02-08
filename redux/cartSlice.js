import { createSlice } from '@reduxjs/toolkit';


const cartSlice = createSlice({
    name: "cart",
    initialState: {
        products:[],
        quantity: 0, // cart visual number
        total:0,
    },

    reducers: {
        addProduct:(state, action) => {
            state.products.push(action.payload) // add products to the state
            state.quantity += 1; // increase cart quantity

                                // product price * quanntity, example 2 pizzas with price of $12 = $24 
            state.total += action.payload.price * action.payload.quantity
        },
        reset:(state)=>{
            state.products=[] // add products to the state
            state.quantity = 0; // increase cart quantity
                              // product price * quanntity, example 2 pizzas with price of $12 = $24 
            state.total = 0
        }
    }
})

/* Actions */
export const { addProduct, reset } = cartSlice.actions;

/* Reducer */
export default cartSlice.reducer;