import { applyMiddleware, createStore } from "redux"
import { thunk } from "redux-thunk";
import { rootReducer } from "./reducers/rootreducer";

const composeEnhancers =
    typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
        : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));

export const configureStore = () => {
    const store = createStore(
        rootReducer,
        enhancer
    )
    return store;
}