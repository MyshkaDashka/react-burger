import PropTypes from "prop-types";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { BurgerConstructorTotal } from "./burger-constructor-total/burger-constructor-total";
import { BurgerConstructorIngredient } from "./burger-constructor-ingredient/burger-constructor-ingredient";
import { IngredientItemType } from "./../../utils/types";
import styles from "./burger-constructor.module.css";

function BurgerConstructor({ data }) {

    const bunElement = data.filter(e => e.type === "bun")[0];

    const getSelectedIngredients = () => {
        return data.filter(elem => elem.type != "bun");
    }

    return (
        <>
            {!!data?.length &&
                <div className={`${styles.items} pt-25`}>
                    <div className="pr-4">
                        <ConstructorElement
                            type="top"
                            isLocked={true}
                            text={bunElement.name + "(верх)"}
                            price={bunElement.price}
                            thumbnail={bunElement.image}
                        />
                    </div>
                    <div className={`${styles.items} ${styles.list}`}>
                        {getSelectedIngredients().map((item) => (
                            <BurgerConstructorIngredient key={item._id} item={item} />
                        ))}
                    </div>
                    <div className="pr-4 pb-10">
                        <ConstructorElement
                            type="bottom"
                            isLocked={true}
                            text={bunElement.name + "(низ)"}
                            price={bunElement.price}
                            thumbnail={bunElement.image}
                        />
                    </div>
                    <BurgerConstructorTotal />
                </div>
            }
        </>
    )
}

BurgerConstructor.propTypes = {
    data: PropTypes.arrayOf(IngredientItemType).isRequired
}

export { BurgerConstructor };

