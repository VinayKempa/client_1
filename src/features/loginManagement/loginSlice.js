import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
  name: "login",
  initialState: {
    keycloak: null,
    authenticated: false,
    avatar: null,
    name: null,
    email: null,
    id: null,
  },
  reducers: {
    login: (state, action) => {
      let { payload } = action;
      if (payload) {
        if (payload.keycloak) {
          state.keycloak = payload.keycloak;
        }
        if (payload.authenticated) {
          state.authenticated = true;
        }
        if (payload.avatar) {
          state.avatar = payload.avatar;
        }
        if (payload.name) {
          state.name = payload.name;
        }
        if (payload.email) {
          state.email = payload.email;
        }
        if (payload.id) {
          state.id = payload.id;
        }
      }
    },
    logout: (state) => {
      state.keycloak.logout();
      state.authenticated = false;
      state.avatar = null;
      state.name = null;
      state.email = null;
      state.id = null;
      state.keycloak = null;
    },
  },
});

export const { login, logout } = loginSlice.actions;
export const loggedInUser = (state) => {
  return state.login;
};

export default loginSlice.reducer;
