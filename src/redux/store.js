import { applyMiddleware, createStore } from "redux";
import logger from "redux-logger";
import { persistStore } from "redux-persist";

import rootReducer from "./root-reducer";

const middlewares = [logger];//set this as an array so it's more scable

export const store = createStore(rootReducer,applyMiddleware(...middlewares));

export const persistor = persistStore(store);

export default {store, persistor};