import { BurgerIngredientItem } from "../burger-ingredient-item/burger-ingredient-item";
import { TIngredientItem } from "../../../utils/types";
import { Link, useLocation } from "react-router-dom";
import styles from "./burger-ingredient-collection.module.css";

type TBurgerIngredientCollectionProps = {
    name: string;
    data: Array<TIngredientItem>;
}

function BurgerIngredientCollection({ name, data }: TBurgerIngredientCollectionProps): React.JSX.Element {
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

export { BurgerIngredientCollection };