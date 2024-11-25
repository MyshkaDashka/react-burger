import { sendOrder } from "../../utils/burger-api";
import { AppDispatch } from "../store";
import { resetConstructor } from "./burger-constructor";

export const SEND_ORDER_REQUEST: 'SEND_ORDER_REQUEST' = 'SEND_ORDER_REQUEST';
export const SEND_ORDER_SUCCESS: 'SEND_ORDER_SUCCESS' = 'SEND_ORDER_SUCCESS';
export const SEND_ORDER_ERROR: 'SEND_ORDER_ERROR' = 'SEND_ORDER_ERROR';
export const RESET_ORDER: 'RESET_ORDER' = 'RESET_ORDER';

export interface ISendOrderReguestAction {
    readonly type: typeof SEND_ORDER_REQUEST;
}

export interface ISendOrderErrorAction {
    readonly type: typeof SEND_ORDER_ERROR;
    readonly payload: string | null;
}

export interface ISendOrderSuccessAction {
    readonly type: typeof SEND_ORDER_SUCCESS;
    readonly order: { number: number };
}

export interface IResetOrderAction {
    readonly type: typeof RESET_ORDER;
}

export type TOrderActions = ISendOrderReguestAction | ISendOrderErrorAction | ISendOrderSuccessAction | IResetOrderAction;

export function sendOrderData(ids: string[]) {
    return function (dispatch: AppDispatch) {
        dispatch({
            type: SEND_ORDER_REQUEST
        });
        sendOrder(ids).then(res => {
            dispatch({
                type: SEND_ORDER_SUCCESS,
                order: res.order
            });
            dispatch(resetConstructor());
        })
            .catch(error => {
                dispatch({
                    type: SEND_ORDER_ERROR,
                    payload: error.message,
                });
            })
    };
}

export const resetOrder = () => {
    return {
        type: RESET_ORDER
    };
};