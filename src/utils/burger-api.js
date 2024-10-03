
const NORMA_API = `https://norma.nomoreparties.space/api`;

const checkReponse = (res) => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export function getIngredients() {
    return fetch(`${NORMA_API}/ingredients`)
        .then(checkReponse);
}
