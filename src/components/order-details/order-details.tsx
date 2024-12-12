import { CheckMarkIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./order-details.module.css";
import { useSelector } from "../../services/store";

function OrderDetails(): React.JSX.Element {
    const { sendOrderRequest, sendOrderError, order } = useSelector(state => state.order);

    if (sendOrderRequest) {
        return <p className={`${styles.container} pt-5 pb-20 text text_type_main-default text_color_inactive`}>
            Выполняется запрос...
        </p>
    }

    if (sendOrderError && sendOrderError.length > 0) {
        return <p className={`${styles.container} pt-5 pb-20 text text_type_main-default text_color_inactive`}>
            Что-то пошло не так: {sendOrderError}
        </p>
    }

    return (
        <div className={`${styles.container} pt-5 pb-20`}>
            <p className="text text_type_digits-large" data-test="orderNumber">{order?.number}</p>
            <div className="pt-8">
                <p className="text text_type_main-medium">идентификатор заказа</p>
            </div>
            <CheckMarkIcon className="pt-15 pb-15" type="primary" />
            <p className="text text_type_main-small">Ваш заказ начали готовить</p>
            <p className="text text_type_main-default text_color_inactive">Дождитесь готовности на орбитральной станции</p>
        </div>
    )
}
export { OrderDetails };