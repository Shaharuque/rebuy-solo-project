import { configureStore } from '@reduxjs/toolkit'
import { loginReducer } from '../features/login/loginSlice'
import { searchReducer } from '../features/search/searchSlice'
import { tagReducer } from '../features/tag/tagSlice'
import { adTypeReducer } from '../features/adType/adSlice'
// ...

export const store = configureStore({
  reducer: {
    loginData : loginReducer,
    searchKey:searchReducer,
    tagWord:tagReducer,
    ad:adTypeReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch