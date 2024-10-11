import { RESET_INGREDIENT_DETAILS, SET_INGREDIENT_DETAILS } from "../actions/ingredient-details";

const initialState = {
    selectedIngredient: null,
};

export const ingredientDetailsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_INGREDIENT_DETAILS: {
            return {
                ...state,
                selectedIngredient: action.payload,
            };
        }
        case RESET_INGREDIENT_DETAILS: {
            return {
                ...state,
                selectedIngredient: null,
            };
        }
        default: {
            return state;
        }
    }
}