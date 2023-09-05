import { configureStore } from '@reduxjs/toolkit'
import { loginReducer } from '../features/login/loginSlice'
import { searchReducer } from '../features/search/searchSlice'
import { tagReducer } from '../features/tag/tagSlice'
import { adTypeReducer } from '../features/adType/adSlice'
import { apiSlice } from '../features/api/apiSlice'
// ...

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    loginData : loginReducer,
    searchKey:searchReducer,
    tagWord:tagReducer,
    ad:adTypeReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch