import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: localStorage.getItem("cartItems") 
    ? JSON.parse(localStorage.getItem("cartItems")) 
    : [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const itemIndex = state.items.findIndex(
        (item) => item._id === action.payload._id
      );
      if (itemIndex >= 0) {
        state.items[itemIndex].quantity += 1;
      } else {
        const tempProduct = { ...action.payload, quantity: 1 };
        state.items.push(tempProduct);
      }
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },

    removeFromCart: (state, action) => {
      const nextCartItems = state.items.filter(
        (item) => item._id !== action.payload
      );
      state.items = nextCartItems;
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },

decreaseCart: (state, action) => {
  const itemIndex = state.items.findIndex(
    (item) => item._id === action.payload._id
  );

  if (state.items[itemIndex].quantity > 1) {
    state.items[itemIndex].quantity -= 1;
  } else {
    state.items = state.items.filter(
      (item) => item._id !== action.payload._id
    );
  }
  localStorage.setItem("cartItems", JSON.stringify(state.items));
},
clearCart: (state) => {
  state.items = [];
  localStorage.removeItem("cartItems"); 
},
  }
});

export const { addToCart, removeFromCart, decreaseCart,clearCart } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
export default cartSlice.reducer;