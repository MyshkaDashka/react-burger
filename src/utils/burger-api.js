
export const BASE_URL = `https://norma.nomoreparties.space/api/`;

const checkResponse = (res) => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

const checkSuccess = (res) => {
    return res && res.success ? res : Promise.reject(res);
};

const request = (endpoint, options) => {
    return fetch(`${BASE_URL}${endpoint}`, options)
        .then(checkResponse)
        .then(checkSuccess);
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
        .then(checkResponse)
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

export const fetchWithRefresh = async (endpoint, options) => {
    const url = `${BASE_URL}${endpoint}`;
    try {
        const res = await fetch(url, options);
        return await checkResponse(res);
    } catch (err) {
        if (err.message === "jwt expired") {
            const refreshData = await refreshToken(); //обновляем токен
            options.headers.authorization = refreshData.accessToken;
            const res = await fetch(url, options); //повторяем запрос
            return await checkResponse(res);
        } else {
            return Promise.reject(err);
        }
    }
};

export const getIngredients = () => request("ingredients");

const orderOptions = (ids) => {
    return {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: localStorage.getItem("accessToken")
        },
        body: JSON.stringify({ "ingredients": ids }),
    }
}

export const sendOrder = (ids) => fetchWithRefresh("orders", orderOptions(ids));

const passwordResetOptions = (email) => {
    return {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "email": email }),
    }
}

export const passwordReset = (email) => request("password-reset", passwordResetOptions(email));

const passwordResetResetOptions = (password, code) => {
    return {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "password": password, "token": code }),
    }
}

export const passwordResetReset = (password, code) => request("password-reset/reset", passwordResetResetOptions(password, code));

const registerOptions = (data) => {
    return {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    }
}

export const register = (data) => request("auth/register", registerOptions(data));

const getUserOptions = () => {
    return {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: localStorage.getItem("accessToken")
        },
    }
}

export const getAuthUser = () => fetchWithRefresh("auth/user", getUserOptions());

const loginUserOptions = (email, password) => {
    return {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "email": email, "password": password }),
    }
}

export const loginUser = (email, password) => request("auth/login", loginUserOptions(email, password));

const updateUserOptions = (user) => {
    return {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: localStorage.getItem("accessToken")
        },
        body: JSON.stringify(user),
    }
}

export const updateUserData = (user) => fetchWithRefresh("auth/user", updateUserOptions(user));

const logoutOptions = () => {
    return {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "token": localStorage.getItem("refreshToken") }),
    }
}

export const logoutUser = () => request("auth/logout", logoutOptions());
