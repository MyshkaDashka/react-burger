import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import { IOrderFeedItem, TIngredientItem } from "../../utils/types";
import styles from "./order-feed-item.module.css";
import { useSelector } from "../../services/store";
import { useMemo } from "react";

type TOrderFeedItemProps = {
    order: IOrderFeedItem
}

function OrderFeedItem({ order }: TOrderFeedItemProps): React.JSX.Element {
    const { ingredientsMap } = useSelector(state => state.ingredients);
    const user = useSelector(store => store.user.user);

    const orderIngredients = useMemo(
        () => {
            return order?.ingredients.map((i) => ingredientsMap[i]).filter(elem => !!elem);
        },
        [order]
    );

    const totalPrice = useMemo(
        () => {
            let totalPrice = orderIngredients?.reduce((accumulator: number, current: TIngredientItem) => accumulator + current.price, 0);
            return totalPrice;
        },
        [orderIngredients]
    );

    const uniqueOrderIngredients = [...new Set(orderIngredients)];

    return (
        <div className="pt-5 pr-2">
            <div className={`${styles.container} p-5`}>
                <div className={styles.inlinetitle}>
                    <p className="text text_type_digits-default">
                        #{order?.number}
                    </p>
                    <p className="text text_type_main-default text_color_inactive">
                        <FormattedDate date={new Date(order?.updatedAt ? order?.updatedAt : order?.createdAt)} />
                    </p>
                </div>
                <p className={`${styles.inlinename} text text_type_main-medium pt-6`}>
                    {order?.name.substring(0, 30)}
                </p>
                {user && order?.status === "done" &&
                    <p className={`${styles.greencolortext} ${styles.inlinename} text text_type_main-smal`}>
                        Выполнен
                    </p>
                }
                {user && order?.status === "pending" &&
                    <p className={`${styles.inlinename} text text_type_main-smal`}>
                        Готовится
                    </p>
                }
                {user && order?.status === "created" &&
                    <p className={`${styles.inlinename} text text_type_main-smal`}>
                        Создан
                    </p>
                }
                <div className={`${styles.inlinetitle} pt-6`}>
                    <div className={styles.images}>
                        {
                            uniqueOrderIngredients.slice(0, 6).map((item, i) => (
                                <div key={i} className={styles.imageWrapper} style={{ left: -i * 15, zIndex: 100 - i }}>
                                    <img src={item.image} alt={item.name} key={item._id} className={styles.image} />
                                    {i == 5 && i !== uniqueOrderIngredients.length - 1 &&
                                        <p className={`${styles.count} text text_type_digits-default`}>{'+' + (uniqueOrderIngredients.length - 6)}</p>}
                                </div>
                            ))
                        }
                    </div>
                    <div className={styles.inlinename}>
                        <p className="text text_type_digits-default pr-2">{totalPrice}</p>
                        <CurrencyIcon type="primary" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export { OrderFeedItem };
