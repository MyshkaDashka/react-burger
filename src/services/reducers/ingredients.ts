import { TIngredientItem } from "../../utils/types";
import { GET_INGREDIENTS_ERROR, GET_INGREDIENTS_REQUEST, GET_INGREDIENTS_SUCCESS, TIngredientsActions } from "../actions/ingredients";

export type TIngredientsState = {
    ingredients: ReadonlyArray<TIngredientItem>;
    ingredientsRequest: boolean;
    ingredientsError: string | null;
    ingredientsMap: any;
};

export const initialState: TIngredientsState = {
    ingredients: [],
    ingredientsRequest: false,
    ingredientsError: "",
    ingredientsMap: {}
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
                ingredientsMap: action.items.reduce(
                    (accumulator, currentValue) => ({ ...accumulator, [currentValue._id]: currentValue }),
                    {}
                ),
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