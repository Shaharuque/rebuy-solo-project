import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface tagState {
  currentTag: string | null;
}

// Define the initial state using that type
const initialState: tagState = {
    currentTag: null,
};

export const tagSlice = createSlice({
  name: "tagging",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    currentTagStore: (state, action: PayloadAction<{
        tag: string | null;

    }>) => {
      state.currentTag = action.payload.tag;
    },
  },
});

export const { currentTagStore } = tagSlice.actions;
export const tagReducer = tagSlice.reducer;
// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.login.value
