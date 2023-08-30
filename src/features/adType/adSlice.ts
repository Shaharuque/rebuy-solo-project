import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface adTypeState {
  adtype: string | null;
}

// Define the initial state using that type
const initialState: adTypeState = {
    adtype: '',
};

export const adTypeSlice = createSlice({
  name: "adtype",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    adTypeStore: (state, action: PayloadAction<{
        adType: string | null;
    }>) => {
      state.adtype = action.payload.adType;
    },
  },
});

export const { adTypeStore } = adTypeSlice.actions;
export const adTypeReducer = adTypeSlice.reducer;
// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.login.value
