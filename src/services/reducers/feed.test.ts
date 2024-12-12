import { expect, it } from '@jest/globals';
import { WebsocketStatus } from "../../utils/types.ts";
import { initialState, orderFeedSlice, wsClose, wsConnecting, wsError, wsMessage, wsOpen } from './feed.ts';

describe('feed reducer', () => {
    it('should return the initial state', () => {
        expect(orderFeedSlice.reducer(undefined, { type: "" })).toEqual(initialState)
    })

    it('should return state with status connecting', () => {
        expect(orderFeedSlice.reducer(initialState, { type: wsConnecting.type })).toEqual(
            { ...initialState, status: WebsocketStatus.CONNECTING }
        )
    })

    it('should return state with status online', () => {
        expect(orderFeedSlice.reducer(initialState, { type: wsOpen.type })).toEqual(
            { ...initialState, status: WebsocketStatus.ONLINE }
        )
    })

    it('should return state with status offline', () => {
        expect(orderFeedSlice.reducer(initialState, { type: wsClose.type })).toEqual(
            { ...initialState, status: WebsocketStatus.OFFLINE }
        )
    })

    it('should return state with connection error', () => {
        const wsConnectionError = "err"
        expect(orderFeedSlice.reducer(initialState, { type: wsError.type, payload: wsConnectionError })).toEqual(
            { ...initialState, connectionError: wsConnectionError }
        )
    })

    it('should return state with orders', () => {
        const testOrders = {
            success: true,
            orders: [],
            total: 1111,
            totalToday: 1111
        }
        expect(orderFeedSlice.reducer(initialState, { type: wsMessage.type, payload: testOrders })).toEqual(
            { ...initialState, orders: testOrders }
        )
    })
})