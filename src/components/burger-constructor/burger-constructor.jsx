import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { BurgerConstructorTotal } from "./burger-constructor-total/burger-constructor-total";
import { BurgerConstructorIngredient } from "./burger-constructor-ingredient/burger-constructor-ingredient";
import styles from "./burger-constructor.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useDrop } from "react-dnd";
import { addConstructorBun, addConstructorIngredient } from "../../services/actions/burger-constructor";

function BurgerConstructor() {
    const data = useSelector(store => store.burgerConstructor);
    const dispatch = useDispatch();

    const [{ canDropBun, canDropIngr }, drop] = useDrop(() => ({
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
                <div className={`${styles.items} pt-25`} ref={drop}>
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
                        <div className={`${styles.emptybuntop} ${canDropBun && styles.candrop}`}>
                            <p>Выберите булки</p>
                        </div>
                    }
                    <div className={`${styles.items} ${styles.list}`}>
                        {data.burgerIngredients?.length > 0 ?
                            data.burgerIngredients.map((item,index) => (
                                <BurgerConstructorIngredient key={item.key} item={item} index={index} id={item.key}/>
                            ))
                            :
                            <div className={`${styles.emptyitem} ${canDropIngr && styles.candrop}`}>
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

