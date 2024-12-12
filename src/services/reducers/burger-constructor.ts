import { TIngredientItem } from "../../utils/types";
import { ADD_CONSTRUCTOR_BUN, ADD_CONSTRUCTOR_INGREDIENT, DELETE_CONSTRUCTOR_INGREDIENT, MOVE_INGREDIENT, RESET_CONSTRUCTOR, TBurgerConstructorActions, TBurgerConstructorItem } from "../actions/burger-constructor";

export type TBurgerConstructorState = {
    bun: TIngredientItem | null;
    burgerIngredients: Array<TBurgerConstructorItem>;
};

export const initialState: TBurgerConstructorState = {
    bun: null,
    burgerIngredients: [],
};

export const burgerConstructorReducer = (state = initialState, action: TBurgerConstructorActions): TBurgerConstructorState => {
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
                        ? [...state.burgerIngredients].filter(item => item.key !== action.payload.key)
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
        case MOVE_INGREDIENT: {
            const ingredients = [...state.burgerIngredients];
            ingredients.splice(action.payload.toIndex, 0, ingredients.splice(action.payload.fromIndex, 1)[0]);
            return {
                ...state,
                burgerIngredients: ingredients
            };
        }
        default: {
            return state;
        }
    }
}