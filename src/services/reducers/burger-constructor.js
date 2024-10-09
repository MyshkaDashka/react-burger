import { ADD_CONSTRUCTOR_BUN, ADD_CONSTRUCTOR_INGREDIENT, DELETE_CONSTRUCTOR_INGREDIENT, RESET_CONSTRUCTOR } from "../actions/burger-constructor";

const initialState = {
    bun: null,
    burgerIngredients: [],
};

export const burgerConstructorReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_CONSTRUCTOR_INGREDIENT: {
            return {
                ...state,
                burgerIngredients: [...state.burgerIngredients, action.payload]
            };
        }
        case ADD_CONSTRUCTOR_BUN: {
            return {
                ...state,
                bun: action.payload,
            };
        }
        case DELETE_CONSTRUCTOR_INGREDIENT: {
            return {
                ...state,
                burgerIngredients:
                    action.payload.type !== 'bun'
                        ? [...state.burgerIngredients].filter(item => item.key !== action.payload)
                        : [...state.burgerIngredients]
            };
        }
        case RESET_CONSTRUCTOR: {
            return {
                ...state,
                bun: null,
                burgerIngredients: [],
            };
        }
        default: {
            return state;
        }
    }
}