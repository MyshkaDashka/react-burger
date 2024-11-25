import { getAuthUser, loginUser, logoutUser, updateUserData } from "../../utils/burger-api";
import { TUserData } from "../../utils/types";
import { AppDispatch } from "../store";

export const SET_AUTH_CHECKED: 'SET_AUTH_CHECKED' = 'SET_AUTH_CHECKED';
export const SET_USER: 'SET_USER' = 'SET_USER';

export interface ISetAuthCheckedAction {
    readonly type: typeof SET_AUTH_CHECKED;
    readonly payload: boolean;
}

export interface ISetUserAction {
    readonly type: typeof SET_USER;
    readonly payload: TUserData | null;
}

export type TUserActions = ISetAuthCheckedAction | ISetUserAction;

export const setAuthChecked = (value: boolean) => ({
    type: SET_AUTH_CHECKED,
    payload: value,
});

export const setUser = (user: TUserData | null) => ({
    type: SET_USER,
    payload: user,
});

export const getUser = () => {
    return (dispatch: AppDispatch) => {
        return getAuthUser().then((res) => {
            dispatch(setUser(res.user));
        });
    };
};

export const updateUser = (payload: TUserData) => {
    return (dispatch: AppDispatch) => {
        return updateUserData(payload).then((res) => {
            dispatch(setUser(res.user));
        });
    };
};

export const login = (email: string, password: string) => {
    return (dispatch: AppDispatch) => {
        return loginUser(email, password).then((res) => {
            localStorage.setItem("accessToken", res.accessToken);
            localStorage.setItem("refreshToken", res.refreshToken);
            dispatch(setUser(res.user));
            dispatch(setAuthChecked(true));
        });
    };
};

export const checkUserAuth = () => {
    return (dispatch: AppDispatch) => {
        if (localStorage.getItem("accessToken")) {
            dispatch(getUser())
                .catch(() => {
                    localStorage.removeItem("accessToken");
                    localStorage.removeItem("refreshToken");
                    dispatch(setUser(null));
                })
                .finally(() => dispatch(setAuthChecked(true)));
        } else {
            dispatch(setAuthChecked(true));
        }
    };
};

export const logout = () => {
    return (dispatch: AppDispatch) => {
        return logoutUser().then(() => {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            dispatch(setUser(null));
        });
    };
};