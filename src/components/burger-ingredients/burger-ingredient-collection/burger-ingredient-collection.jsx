import { useState } from "react";
import PropTypes from "prop-types";
import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Modal } from "../../modal/modal";
import { IngredientDetails } from "../../ingredient-details/ingredient-details";
import { IngredientItemType } from "./../../../utils/types";
import biStyles from "./burger-ingredient-collection.module.css";

function BurgerIngredientCollection({ name, data }) {
    const [selectedIngredient, setSelectedIngredient] = useState(null);

    return (
        <>
            {selectedIngredient &&
                <Modal title="Детали ингредиента" onClose={() => setSelectedIngredient(null)}>
                    <IngredientDetails item={selectedIngredient}></IngredientDetails>
                </Modal>
            }

            <p className={`${biStyles.title} text text_type_main-medium pt-10`}>
                {name}
            </p>
            <div className={biStyles.list}>
                {
                    data.map((item) => (
                        <ListItem key={item._id} item={item} onClick={() => setSelectedIngredient(item)} />
                    ))
                }
            </div>
        </>
    )
}

const ListItem = ({ item, onClick }) => (
    <div className={biStyles.item} onClick={onClick}>
        <Counter count={1} size="default" extraClass="m-1" />
        <div className="p-4">
            <img src={item.image} alt={item.name} />
        </div>
        <div className={biStyles.price}>
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

BurgerIngredientCollection.propTypes = {
    name: PropTypes.string,
    data: PropTypes.arrayOf(IngredientItemType).isRequired
}

ListItem.propTypes = {
    item: IngredientItemType.isRequired,
    onClick: PropTypes.func
}

export { BurgerIngredientCollection };