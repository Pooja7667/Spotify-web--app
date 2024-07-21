import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
// import axios from "axios";

const initialState = {
  loggedUserDetails: {},
  newUserData: null,
  isLoading: false,
};

const loginSlice = createSlice({
  name: "loginSlice",
  initialState,
  reducers: {
    signupUser: (state, action) => {
      state.newUserData = action.payload;
      // console.log(action.payload);
      // console.log(action.payload.accessToken, "reducer signup");
      localStorage.setItem("userEmail", action.payload.email)
      Cookies.set("token", action.payload.accessToken ,  { expires: 30 });
    },
    loginUser: (state, action) => {
      state.loggedUserDetails = action.payload;
      // console.log(action.payload);
      // console.log(action.payload.accessToken, "reducer login");
      localStorage.setItem("userEmail", action.payload.email)
      Cookies.set("token", action.payload.accessToken , { expires: 30 } );
    },
  },
});

export const { signupUser, loginUser } = loginSlice.actions;
export default loginSlice.reducer;
