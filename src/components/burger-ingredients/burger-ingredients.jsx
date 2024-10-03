import { useState } from "react";
import PropTypes from "prop-types";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { BurgerIngredientCollection } from "./burger-ingredient-collection/burger-ingredient-collection";
import { IngredientItemType } from "./../../utils/types";
import ingridientStyles from "./burger-ingredients.module.css";

function BurgerIngredients({ data }) {
    const [current, setCurrent] = useState('bun');

    const filterBurgersIngredients = (type) => {
        return data.filter(e => e.type === type)
    }

    return (
        <>
            <div className="pt-10 pb-5">
                <p className={`${ingridientStyles.title} text text_type_main-large`}>
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
                <div className={ingridientStyles.container}>
                    <BurgerIngredientCollection name="Булки" data={filterBurgersIngredients("bun")} />
                    <BurgerIngredientCollection name="Coycы" data={filterBurgersIngredients("sauce")} />
                    <BurgerIngredientCollection name="Начинки" data={filterBurgersIngredients("main")} />
                </div>
            }


        </>
    )
}

BurgerIngredients.propTypes = {
    data: PropTypes.arrayOf(IngredientItemType).isRequired
}

export { BurgerIngredients };

