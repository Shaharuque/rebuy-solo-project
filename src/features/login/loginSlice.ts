import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface authState {
  email: string | null;
  status: string | null;
  id: string | null;
}

// Define the initial state using that type
const initialState: authState = {
  email: "",
  status: "",
  id: "",
};

export const loginSlice = createSlice({
  name: "login",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    loginHandlerFunc: (state, action: PayloadAction<{
        email: string;
        status: string;
        _id: string;
    }>) => {
      state.email = action.payload.email;
      state.status = action.payload.status;
      state.id = action.payload._id;
    },
    logoutHandlerFunc: (state) => {
        state.email = null;
        state.status = null;
        state.id = null;
    },
  },
});

export const { loginHandlerFunc, logoutHandlerFunc } = loginSlice.actions;
export const loginReducer = loginSlice.reducer;
// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.login.value
