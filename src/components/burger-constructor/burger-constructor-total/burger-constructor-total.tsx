import { useMemo, useState } from "react";
import { Button, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Modal } from "../../modal/modal";
import { OrderDetails } from "../../order-details/order-details";
import styles from "./burger-constructor-total.module.css"
import { useDispatch, useSelector } from "react-redux";
//@ts-ignore
import { resetOrder, sendOrderData } from "../../../services/actions/order";
import { useNavigate } from "react-router-dom";
import { TIngredientItem } from "../../../utils/types";

function BurgerConstructorTotal(): React.JSX.Element {
    let [showOrderDetails, setShowOrderDetails] = useState(false);
    //@ts-ignore
    const { bun, burgerIngredients } = useSelector(store => store.burgerConstructor);
    //@ts-ignore
    const user = useSelector(store => store.user.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const totalPrice = useMemo(
        () => {
            let totalPrice = burgerIngredients.reduce((accumulator: number, current: TIngredientItem) => accumulator + current.price, 0);
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
                [bun._id, ...burgerIngredients.map((item: TIngredientItem) => item._id), bun._id]
                :
                burgerIngredients.map((item: TIngredientItem) => item._id)
        },
        [bun, burgerIngredients]
    );

    const sendOrder = () => {
        if (user) {
            dispatch(sendOrderData(getIdsFromConstructor));
            setShowOrderDetails(true);
        } else {
            navigate("/login");
        }
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
                <CurrencyIcon type="primary" />
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