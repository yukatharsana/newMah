import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  isAuthenticated: false,
  user: null,
  addressloading: false,
  successMessage: null,
  error: null,
  usersLoading: false,
  users: null,
};

export const userReducer = createReducer(initialState, {
  LoadUserRequest: (state) => {
    state.loading = false;
  },
  LoadUserSuccess: (state, action) => {
    state.isAuthenticated = true;
    state.loading = false;
    state.user = action.payload;
  },
  
  LoadUserFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
 
  },
  updateUserInfoRequest: (state) => {
    state.loading = true;
  },
  updateUserInfoSuccess: (state, action) => {
    state.loading = false;
    state.user = action.payload;
  },
  updateUserInfoFailed: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  updateUserAddressRequest: (state) => {
    state.addressloading = true;
  },
  updateUserAddressSuccess: (state, action) => {
    state.addressloading = false;
    state.successMessage = action.payload.successMessage;
    state.user = action.payload.user;
  },
  updateUserAddressFailed: (state, action) => {
    state.addressloading = false;
    state.error = action.payload;
  },
  deleteUserAddressRequest: (state) => {
    state.addressloading = true;
  },
  deleteUserAddressSuccess: (state, action) => {
    state.addressloading = false;
    state.successMessage = action.payload.successMessage;
    state.user = action.payload.user;
  },
  deleteUserAddressFailed: (state, action) => {
    state.addressloading = false;
    state.error = action.payload;
  },
  getAllUsersRequest: (state) => {
    state.usersLoading = true;
  },
  getAllUsersSuccess: (state, action) => {
    state.usersLoading = false;
    state.users = action.payload;
  },
  getAllUsersFailed: (state, action) => {
    state.usersLoading = false;
    state.error = action.payload;
  },
  clearErrors: (state) => {
    state.error = null;
  },
  clearMessages: (state) => {
    state.successMessage = null;
  },
});
