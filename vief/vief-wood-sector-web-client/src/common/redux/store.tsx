import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { reducer as postsReducer } from "src/components/posts/reducer";
import { reducer as app } from "./app.reducer";

const rootReducer = combineReducers({
  postsReducer,
  app,
});

export const store = configureStore({
  reducer: rootReducer,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
