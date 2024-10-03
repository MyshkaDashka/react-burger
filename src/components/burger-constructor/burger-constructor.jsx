import PropTypes from "prop-types";
import { BurgerConstructorTotal } from "./burger-constructor-total.jsx/burger-constructor-total";
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { IngredientItemType } from "./../../utils/types";
import constructorStyles from "./burger-constructor.module.css";

function BurgerConstructor({ data }) {

    const bunElement = data.filter(e => e.type === "bun")[0];

    const getSelectedIngredients = () => {
        return data.filter(elem => elem.type != "bun");
    }

    return (
        <>
            {!!data?.length &&
                <div className={`${constructorStyles.items} pt-25`}>
                    <div className="pr-4">
                        <ConstructorElement
                            type="top"
                            isLocked={true}
                            text={bunElement.name + "(верх)"}
                            price={bunElement.price}
                            thumbnail={bunElement.image}
                        />
                    </div>
                    <div className={`${constructorStyles.items} ${constructorStyles.list}`}>
                        {getSelectedIngredients().map((item) => (
                            <ListItem key={item._id} item={item} />
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

const ListItem = ({ item }) => (
    <div className={constructorStyles.dragItem}>
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

BurgerConstructor.propTypes = {
    data: PropTypes.arrayOf(IngredientItemType).isRequired
}

ListItem.propTypes = {
    item: IngredientItemType.isRequired,
}

export { BurgerConstructor };

