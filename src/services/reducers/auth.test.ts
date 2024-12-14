import { expect, it } from '@jest/globals';
import { SET_AUTH_CHECKED, SET_USER, TUserActions } from '../actions/auth';
import { initialState, userReducer } from './auth';

describe('auth reducer', () => {
    it('should return the initial state', () => {
        expect(userReducer(undefined, {} as TUserActions)).toEqual(initialState)
    })

    it('should return state with isAuthChecked true', () => {
        const isAuthChecked = true;
        expect(userReducer(undefined, { type: SET_AUTH_CHECKED, payload: isAuthChecked })).toEqual(
            { ...initialState, isAuthChecked }
        )
    })

    it('should return state with user', () => {
        const user = {
            name: "name",
            email: "email",
        };
        expect(userReducer(undefined, { type: SET_USER, payload: user })).toEqual(
            { ...initialState, user }
        )
    })
})