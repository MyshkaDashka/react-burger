import { useEffect } from "react";
import { WebsocketStatus } from "../../utils/types";
import { useDispatch, useSelector } from "../../services/store";
import { Link, useLocation } from "react-router-dom";
import { wsConnect, wsDisconnect } from "../../services/actions/web-socket";
import styles from "./orders.module.css";
import { OrderFeedItem } from "../../components/order-feed-item/order-feed-item";
import { WSS_BASE_URL } from "../../utils/burger-api";

function OrdersPage(): React.JSX.Element {
    const dispatch = useDispatch();
    let location = useLocation();

    useEffect(() => {
        dispatch(wsConnect(WSS_BASE_URL + "?token=" + localStorage.getItem("accessToken")?.slice(7)));
        return () => {
            dispatch(wsDisconnect());
        };
    }, []);

    const { orders, status } = useSelector(state => state.orders);

    if (status === WebsocketStatus.CONNECTING) {
        return <p className="text text_type_main-default text_color_inactive">
            Поиск...
        </p>
    }

    return (
        <div className={styles.container}>
            <div className={`${styles.containerscroll}`}>
                {orders?.orders?.map((item) => (
                    <Link
                        key={item._id}
                        to={`/profile/orders/${item.number}`}
                        state={{ backgroundLocation: location }}
                        className={styles.link}
                    >
                        <OrderFeedItem order={item} key={item._id} />
                    </Link>
                )).reverse()}
            </div>
        </div>
    )
}
export { OrdersPage };