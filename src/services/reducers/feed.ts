import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TOrder, WebsocketStatus } from "../../utils/types.ts";

export type TOrderFeedStore = {
    status: WebsocketStatus;
    connectionError: string | null;
    orders: TOrder;
}

const initialState: TOrderFeedStore = {
    status: WebsocketStatus.OFFLINE,
    connectionError: null,
    orders: {
        success: false,
        orders: [],
        total: 0,
        totalToday: 0
    }
}

export const orderFeedSlice = createSlice({
    name: "orderFeed",
    initialState,
    reducers: {
        wsConnecting: (state) => {
            state.status = WebsocketStatus.CONNECTING;
        },
        wsOpen: (state) => {
            state.status = WebsocketStatus.ONLINE;
        },
        wsClose: (state) => {
            state.status = WebsocketStatus.OFFLINE;
        },
        wsError: (state, action: PayloadAction<string>) => {
            state.connectionError = action.payload;
        },
        wsMessage: (state, action: PayloadAction<TOrder>) => {
            state.orders = action.payload;
        }
    },
    selectors: {
        getStatus: state => state.status,
        getError: state => state.connectionError,
        getOrders: state => state.orders,
    }
});

export const { wsConnecting, wsOpen, wsClose, wsError, wsMessage } = orderFeedSlice.actions;

export type WsActionCreators = typeof orderFeedSlice.actions;

export type WsInternalActions = ReturnType<WsActionCreators[keyof WsActionCreators]>
export const { getStatus, getError, getOrders } = orderFeedSlice.selectors;