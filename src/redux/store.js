import { applyMiddleware, createStore } from "redux";
import logger from "redux-logger";

import rootReducer from "./root-reducer";

const middlewares = [logger];//set this as an array so it's more scable

const store = createStore(rootReducer,applyMiddleware(...middlewares));

export default store;