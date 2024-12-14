import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { BurgerConstructorTotal } from "./burger-constructor-total/burger-constructor-total";
import { BurgerConstructorIngredient } from "./burger-constructor-ingredient/burger-constructor-ingredient";
import { useDrop } from "react-dnd";
import { addConstructorBun, addConstructorIngredient } from "../../services/actions/burger-constructor";
import styles from "./burger-constructor.module.css";
import { TIngredientItem } from "../../utils/types";
import { useDispatch, useSelector } from "../../services/store";

type TDropCollectedProps = {
    canDropBun: boolean;
    canDropIngr: boolean;
}

function BurgerConstructor(): React.JSX.Element {
    const data = useSelector(store => store.burgerConstructor);
    const dispatch = useDispatch();

    const [{ canDropBun, canDropIngr }, drop] = useDrop<TIngredientItem, unknown, TDropCollectedProps>(() => ({
        accept: "ingredient",
        drop(item) {
            item.type === 'bun' ?
                dispatch(addConstructorBun(item)) :
                dispatch(addConstructorIngredient(item));
        },
        collect: (monitor) => ({
            canDropIngr: monitor.getItem()?.type !== "bun" && monitor.canDrop(),
            canDropBun: monitor.getItem()?.type === "bun" && monitor.canDrop(),
        }),
    }))

    return (
        <>
            {data &&
                <div className={`${styles.items} pt-25`} ref={drop} data-test="constructorContainer">
                    {data.bun ?
                        <div className="pr-4" data-test="constructorBunTop">
                            <ConstructorElement
                                type="top"
                                isLocked={true}
                                text={data.bun.name + "(верх)"}
                                price={data.bun.price}
                                thumbnail={data.bun.image}
                            />
                        </div>
                        :
                        <div className={`${styles.emptybuntop} ${canDropBun && styles.candrop}`}>
                            <p>Выберите булки</p>
                        </div>
                    }
                    <div className={`${styles.items} ${styles.list}`} data-test="constructorItems">
                        {data.burgerIngredients?.length > 0 ?
                            data.burgerIngredients.map((item: TIngredientItem & { key: string }, index: number) => (
                                <BurgerConstructorIngredient key={item.key} item={item} index={index} id={item.key} />
                            ))
                            :
                            <div className={`${styles.emptyitem} ${canDropIngr && styles.candrop}`}>
                                <p>Выберите начинку</p>
                            </div>
                        }
                    </div>
                    {data.bun ?
                        <div className="pr-4" data-test="constructorBunBottom">
                            <ConstructorElement
                                type="bottom"
                                isLocked={true}
                                text={data.bun.name + "(низ)"}
                                price={data.bun.price}
                                thumbnail={data.bun.image}
                            />
                        </div>
                        :
                        <div className={`${styles.emptybunbottom} ${canDropBun && styles.candrop}`}>
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

export { BurgerConstructor };

