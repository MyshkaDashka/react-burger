import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { IngredientItemType } from "../../../utils/types";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import { useDrag } from "react-dnd";
import styles from "./burger-ingredient-item.module.css";

const BurgerIngredientItem = ({ item }) => {
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

    const [{ isDragging }, drag] = useDrag(() => ({
        type: "ingredient",
        item: item,
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }));

    return (
        <div className={`${styles.item} ${isDragging && styles.ondrag}`} ref={drag}>
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

BurgerIngredientItem.propTypes = {
    item: IngredientItemType.isRequired,
}

export { BurgerIngredientItem };