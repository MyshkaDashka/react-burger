import PropTypes from "prop-types";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { BurgerConstructorTotal } from "./burger-constructor-total/burger-constructor-total";
import { BurgerConstructorIngredient } from "./burger-constructor-ingredient/burger-constructor-ingredient";
import { IngredientItemType } from "./../../utils/types";
import styles from "./burger-constructor.module.css";
import { useDispatch, useSelector } from "react-redux";

function BurgerConstructor() {
    const data = useSelector(store => store.burgerConstructor);
    const dispatch = useDispatch();

    return (
        <>
            {data &&
                <div className={`${styles.items} pt-25`}>
                    {data.bun ?
                        <div className="pr-4">
                            <ConstructorElement
                                type="top"
                                isLocked={true}
                                text={data.bun.name + "(верх)"}
                                price={data.bun.price}
                                thumbnail={data.bun.image}
                            />
                        </div>
                        :
                        <div className={styles.emptybuntop}>
                            <p>Выберите булки</p>
                        </div>
                    }
                    <div className={`${styles.items} ${styles.list}`}>
                        {data.burgerIngredients?.length > 0 ?
                            data.burgerIngredients.map((item) => (
                                <BurgerConstructorIngredient key={item.key} item={item} />
                            ))
                            :
                            <div className={styles.emptyitem}>
                                <p>Выберите начинку</p>
                            </div>
                        }
                    </div>
                    {data.bun ?
                        <div className="pr-4">
                            <ConstructorElement
                                type="bottom"
                                isLocked={true}
                                text={data.bun.name + "(низ)"}
                                price={data.bun.price}
                                thumbnail={data.bun.image}
                            />
                        </div>
                        :
                        <div className={styles.emptybunbottom}>
                            <p>Выберите булки</p>
                        </div>
                    }
                </div>
            }
            <div className="pt-10">
                <BurgerConstructorTotal />
            </div>
        </>
    )
}

BurgerConstructor.propTypes = {
    data: PropTypes.arrayOf(IngredientItemType).isRequired
}

export { BurgerConstructor };

