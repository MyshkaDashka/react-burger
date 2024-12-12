import { RESET_ORDER, SEND_ORDER_ERROR, SEND_ORDER_REQUEST, SEND_ORDER_SUCCESS, TOrderActions } from "../actions/order";

export type TOrderState = {
    order: {number:number} | null;
    sendOrderRequest: boolean;
    sendOrderError: string | null;
};

const initialState: TOrderState = {
    order: null,
    sendOrderRequest: false,
    sendOrderError: "",
};

export const orderReducer = (state = initialState, action: TOrderActions) => {
    switch (action.type) {
        case SEND_ORDER_REQUEST: {
            return {
                ...state,
                sendOrderRequest: true
            };
        }
        case SEND_ORDER_SUCCESS: {
            return {
                ...state,
                order: action.order,
                sendOrderRequest: false
            };
        }
        case SEND_ORDER_ERROR: {
            return {
                ...state,
                sendOrderError: action.payload,
                sendOrderRequest: false
            };
        }
        case RESET_ORDER: {
            return {
                ...state,
                order: null,
                sendOrderRequest: false,
                sendOrderError: "",
            };
        }
        default: {
            return state;
        }
    }
}