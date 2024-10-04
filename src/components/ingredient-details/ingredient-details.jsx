import { IngredientItemType } from "./../../utils/types";
import styles from "./ingredient-details.module.css";

function IngredientDetails({ item }) {
    return (
        <div className={styles.container}>
            <img src={item.image_large} alt={item.image_large} />
            <p className="text text_type_main-medium pt-4 pb-8">
                {item.name}
            </p>
            <div className={`${styles.section} pb-15`}>
                <div className={styles.composition}>
                    <p className="text text_type_main-default text_color_inactive">Калории, ккал</p>
                    <p className="text text_type_digits-medium text_color_inactive">{item.proteins}</p>
                </div>

                <div className={styles.composition}>
                    <p className="text text_type_main-default text_color_inactive">Белки, г</p>
                    <p className="text text_type_digits-medium text_color_inactive">{item.fat}</p>
                </div>
                <div className={styles.composition}>
                    <p className="text text_type_main-default text_color_inactive">Жиры, г</p>
                    <p className="text text_type_digits-medium text_color_inactive">{item.carbohydrates}</p>
                </div>
                <div className={styles.composition}>
                    <p className="text text_type_main-default text_color_inactive">Углеводы, г</p>
                    <p className="text text_type_digits-medium text_color_inactive">{item.calories}</p>
                </div>
            </div>
        </div>
    )
}

IngredientDetails.propTypes = {
    item: IngredientItemType.isRequired
}

export { IngredientDetails };