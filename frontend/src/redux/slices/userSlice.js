import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  isupdated: false,
  message: null,
  success: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    //login,register,load
    userRequest: (state) => {
      state.loading = true;
      state.isAuthenticated = false;
      state.error = null;
    },
    userSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload; //store user data in the state
    },
    userFail: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.error = action.payload; //store error message in the state
    },
    //logout
    logoutSuccess: (state) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
    },
    logoutFail: (state, action) => {
      state.loading = false;
      state.error = action.payload; //store error message in the state
    },

    //update profile/password
    updateRequest: (state) => {
      state.loading = true;
    },
    updateSuccess: (state, action) => {
      state.loading = false;
      state.isupdated = action.payload;
    },
    updateFail: (state, action) => {
      state.loading = false;
      state.error = action.payload; //store error message in the state
    },
    updateReset: (state) => {
      state.isupdated = false;
    },
    clearErrors: (state) => {
      state.error = null;
    },
  },
});

export const {
  userRequest,
  userSuccess,
  userFail,
  logoutSuccess,
  logoutFail,
  updateRequest,
  updateSuccess,
  updateFail,
  updateReset,
  clearErrors,
} = userSlice.actions;

export default userSlice.reducer;
