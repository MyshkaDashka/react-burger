import { expect, it } from '@jest/globals';
import { RESET_ORDER, SEND_ORDER_ERROR, SEND_ORDER_REQUEST, SEND_ORDER_SUCCESS, TOrderActions } from "../actions/order";
import { orderReducer, initialState } from './order';

describe('Order reducer', () => {
    it('should return the initial state', () => {
        expect(orderReducer(undefined, {} as TOrderActions)).toEqual(initialState)
    })

    it('should return state with send order request', () => {
        expect(orderReducer(undefined, { type: SEND_ORDER_REQUEST })).toEqual(
            { ...initialState, sendOrderRequest: true }
        )
    })

    it('should return state with successed order', () => {
        const testOrder = { number: 12 }
        expect(orderReducer(undefined, { type: SEND_ORDER_SUCCESS, order: testOrder })).toEqual(
            { ...initialState, order: testOrder, sendOrderRequest: false }
        )
    })

    it('should return state with error request', () => {
        const errorText = "testErrorText";
        expect(orderReducer(undefined, { type: SEND_ORDER_ERROR, payload: errorText })).toEqual(
            { ...initialState, sendOrderError: errorText, sendOrderRequest: false }
        )
    })

    it('should return state with reset order', () => {
        expect(orderReducer(undefined, { type: RESET_ORDER })).toEqual(
            { ...initialState, order: null, sendOrderRequest: false, sendOrderError: "" }
        )
    })
})