
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor-ingredient.module.css";
import { IngredientItemType } from "../../../utils/types";

const BurgerConstructorIngredient = ({ item }) => (
    <div className={styles.dragItem}>
        <div className="pr-2">
            <DragIcon />
        </div>
        <ConstructorElement
            text={item.name}
            price={item.price}
            thumbnail={item.image}
        />
    </div>
);

BurgerConstructorIngredient.propTypes = {
    item: IngredientItemType.isRequired,
}

export { BurgerConstructorIngredient };