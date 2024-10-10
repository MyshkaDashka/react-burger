
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

export const getIngredients = () => request("ingredients");

const orderOptions = (ids) => {
    return {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "ingredients": ids }),
    }
}

export const sendOrder = (ids) => request("orders", orderOptions(ids));