import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { reducer as newsReducer } from "src/news/reducers";
import { reducer as footerConfigReducer } from "src/footer-config/reducers";
import { reducer as contactReducer } from "src/contact/reducers";

import { reducer as documentReducer } from "src/document/reducers";
import { reducer as adminAccountReducer } from "src/admin-account/reducer";
import { reducer as categoryReducer } from "src/category/reducers";
import { reducer as profileReducer } from "src/profile/reducer";

const rootReducer = combineReducers({
  newsReducer,
  documentReducer,
  footerConfigReducer,
  contactReducer,
  adminAccountReducer,
  categoryReducer,
  profileReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export { store };
