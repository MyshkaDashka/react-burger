export const SET_INGREDIENT_DETAILS = 'SET_INGREDIENT_DETAILS';
export const RESET_INGREDIENT_DETAILS = 'RESET_INGREDIENT_DETAILS';

export const setIngredientDetails = (data) => {
    return {
        type: SET_INGREDIENT_DETAILS,
        payload: data
    }
}

export const resetIngredientDetails = () => {
    return {
        type: RESET_INGREDIENT_DETAILS,
    }
}