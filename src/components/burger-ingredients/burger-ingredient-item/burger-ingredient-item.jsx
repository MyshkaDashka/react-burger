import PropTypes from "prop-types";
import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { IngredientItemType } from "../../../utils/types";
import styles from "./burger-ingredient-item.module.css";

const BurgerConstructorIngredientItem = ({ item, onClick }) => (
    <div className={styles.item} onClick={onClick}>
        <Counter count={1} size="default" extraClass="m-1" />
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
);

BurgerConstructorIngredientItem.propTypes = {
    item: IngredientItemType.isRequired,
    onClick: PropTypes.func
}

export { BurgerConstructorIngredientItem };