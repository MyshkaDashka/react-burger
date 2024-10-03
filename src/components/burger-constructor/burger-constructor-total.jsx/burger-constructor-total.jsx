import { useState } from "react";
import { Button, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Modal } from "../../modal/modal";
import { OrderDetails } from "../../order-details/order-details";
import totalStyles from "./burger-constructor-total.module.css"

function BurgerConstructorTotal() {
    const [showOrderDetails, setShowOrderDetails] = useState(false);
    return (
        <>
            {showOrderDetails &&
                <Modal title="" onClose={() => setShowOrderDetails(false)}>
                    <OrderDetails />
                </Modal>
            }
            <div className={`${totalStyles.inline} pr-15`}>
                <p className="text text_type_digits-medium pr-2">610</p>
                <CurrencyIcon />
                <div className="pl-10">
                    <Button htmlType="button" type="primary" size="large" onClick={() => setShowOrderDetails(true)}>
                        Оформить заказ
                    </Button>
                </div>
            </div>
        </>
    )
}
export { BurgerConstructorTotal };