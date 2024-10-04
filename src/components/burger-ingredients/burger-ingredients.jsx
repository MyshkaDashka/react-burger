import { useCallback, useState, useMemo } from "react";
import PropTypes from "prop-types";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { BurgerIngredientCollection } from "./burger-ingredient-collection/burger-ingredient-collection";
import { IngredientItemType } from "./../../utils/types";
import styles from "./burger-ingredients.module.css";

function BurgerIngredients({ data }) {
    const [current, setCurrent] = useState('bun');

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

    return (
        <>
            <div className="pt-10 pb-5">
                <p className={`${styles.title} text text_type_main-large`}>
                    Соберите бургер
                </p>
            </div>
            <div style={{ display: 'flex' }}>
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
                <div className={styles.container}>
                    <BurgerIngredientCollection name="Булки" data={buns} />
                    <BurgerIngredientCollection name="Coycы" data={sauces} />
                    <BurgerIngredientCollection name="Начинки" data={mains} />
                </div>
            }


        </>
    )
}

BurgerIngredients.propTypes = {
    data: PropTypes.arrayOf(IngredientItemType).isRequired
}

export { BurgerIngredients };

