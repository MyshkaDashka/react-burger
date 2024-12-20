import { useParams } from "react-router-dom";
import styles from "./ingredient-details.module.css";
import { TIngredientItem } from "../../utils/types";
import { useSelector } from "../../services/store";

function IngredientDetails(): React.JSX.Element {
    const { id } = useParams();
    const { ingredients } = useSelector(state => state.ingredients);
    const selectedIngredient = ingredients.find((item: TIngredientItem) => item._id === id);

    if (!selectedIngredient) {
        return <p className="text text_type_main-default text_color_inactive">Ингредиент не найден</p>
    }

    return (
        <div className={styles.container}>
            <img src={selectedIngredient?.image_large} alt={selectedIngredient?.image_large} />
            <p className="text text_type_main-medium pt-4 pb-8">
                {selectedIngredient?.name}
            </p>
            <div className={`${styles.section} pb-15`}>
                <div className={styles.composition}>
                    <p className="text text_type_main-default text_color_inactive">Калории, ккал</p>
                    <p className="text text_type_digits-medium text_color_inactive">{selectedIngredient?.calories}</p>
                </div>

                <div className={styles.composition}>
                    <p className="text text_type_main-default text_color_inactive">Белки, г</p>
                    <p className="text text_type_digits-medium text_color_inactive">{selectedIngredient?.proteins}</p>
                </div>
                <div className={styles.composition}>
                    <p className="text text_type_main-default text_color_inactive">Жиры, г</p>
                    <p className="text text_type_digits-medium text_color_inactive">{selectedIngredient?.fat}</p>
                </div>
                <div className={styles.composition}>
                    <p className="text text_type_main-default text_color_inactive">Углеводы, г</p>
                    <p className="text text_type_digits-medium text_color_inactive">{selectedIngredient?.carbohydrates}</p>
                </div>
            </div>
        </div>
    )
}

export { IngredientDetails };