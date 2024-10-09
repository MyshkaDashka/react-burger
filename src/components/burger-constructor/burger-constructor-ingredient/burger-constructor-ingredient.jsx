
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor-ingredient.module.css";
import { IngredientItemType } from "../../../utils/types";
import { useDispatch } from "react-redux";
import { deleteConstructorIngredient } from "../../../services/actions/burger-constructor";

const BurgerConstructorIngredient = ({ item }) => {
    const dispatch = useDispatch();

    const deleteFromConstructor = () => {
        return dispatch(deleteConstructorIngredient(item.key));
    }

    return (
        <div className={styles.dragItem}>
            <div className="pr-2">
                <DragIcon />
            </div>
            <ConstructorElement
                text={item.name}
                price={item.price}
                thumbnail={item.image}
                handleClose={() => deleteFromConstructor()}
            />
        </div>
    )
};

BurgerConstructorIngredient.propTypes = {
    item: IngredientItemType.isRequired,
}

export { BurgerConstructorIngredient };