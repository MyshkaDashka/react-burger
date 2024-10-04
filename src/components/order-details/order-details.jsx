import { CheckMarkIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./order-details.module.css";

function OrderDetails() {
    return (
        <div className={`${styles.container} pt-5 pb-20`}>
            <p className="text text_type_digits-large">123456</p>
            <div className="pt-8">
                <p className="text text_type_main-medium">идентификатор заказа</p>
            </div>
            <CheckMarkIcon className="pt-15 pb-15" />
            <p className="text text_type_main-small">Ваш заказ начали готовить</p>
            <p className="text text_type_main-default text_color_inactive">Дождитесь готовности на орбитральной станции</p>
        </div>
    )
}
export { OrderDetails };