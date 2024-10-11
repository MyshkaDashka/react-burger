import { useMemo, useState } from "react";
import { Button, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Modal } from "../../modal/modal";
import { OrderDetails } from "../../order-details/order-details";
import styles from "./burger-constructor-total.module.css"
import { useDispatch, useSelector } from "react-redux";
import { resetOrder, sendOrderData } from "../../../services/actions/order";

function BurgerConstructorTotal() {
    const [showOrderDetails, setShowOrderDetails] = useState(false);
    const { bun, burgerIngredients } = useSelector(store => store.burgerConstructor);
    const dispatch = useDispatch();

    const totalPrice = useMemo(
        () => {
            let totalPrice = burgerIngredients.reduce((accumulator, current) => accumulator + current.price, 0);
            if (bun) {
                totalPrice += bun.price * 2;
            }
            return totalPrice;
        },
        [bun, burgerIngredients]
    );

    const getIdsFromConstructor = useMemo(
        () => {
            return bun ?
                [bun._id, ...burgerIngredients.map(item => item._id), bun._id]
                :
                burgerIngredients.map(item => item._id)
        },
        [bun, burgerIngredients]
    );

    const sendOrder = () => {
        dispatch(sendOrderData(getIdsFromConstructor));
        setShowOrderDetails(true);
    }

    const closeOrderDetails = () => {
        dispatch(resetOrder());
        setShowOrderDetails(false);
    }

    const isOrderButtonDisabled = () => {
        return bun ? false : true;
    }

    return (
        <>
            {showOrderDetails &&
                <Modal title="" onClose={() => closeOrderDetails()}>
                    <OrderDetails />
                </Modal>
            }
            <div className={`${styles.inline} pr-15`}>
                <p className="text text_type_digits-medium pr-2">{totalPrice}</p>
                <CurrencyIcon />
                <div className="pl-10">
                    <Button htmlType="button" type="primary" size="large" onClick={() => sendOrder()} disabled={isOrderButtonDisabled()}>
                        Оформить заказ
                    </Button>
                </div>
            </div>
        </>
    )
}
export { BurgerConstructorTotal };