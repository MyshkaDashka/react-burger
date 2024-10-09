import { useCallback, useState, useMemo, useRef } from "react";
import PropTypes from "prop-types";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { BurgerIngredientCollection } from "./burger-ingredient-collection/burger-ingredient-collection";
import { IngredientItemType } from "./../../utils/types";
import styles from "./burger-ingredients.module.css";

function BurgerIngredients({ data }) {
    const [current, setCurrent] = useState('bun');

    const tabsRef = useRef(null);
    const bunRef = useRef(null);
    const mainRef = useRef(null);
    const sauceRef = useRef(null);

    const filterBurgersIngredients = useCallback(
        (type) => data.filter(e => e.type === type),
        [data]
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
        const bunCoordTop = bunRef.current.getBoundingClientRect().top;
        const mainCoordTop = mainRef.current.getBoundingClientRect().top;
        const sauceCoordTop = sauceRef.current.getBoundingClientRect().top;

        const tabCoordBottom = tabsRef.current.getBoundingClientRect().bottom;

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
            <div style={{ display: 'flex' }} ref={tabsRef}>
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
            {!!data?.length &&
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

BurgerIngredients.propTypes = {
    data: PropTypes.arrayOf(IngredientItemType).isRequired
}

export { BurgerIngredients };

