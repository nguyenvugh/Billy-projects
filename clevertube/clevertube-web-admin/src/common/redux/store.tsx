import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { reducer as newUser } from "src/new-user/reducer";
import { reducer as userLogin } from "src/login/reducers/userLogin.reducer";
import { reducer as dictionary } from "src/dictionary/redux/dictionary.reducer";
import { reducer as topic } from "src/topic/reducer/topic.reducer";
import { reducer as level } from "src/level-user/reducer/level.reducer";
import { reducer as podcast } from "src/podcast/reducer/podcast.reducer";
import { reducer as video } from "src/videos/videolist.reducer";

const rootReducer = combineReducers({
  newUser,
  dictionary,
  topic,
  level,
  podcast,
  userLogin,
  video,
});

export const store = configureStore({
  reducer: rootReducer,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
