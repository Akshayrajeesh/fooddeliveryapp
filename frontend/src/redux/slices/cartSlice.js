//store cart items
//track restaurant info
//handle loading errors
//update cart when user adds/remove items
//store delivery details

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  restaurant: {},
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    cartRequest: (state) => {
      state.loading = true;
    },
    cartSuccess: (state, action) => {
      state.loading = false;
      state.cartItems = action.payload.cartItems;
      state.restaurant = action.payload.restaurant;
    },
    cartFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateCartSuccess: (state, action) => {
      state.cartItems = action.payload.cartItems;
    },
    removeCartSuccess: (state, action) => {
      state.cartItems = action.payload?.cart?.cartItems || [];
    },
    clearCart: (state) => {
      state.cartItems = [];
    },
    clearErrors: (state) => {
      state.error = null;
    },
    saveDeliveryInfo: (state, action) => {
      state.deliveryInfo = action.payload;
    },
  },
});

export const {
  cartRequest,
  cartSuccess,
  cartFail,
  updateCartSuccess,
  removeCartSuccess,
  clearCart,
  clearErrors,
  saveDeliveryInfo,
} = cartSlice.actions;

export default cartSlice.reducer;
