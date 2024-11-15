import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { BurgerIngredients } from '../../components/burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '../../components/burger-constructor/burger-constructor';
import styles from "./home.module.css"

function HomePage(): React.JSX.Element {
    return (
        <main className={styles.container}>
            <DndProvider backend={HTML5Backend}>
                <section className={`${styles.columnsection} pr-10`}>
                    <BurgerIngredients />
                </section>
                <section className={styles.columnsection}>
                    <BurgerConstructor />
                </section>
            </DndProvider>
        </main>
    )
}

export { HomePage };
