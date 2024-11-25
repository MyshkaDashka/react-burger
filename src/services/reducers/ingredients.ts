import { TIngredientItem } from "../../utils/types";
import { GET_INGREDIENTS_ERROR, GET_INGREDIENTS_REQUEST, GET_INGREDIENTS_SUCCESS, TIngredientsActions } from "../actions/ingredients";

export type TIngredientsState = {
    ingredients: ReadonlyArray<TIngredientItem>;
    ingredientsRequest: boolean;
    ingredientsError: string | null;
};

const initialState: TIngredientsState = {
    ingredients: [],
    ingredientsRequest: false,
    ingredientsError: "",
};

export const ingredientsReducer = (state = initialState, action: TIngredientsActions): TIngredientsState => {
    switch (action.type) {
        case GET_INGREDIENTS_REQUEST: {
            return {
                ...state,
                ingredientsRequest: true
            };
        }
        case GET_INGREDIENTS_SUCCESS: {
            return {
                ...state,
                ingredients: action.items,
                ingredientsRequest: false
            };
        }
        case GET_INGREDIENTS_ERROR: {
            return {
                ...state,
                ingredientsError: action.payload,
                ingredientsRequest: false
            };
        }
        default: {
            return state;
        }
    }
}