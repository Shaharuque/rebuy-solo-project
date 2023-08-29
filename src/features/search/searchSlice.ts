import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface searchState {
  keyword: string | null;
}

// Define the initial state using that type
const initialState: searchState = {
    keyword: "",
};

export const searchSlice = createSlice({
  name: "search",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    searchKeyStore: (state, action: PayloadAction<{
        searchedKey: string | null;

    }>) => {
      state.keyword = action.payload.searchedKey;
    },
  },
});

export const { searchKeyStore } = searchSlice.actions;
export const searchReducer = searchSlice.reducer;
// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.login.value
