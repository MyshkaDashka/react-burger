import PropTypes from "prop-types";
import { Modal } from "../../modal/modal";
import { BurgerConstructorIngredientItem } from "../burger-ingredient-item/burger-ingredient-item";
import { IngredientDetails } from "../../ingredient-details/ingredient-details";
import { IngredientItemType } from "./../../../utils/types";
import styles from "./burger-ingredient-collection.module.css";
import { useDispatch, useSelector } from "react-redux";
import { resetIngredientDetails, setIngredientDetails } from "../../../services/actions/ingredient-details";

function BurgerIngredientCollection({ name, data }) {
    const dispatch = useDispatch();
    const selectedIngredient = useSelector(state => state.ingredientDetails.selectedIngredient);

    return (
        <>
            {selectedIngredient &&
                <Modal title="Детали ингредиента" onClose={() => dispatch(resetIngredientDetails())}>
                    <IngredientDetails item={selectedIngredient}></IngredientDetails>
                </Modal>
            }
            <p className={`${styles.title} text text_type_main-medium pt-10`}>
                {name}
            </p>
            <div className={styles.list}>
                {
                    data.map((item) => (
                        <BurgerConstructorIngredientItem key={item._id} item={item} onClick={() => dispatch(setIngredientDetails(item))} />
                    ))
                }
            </div>
        </>
    )
}

BurgerIngredientCollection.propTypes = {
    name: PropTypes.string,
    data: PropTypes.arrayOf(IngredientItemType).isRequired
}

export { BurgerIngredientCollection };