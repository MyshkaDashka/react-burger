
import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import headerStyles from "./app-header.module.css"

function AppHeader() {
    return (
        <header className={`${headerStyles.header} p-4`}>
            <nav className={headerStyles.block}>
                <div className={`${headerStyles.item} p-5`}>
                    <BurgerIcon className='pr-2' />
                    <p className="text text_type_main-default ">
                        Конструктор
                    </p>
                </div>
                <div className={`${headerStyles.item} text_color_inactive p-5`}>
                    <ListIcon className='pr-2' type='disabled' />
                    <p className="text text_type_main-default">
                        Лента заказов
                    </p>
                </div>
            </nav>
            <div className={headerStyles.logo}>
                <Logo />
            </div>
            <nav className={` ${headerStyles.profile} text_color_inactive p-5`}>
                <ProfileIcon className='pr-2' type='disabled' />
                <p className="text text_type_main-default">
                    Личный кабинет
                </p>
            </nav>
        </header>
    )
}

export { AppHeader };