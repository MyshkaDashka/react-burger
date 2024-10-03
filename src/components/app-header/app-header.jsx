
import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from "./app-header.module.css"

function AppHeader() {
    return (
        <header className={`${styles.header} p-4`}>
            <nav className={styles.block}>
                <div className={`${styles.item} p-5`}>
                    <BurgerIcon className='pr-2' />
                    <p className="text text_type_main-default ">
                        <a className={styles.links} href="">
                            Конструктор
                        </a>
                    </p>
                </div>
                <div className={`${styles.item} text_color_inactive p-5`}>
                    <ListIcon className='pr-2' type='disabled' />
                    <p className="text text_type_main-default">
                        <a className={styles.links} href="">
                            Лента заказов
                        </a>
                    </p>
                </div>
            </nav>
            <div className={styles.logo}>
                <Logo />
            </div>
            <nav className={`${styles.profile} text_color_inactive p-5`}>
                <ProfileIcon className='pr-2' type='disabled' />
                <p className="text text_type_main-default">
                    <a className={styles.links} href="">
                        Личный кабинет
                    </a>
                </p>
            </nav>
        </header>
    )
}

export { AppHeader };