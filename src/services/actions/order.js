import { sendOrder } from "../../utils/burger-api";
import { resetConstructor } from "./burger-constructor";

export const SEND_ORDER_REQUEST = 'SEND_ORDER_REQUEST';
export const SEND_ORDER_SUCCESS = 'SEND_ORDER_SUCCESS';
export const SEND_ORDER_ERROR = 'SEND_ORDER_ERROR';
export const RESET_ORDER = 'RESET_ORDER';


export function sendOrderData(ids) {
    return function (dispatch) {
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