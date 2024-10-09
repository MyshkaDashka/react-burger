import PropTypes from "prop-types";
import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { IngredientItemType } from "../../../utils/types";
import styles from "./burger-ingredient-item.module.css";
import { useSelector } from "react-redux";
import { useMemo } from "react";

const BurgerConstructorIngredientItem = ({ item, onClick }) => {

    const { bun, burgerIngredients } = useSelector(store => store.burgerConstructor);

    const count = useMemo(
        () => {
            if (item.type === "bun") {
                return bun?._id === item._id ? 2 : 0;
            } else {
                return burgerIngredients.filter(elem => elem._id === item._id).length;
            }
        },
        [bun, burgerIngredients]
    );

    return (
        <div className={styles.item} onClick={onClick}>
            {count > 0 && <Counter count={count} size="default" extraClass="m-1" />}
            <div className="p-4">
                <img src={item.image} alt={item.name} />
            </div>
            <div className={styles.price}>
                <p className="text text_type_main-small p-1">
                    {item.price}
                </p>
                <CurrencyIcon />
            </div>
            <p className="text text_type_main-small">
                {item.name}
            </p>
        </div>
    )
};

BurgerConstructorIngredientItem.propTypes = {
    item: IngredientItemType.isRequired,
    onClick: PropTypes.func
}

export { BurgerConstructorIngredientItem };