import React, { useCallback, useState, useMemo, useRef } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { BurgerIngredientCollection } from "./burger-ingredient-collection/burger-ingredient-collection";
import styles from "./burger-ingredients.module.css";
import { TIngredientItem } from "../../utils/types";
import { useSelector } from "../../services/store";

function BurgerIngredients(): React.JSX.Element {
    const [current, setCurrent] = useState('bun');
    const { ingredients } = useSelector(state => state.ingredients);

    const tabsRef = useRef<HTMLDivElement>(null);
    const bunRef = useRef<HTMLDivElement>(null);
    const mainRef = useRef<HTMLDivElement>(null);
    const sauceRef = useRef<HTMLDivElement>(null);

    const filterBurgersIngredients = useCallback(
        (type: string) => ingredients.filter((e: TIngredientItem) => e.type === type),
        [ingredients]
    )

    const buns = useMemo(
        () => filterBurgersIngredients("bun"),
        [filterBurgersIngredients]
    )

    const sauces = useMemo(
        () => filterBurgersIngredients("sauce"),
        [filterBurgersIngredients]
    )

    const mains = useMemo(
        () => filterBurgersIngredients("main"),
        [filterBurgersIngredients]
    )

    const onScrollIngredients = () => {
        const bunCoordTop = bunRef.current!.getBoundingClientRect().top;
        const mainCoordTop = mainRef.current!.getBoundingClientRect().top;
        const sauceCoordTop = sauceRef.current!.getBoundingClientRect().top;

        const tabCoordBottom = tabsRef.current!.getBoundingClientRect().bottom;

        const diffBun = Math.abs(tabCoordBottom - bunCoordTop);
        const diffMain = Math.abs(tabCoordBottom - mainCoordTop);
        const diffSauce = Math.abs(tabCoordBottom - sauceCoordTop);

        const minValue = Math.min(diffBun, diffMain, diffSauce);

        if (minValue === diffBun) {
            setCurrent('bun');
        } else if (minValue === diffMain) {
            setCurrent('main');
        } else if (minValue === diffSauce) {
            setCurrent('sauce');
        }
    }

    return (
        <>
            <div className="pt-10 pb-5">
                <p className={`${styles.title} text text_type_main-large`}>
                    Соберите бургер
                </p>
            </div>
            <div className={styles.tabs} ref={tabsRef}>
                <Tab value="bun" active={current === 'bun'} onClick={setCurrent}>
                    Булки
                </Tab>
                <Tab value="sauce" active={current === 'sauce'} onClick={setCurrent}>
                    Соусы
                </Tab>
                <Tab value="main" active={current === 'main'} onClick={setCurrent}>
                    Начинки
                </Tab>
            </div>
            {!!ingredients?.length &&
                <div className={styles.container} onScroll={onScrollIngredients}>
                    <div ref={bunRef}>
                        <BurgerIngredientCollection name="Булки" data={buns} />
                    </div>
                    <div ref={sauceRef}>
                        <BurgerIngredientCollection name="Coycы" data={sauces} />
                    </div>
                    <div ref={mainRef}>
                        <BurgerIngredientCollection name="Начинки" data={mains} />
                    </div>
                </div>
            }
        </>
    )
}

export { BurgerIngredients };

