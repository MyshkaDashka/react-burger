import { v4 } from "uuid";
import { TIngredientItem } from "../../utils/types";

export const ADD_CONSTRUCTOR_INGREDIENT: 'ADD_CONSTRUCTOR_INGREDIENT' = 'ADD_CONSTRUCTOR_INGREDIENT';
export const ADD_CONSTRUCTOR_BUN: 'ADD_CONSTRUCTOR_BUN' = 'ADD_CONSTRUCTOR_BUN';
export const DELETE_CONSTRUCTOR_INGREDIENT: 'DELETE_CONSTRUCTOR_INGREDIENT' = 'DELETE_CONSTRUCTOR_INGREDIENT';
export const RESET_CONSTRUCTOR: 'RESET_CONSTRUCTOR' = 'RESET_CONSTRUCTOR';
export const MOVE_INGREDIENT: 'MOVE_INGREDIENT' = 'MOVE_INGREDIENT';

export type TBurgerConstructorItem = TIngredientItem & { key: string };

export interface IAddConstructorIngredientAction {
    readonly type: typeof ADD_CONSTRUCTOR_INGREDIENT;
    readonly payload: TBurgerConstructorItem;
}

export interface IAddConstructorBunAction {
    readonly type: typeof ADD_CONSTRUCTOR_BUN;
    readonly payload: TIngredientItem;
}

export interface IDeleteConstructorIngredientAction {
    readonly type: typeof DELETE_CONSTRUCTOR_INGREDIENT;
    readonly payload: TBurgerConstructorItem;
}

export interface IResetConstructorAction {
    readonly type: typeof RESET_CONSTRUCTOR;
}

export interface IMoveIngredientAction {
    readonly type: typeof MOVE_INGREDIENT;
    readonly payload: { toIndex: number, fromIndex: number };
}

export type TBurgerConstructorActions = IAddConstructorIngredientAction | IAddConstructorBunAction | IDeleteConstructorIngredientAction | IResetConstructorAction | IMoveIngredientAction;

export const addConstructorIngredient = (data: TIngredientItem) => {
    return {
        type: ADD_CONSTRUCTOR_INGREDIENT,
        payload: { ...data, key: v4() },
    };
};

export const addConstructorBun = (data: TIngredientItem) => {
    return {
        type: ADD_CONSTRUCTOR_BUN,
        payload: data
    };
};

export const deleteConstructorIngredient = (data: TBurgerConstructorItem) => {
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

export const moveIngredient = (toIndex: number, fromIndex: number) => {
    return {
        type: MOVE_INGREDIENT,
        payload: { toIndex, fromIndex }
    };
};