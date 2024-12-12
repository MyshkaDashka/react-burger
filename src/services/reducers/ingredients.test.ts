import { expect, it } from '@jest/globals';
import { GET_INGREDIENTS_ERROR, GET_INGREDIENTS_REQUEST, GET_INGREDIENTS_SUCCESS, TIngredientsActions } from "../actions/ingredients";

import { ingredientsReducer, initialState } from './ingredients';
import { TIngredientItem } from "../../utils/types";
import { v4 } from 'uuid';

const testItem: TIngredientItem = {
    _id: v4(),
    name: 'name',
    type: 'main',
    proteins: 1,
    fat: 2,
    carbohydrates: 3,
    calories: 4,
    price: 5,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
};

describe('ingredients redcer', () => {
    it('should return the initial state', () => {
        expect(ingredientsReducer(undefined, {} as TIngredientsActions)).toEqual(initialState)
    })

    it('should return state with created request', () => {
        expect(ingredientsReducer(undefined, { type: GET_INGREDIENTS_REQUEST })).toEqual(
            { ...initialState, ingredientsRequest: true }
        )
    })

    it('should return state with successed create fields', () => {
        const testItems: Array<TIngredientItem> = [
            testItem, { ...testItem, _id: v4() }, { ...testItem, _id: v4() }
        ];
        expect(ingredientsReducer(undefined, { type: GET_INGREDIENTS_SUCCESS, items: testItems })).toEqual(
            {
                ...initialState, ingredients: testItems,
                ingredientsMap: testItems.reduce(
                    (accumulator, currentValue) => ({ ...accumulator, [currentValue._id]: currentValue }),
                    {}
                ),
                ingredientsRequest: false
            }
        )
    })

    it('should return state with error', () => {
        const errorText = "testErrorText";
        expect(ingredientsReducer(undefined, { type: GET_INGREDIENTS_ERROR, payload: errorText })).toEqual(
            {
                ...initialState, ingredientsError: errorText,
                ingredientsRequest: false
            }
        )
    })

})