import { expect, it } from '@jest/globals';
import { ADD_CONSTRUCTOR_BUN, ADD_CONSTRUCTOR_INGREDIENT, DELETE_CONSTRUCTOR_INGREDIENT, MOVE_INGREDIENT, RESET_CONSTRUCTOR, TBurgerConstructorActions } from "../actions/burger-constructor";

import { burgerConstructorReducer, initialState } from './burger-constructor';
import { TIngredientItem } from "../../utils/types";
import { v4 } from 'uuid';

const testItemBun: TIngredientItem & { key: string } = {
    _id: v4(),
    name: 'name1',
    type: 'bun',
    proteins: 1,
    fat: 2,
    carbohydrates: 3,
    calories: 4,
    price: 5,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    key: v4()
};

const testItemMain: TIngredientItem & { key: string } = {
    _id: v4(),
    name: 'name2',
    type: 'main',
    proteins: 1,
    fat: 2,
    carbohydrates: 3,
    calories: 4,
    price: 5,
    image: 'https://code.s3.yandex.net/react/code/meat-03.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
    key: v4()
};

describe('burgerConstructor reducer', () => {
    it('should return the initial state', () => {
        expect(burgerConstructorReducer(undefined, {} as TBurgerConstructorActions)).toEqual(initialState)
    })

    it('should return state with added item', () => {
        expect(burgerConstructorReducer(undefined, { type: ADD_CONSTRUCTOR_INGREDIENT, payload: testItemMain })).toEqual(
            {
                ...initialState,
                burgerIngredients: [...initialState.burgerIngredients, testItemMain]
            }
        )
    })

    it('should return state with added bun', () => {
        expect(burgerConstructorReducer(undefined, { type: ADD_CONSTRUCTOR_BUN, payload: testItemBun })).toEqual(
            {
                ...initialState,
                bun: testItemBun,
            }
        )
    })

    it('should return state without deleted item', () => {
        expect(burgerConstructorReducer({
            ...initialState,
            burgerIngredients: [testItemMain, { ...testItemMain, _id: v4() }]
        }, { type: DELETE_CONSTRUCTOR_INGREDIENT, payload: testItemMain })).toEqual(
            {
                ...initialState,
                burgerIngredients:
                    testItemMain.type !== 'bun'
                        ? [...initialState.burgerIngredients].filter(item => item.key !== testItemMain.key)
                        : [...initialState.burgerIngredients]
            }
        )
    })

    it('should return moved state', () => {
        const fromIndex = 0;
        const toIndex = 2;
        const initIngredients = [testItemMain, { ...testItemMain, _id: v4() }, { ...testItemMain, _id: v4() }]
        const ingredientsTmp = [...initIngredients];
        ingredientsTmp.splice(toIndex, 0, ingredientsTmp.splice(fromIndex, 1)[0]);

        expect(burgerConstructorReducer({ ...initialState, burgerIngredients: [...initIngredients] },
            { type: MOVE_INGREDIENT, payload: { toIndex, fromIndex } })).toEqual(
                { ...initialState, burgerIngredients: ingredientsTmp }
            )
    })

    it('should return reseted state', () => {
        expect(burgerConstructorReducer(undefined, { type: RESET_CONSTRUCTOR })).toEqual(initialState)
    })
})