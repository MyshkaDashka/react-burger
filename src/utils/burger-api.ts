import { TAuthUserResponce, TIngredientListResponce, TLogoutResponce, TOrderResponce, TRegisterResponce, TResetPasswordResponce, TTokenResponce, TUserData } from "./types";

export const BASE_URL = `https://norma.nomoreparties.space/api/`;

const checkResponse = <T>(res: Response): Promise<T> => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

const checkSuccess = <T extends { success: boolean }>(res: T) => {
    return res && res.success ? res : Promise.reject(res);
};

const request = <T extends { success: boolean }>(endpoint: string, options?: RequestInit) => {
    return fetch(`${BASE_URL}${endpoint}`, options)
        .then(checkResponse<T>)
        .then(checkSuccess<T>);
};

export const refreshToken = () => {
    return fetch(`${BASE_URL}auth/token`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
            token: localStorage.getItem("refreshToken"),
        }),
    })
        .then(checkResponse<TTokenResponce>)
        // !! Важно для обновления токена в мидлваре, чтобы запись
        // была тут, а не в fetchWithRefresh
        .then((refreshData) => {
            if (!refreshData.success) {
                return Promise.reject(refreshData);
            }
            localStorage.setItem("refreshToken", refreshData.refreshToken);
            localStorage.setItem("accessToken", refreshData.accessToken);
            return refreshData;
        });
};

export const fetchWithRefresh = async <T>(endpoint: string, options: RequestInit) => {
    const url = `${BASE_URL}${endpoint}`;
    try {
        const res = await fetch(url, options);
        return await checkResponse<T>(res);
    } catch (err) {
        if (err instanceof Error && err.message === "jwt expired") {
            const refreshData = await refreshToken(); //обновляем токен
            (options.headers as Record<string, string>).authorization = refreshData.accessToken;
            const res = await fetch(url, options); //повторяем запрос
            return await checkResponse<T>(res);
        } else {
            return Promise.reject(err);
        }
    }
};

export const getIngredients = () => request<TIngredientListResponce>("ingredients");

const orderOptions = (ids: Array<string>): RequestInit => {
    return {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: localStorage.getItem("accessToken")
        } as HeadersInit,
        body: JSON.stringify({ "ingredients": ids }),
    }
}

export const sendOrder = (ids: Array<string>) => fetchWithRefresh<TOrderResponce>("orders", orderOptions(ids));

const passwordResetOptions = (email: string) => {
    return {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "email": email }),
    }
}

export const passwordReset = (email: string) => request<TResetPasswordResponce>("password-reset", passwordResetOptions(email));

const passwordResetResetOptions = (password: string, code: string) => {
    return {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "password": password, "token": code }),
    }
}

export const passwordResetReset = (password: string, code: string) => request<TResetPasswordResponce>("password-reset/reset", passwordResetResetOptions(password, code));

const registerOptions = (data: TUserData) => {
    return {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    }
}

export const register = (data: TUserData) => request<TRegisterResponce>("auth/register", registerOptions(data));

const getUserOptions = () => {
    return {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: localStorage.getItem("accessToken")
        } as HeadersInit,
    }
}

export const getAuthUser = () => fetchWithRefresh<TAuthUserResponce>("auth/user", getUserOptions());

const loginUserOptions = (email: string, password: string) => {
    return {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "email": email, "password": password }),
    }
}

export const loginUser = (email: string, password: string) => request<TRegisterResponce>("auth/login", loginUserOptions(email, password));

const updateUserOptions = (user: TUserData) => {
    return {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: localStorage.getItem("accessToken")
        } as HeadersInit,
        body: JSON.stringify(user),
    }
}

export const updateUserData = (user: TUserData) => fetchWithRefresh<TAuthUserResponce>("auth/user", updateUserOptions(user));

const logoutOptions = () => {
    return {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "token": localStorage.getItem("refreshToken") }),
    }
}

export const logoutUser = () => request<TLogoutResponce>("auth/logout", logoutOptions());
