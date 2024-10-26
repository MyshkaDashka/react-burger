import { Link } from 'react-router-dom';
import styles from "./not-found-404.module.css"

function NotFound404Page() {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <h1>Упс! 404 Ошибка</h1>
                <p>Страница не найдена</p>
                <br />
                <br />
                <Link to='/' className={styles.link}> Вернуться на главную</Link>
            </div>
        </div>
    )
}
export { NotFound404Page };