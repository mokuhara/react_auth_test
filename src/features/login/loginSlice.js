import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = "http://localhost:8000/";
const token = localStorage.localJWT;

export const fetchAsyncLogin = createAsyncThunk("auth/login", async (auth) => {
  const res = await axios.post(`${apiUrl}login`, auth, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.data;
});

export const fetchAsyncSignup = createAsyncThunk(
  "auth/signup",
  async (auth) => {
    const res = await axios.post(`${apiUrl}signup`, auth, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  }
);

export const fetchAsyncHoge = createAsyncThunk("auth/hoge", async () => {
  console.error('start hoge')
  const res = await axios.get(`${apiUrl}hoge`, {
    headers: {
      Authorization: `barer ${token}`,
    },
  });
  console.log(res.data)
  return res.data;
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    authen: {
      email: "",
      password: "",
    },
    isLoginView: true,
  },
  reducers: {
    editMail(state, action) {
      state.authen.email = action.payload;
    },
    editPassword(state, action) {
      state.authen.password = action.payload;
    },
    toggleMode(state) {
      state.isLoginView = !state.isLoginView;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAsyncLogin.fulfilled, (state, action) => {
      localStorage.setItem("localJWT", action.payload.token);
      action.payload.token && (window.location.href = "/hoge");
    });
    builder.addCase(fetchAsyncHoge.fulfilled, (state, action) => {
      alert(`authen success: ${action.payload}`)
    });
  },
});
export const { editMail, editPassword, toggleMode } = authSlice.actions;
export const selectAuthen = (state) => state.auth.authen;
export const selectIsLoginView = (state) => state.auth.isLoginView;

export default authSlice.reducer;
