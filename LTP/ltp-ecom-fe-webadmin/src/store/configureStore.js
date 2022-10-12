import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { reduxBatch } from "@manaflair/redux-batch";
import createSagaMiddleware from "redux-saga";
import { createReducer } from "./reducers";
import reducers from "../app/reducers/index";
import logger from "redux-logger";
import rootSaga from "app/saga";

export function configureAppStore() {
  const reduxSagaMonitorOptions = {};
  const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions);

  // Create the store with saga middleware
  const middlewares = [sagaMiddleware];
  if (process.env.NODE_ENV === "development") {
    middlewares.push(logger);
  }
  const store = configureStore({
    reducer: createReducer(reducers),
    middleware: [...getDefaultMiddleware({ serializableCheck: false }), ...middlewares],
    /* istanbul ignore next line */
    devTools: process.env.NODE_ENV !== "production",
    enhancers: [reduxBatch]
  });
  sagaMiddleware.run(rootSaga);
  return store;
}
export const getState = configureAppStore()?.getState;
