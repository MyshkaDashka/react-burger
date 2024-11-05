import PropTypes from "prop-types";
import { BurgerIngredientItem } from "../burger-ingredient-item/burger-ingredient-item";
import { IngredientItemType } from "./../../../utils/types";
import { Link, useLocation } from "react-router-dom";
import styles from "./burger-ingredient-collection.module.css";

function BurgerIngredientCollection({ name, data }) {
    let location = useLocation();

    return (
        <>
            <p className={`${styles.title} text text_type_main-medium pt-10`}>
                {name}
            </p>
            <div className={styles.list}>
                {
                    data.map((item) => (
                        <Link
                            key={item._id}
                            to={`/ingredients/${item._id}`}
                            state={{ backgroundLocation: location }}
                            className={styles.link}
                        >
                            <BurgerIngredientItem key={item._id} item={item} />
                        </Link>
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