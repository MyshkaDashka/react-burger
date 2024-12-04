import { applyMiddleware, createStore, combineReducers } from "redux";
import { thunk, ThunkDispatch } from "redux-thunk";
import { ingredientsReducer } from "./reducers/ingredients";
import { burgerConstructorReducer } from "./reducers/burger-constructor";
import { orderReducer } from "./reducers/order";
import { userReducer } from "./reducers/auth";
import {
    useDispatch as dispatchHook,
    useSelector as selectorHook,
} from "react-redux";
import { compose } from 'redux';
import { TIngredientsActions } from "./actions/ingredients";
import { TBurgerConstructorActions } from "./actions/burger-constructor";
import { TOrderActions } from "./actions/order";
import { TUserActions } from "./actions/auth";
import { socketMiddleware } from "./middleware/socket-middleware";
import { TOrder } from "../utils/types";
import { orderFeedSlice, wsClose, wsConnecting, wsError, WsInternalActions, wsMessage, wsOpen } from "./reducers/feed";
import { wsConnect, wsDisconnect, WsExternalActions } from "./actions/web-socket";

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const feedMiddleware = socketMiddleware<TOrder, unknown>({
    connect: wsConnect,
    disconnect: wsDisconnect,
    onConnecting: wsConnecting,
    onOpen: wsOpen,
    onClose: wsClose,
    onError: wsError,
    onMessage: wsMessage
});

const enhancer = composeEnhancers(applyMiddleware(thunk, feedMiddleware));

const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    burgerConstructor: burgerConstructorReducer,
    order: orderReducer,
    user: userReducer,
    orders: orderFeedSlice.reducer
});

export const configureStore = () => {
    //@ts-ignore
    const store = createStore(
        rootReducer,
        enhancer
    )
    return store;
}

export type RootState = ReturnType<typeof rootReducer>;

export type AppActions = TIngredientsActions | TBurgerConstructorActions | TOrderActions | TUserActions | WsExternalActions | WsInternalActions;
export type AppDispatch = ThunkDispatch<RootState, unknown, AppActions>;

export const useDispatch = dispatchHook.withTypes<AppDispatch>();
export const useSelector = selectorHook.withTypes<RootState>();