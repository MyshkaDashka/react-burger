import React from 'react';
import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink } from 'react-router-dom';
import styles from "./app-header.module.css";
import { useSelector } from '../../services/store';

function AppHeader(): React.JSX.Element {
    const user = useSelector(store => store.user.user);
    return (
        <header className={`${styles.header} p-4`}>
            <nav className={styles.block}>
                <NavLink to="/">
                    {({ isActive }) =>
                        <div className={`${styles.item} p-5 ${isActive ? styles.active : "text_color_inactive"}`}>
                            <BurgerIcon className='pr-2' type={isActive ? "primary" : "secondary"} />
                            Конструктор
                        </div>
                    }
                </NavLink>
                <NavLink to="/feed">
                    {({ isActive }) =>
                        <div className={`${styles.item} p-5 ${isActive ? styles.active : "text_color_inactive"}`}>
                            <ListIcon className='pr-2' type={isActive ? "primary" : "secondary"} />
                            Лента заказов
                        </div>
                    }
                </NavLink>
            </nav>
            <div className={styles.logo}>
                <Logo />
            </div>
            <nav className={`${styles.profile}`}>
                <NavLink to="/profile" >
                    {({ isActive }) =>
                        <div className={`${styles.item} p-5 ${isActive ? styles.active : "text_color_inactive"}`}>
                            <ProfileIcon className='pr-2' type={isActive ? "primary" : "secondary"} />
                            {user ? user.name : "Личный кабинет"}
                        </div>
                    }
                </NavLink>
            </nav>
        </header>
    )
}

export { AppHeader };