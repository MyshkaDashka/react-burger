import { NavLink, Outlet } from "react-router-dom";
import { logout } from "../../services/actions/auth";
import styles from "./profile.module.css";
import { useDispatch } from "../../services/store";

function ProfilePage(): React.JSX.Element {
    const dispatch = useDispatch();
    return (
        <div className={styles.container}>
            <div className={styles.menu}>
                <NavLink to="/profile" className="p-2 text text_type_main-medium text_color_inactive" end>
                    {({ isActive }) =>
                        <div className={isActive ? styles.active : "text_color_inactive"}>
                            Профиль
                        </div>
                    }
                </NavLink>
                <NavLink to="orders" className="p-2 text text_type_main-medium text_color_inactive">
                    {({ isActive }) =>
                        <div className={isActive ? styles.active : "text_color_inactive"}>
                            История заказов {isActive}
                        </div>
                    }
                </NavLink>
                <NavLink to="" onClick={() => dispatch(logout())}>
                    <p className={`p-2 text text_type_main-medium text_color_inactive`}>
                        Выход
                    </p>
                </NavLink>
                <div className={styles.infoText}>
                    <p className={`pt-20 text text_type_main-small text_color_inactive`}>
                        В этом разделе вы можете изменить свои персональные данные
                    </p>
                </div>
            </div>
            <Outlet />
        </div>
    )
}
export { ProfilePage };