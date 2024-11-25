import { getIngredients } from "../../utils/burger-api";
import { TIngredientItem } from "../../utils/types";
import { AppDispatch } from "../store";

export const GET_INGREDIENTS_REQUEST: 'GET_INGREDIENTS_REQUEST' = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS: 'GET_INGREDIENTS_SUCCESS' = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_ERROR: 'GET_INGREDIENTS_ERROR' = 'GET_INGREDIENTS_ERROR';

export interface IGetIngredientsReguestAction {
    readonly type: typeof GET_INGREDIENTS_REQUEST;
}

export interface IGetIngredientsErrorAction {
    readonly type: typeof GET_INGREDIENTS_ERROR;
    readonly payload: string | null;
}

export interface IGetIngredientsSuccessAction {
    readonly type: typeof GET_INGREDIENTS_SUCCESS;
    readonly items: TIngredientItem[];
}

export type TIngredientsActions = IGetIngredientsReguestAction | IGetIngredientsErrorAction | IGetIngredientsSuccessAction;

export function getIngredientsData() {
    return function (dispatch: AppDispatch) {
        dispatch({
            type: GET_INGREDIENTS_REQUEST
        });
        getIngredients().then(res => {
            dispatch({
                type: GET_INGREDIENTS_SUCCESS,
                items: res.data
            });
        })
            .catch(error => {
                dispatch({
                    type: GET_INGREDIENTS_ERROR,
                    payload: error.message,
                });
            })
    };
}