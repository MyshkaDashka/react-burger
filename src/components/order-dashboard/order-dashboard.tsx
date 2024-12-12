import { useMemo } from "react";
import { useSelector } from "../../services/store";
import styles from "./order-dashboard.module.css";

function OrderDashboard(): React.JSX.Element {
    const { orders } = useSelector(state => state.orders);

    const doneNumbers = useMemo(
        () => {
            return orders.orders.filter(elem => elem.status === "done").slice(0, 10);
        },
        [orders]
    );

    const pendingNumbers = useMemo(
        () => {
            return orders.orders.filter(elem => elem.status !== "done" ).slice(0, 10);
        },
        [orders]
    );

    return (
        <div className={`${styles.column} pl-15 pt-10`}>
            <div className={styles.countsection}>
                <div className={styles.columnsection}>
                    <p className="text text_type_main-medium pb-6">Готовы:</p>
                    <div className={styles.countsection}>
                        <div className={styles.columnsection}>
                            {doneNumbers.slice(0, 5).map((item) => (
                                <p className={`${styles.greencolortext} text text_type_digits-default pb-2`} key={item._id}>{item.number}</p>
                            ))}
                        </div>
                        <div className={styles.columnsection}>
                            {doneNumbers.slice(5, 10).map((item) => (
                                <p className={`${styles.greencolortext} text text_type_digits-default pb-2`} key={item._id}>{item.number}</p>
                            ))}
                        </div>
                    </div>
                </div>
                <div className={styles.columnsection}>
                    <p className="text text_type_main-medium pb-6">В работе:</p>
                    <div className={styles.countsection}>
                        <div className={styles.columnsection}>
                            {pendingNumbers.slice(0, 5).map((item) => (
                                <p className="text text_type_digits-default pb-2" key={item._id}>{item.number}</p>
                            ))}
                        </div>
                        <div className={styles.columnsection}>
                            {pendingNumbers.slice(5, 10).map((item) => (
                                <p className="text text_type_digits-default pb-2" key={item._id}>{item.number}</p>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <p className="text text_type_main-medium pt-15">Выполнено за все время:</p>
            <p className="text text_type_digits-large">{orders.total}</p>
            <p className="text text_type_main-medium pt-15">Выполнено за сегодня:</p>
            <p className="text text_type_digits-large">{orders.totalToday}</p>
        </div>
    )
}
export { OrderDashboard };