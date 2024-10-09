import { v4 } from "uuid";

export const ADD_CONSTRUCTOR_INGREDIENT = 'ADD_CONSTRUCTOR_INGREDIENT';
export const ADD_CONSTRUCTOR_BUN = 'ADD_CONSTRUCTOR_BUN';
export const DELETE_CONSTRUCTOR_INGREDIENT = 'DELETE_CONSTRUCTOR_INGREDIENT';
export const RESET_CONSTRUCTOR = 'RESET_CONSTRUCTOR';

export const addConstructorIngredient = data => {
    return {
        type: ADD_CONSTRUCTOR_INGREDIENT,
        payload: { ...data, key: v4() },
    };
};

export const addConstructorBun = data => {
    return {
        type: ADD_CONSTRUCTOR_BUN,
        payload: data
    };
};

export const deleteConstructorIngredient = data => {
    return {
        type: DELETE_CONSTRUCTOR_INGREDIENT,
        payload: data
    };
};

export const resetConstructor = () => {
    return {
        type: RESET_CONSTRUCTOR
    };
};