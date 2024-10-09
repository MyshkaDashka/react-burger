import { combineReducers } from "redux";
import { ingredientsReducer } from "./ingredients";
import { ingredientDetailsReducer } from "./ingredient-details";
import { burgerConstructorReducer } from "./burger-constructor";
import { orderReducer } from "./order";

export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    ingredientDetails: ingredientDetailsReducer,
    burgerConstructor: burgerConstructorReducer,
    order: orderReducer,
});