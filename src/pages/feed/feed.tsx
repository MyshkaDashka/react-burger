import { useEffect } from "react";
import styles from "./feed.module.css"
import { OrderFeedItem } from "../../components/order-feed-item/order-feed-item";
import { useDispatch, useSelector } from "../../services/store";
import { wsConnect, wsDisconnect } from "../../services/actions/web-socket";
import { WebsocketStatus } from "../../utils/types";
import { OrderDashboard } from "../../components/order-dashboard/order-dashboard";
import { Link, useLocation } from "react-router-dom";
import { WSS_BASE_URL } from "../../utils/burger-api";

function FeedPage(): React.JSX.Element {
    const dispatch = useDispatch();
    const { orders, status } = useSelector(state => state.orders);
    let location = useLocation();

    useEffect(() => {
        dispatch(wsConnect(WSS_BASE_URL + "/all"));
        return () => {
            dispatch(wsDisconnect());
        };
    }, []);

    if (status === WebsocketStatus.CONNECTING) {
        return <p className="text text_type_main-default text_color_inactive">
            Поиск...
        </p>
    }

    return (
        <div className={styles.container}>
            <div className={styles.columnsection}>
                <p className="text text_type_main-large">
                    Лента заказов
                </p>
                <div className={`${styles.containerscroll}`}>
                    {orders.orders.map((item) => (
                        <Link
                            key={item._id}
                            to={`/feed/${item.number}`}
                            state={{ backgroundLocation: location }}
                            className={styles.link}
                        >
                            <OrderFeedItem order={item} key={item._id} />
                        </Link>
                    ))}
                </div>
            </div>
            <div className={styles.columnsection}>
                <OrderDashboard />
            </div>
        </div>
    )
}

export { FeedPage };