import { useEffect } from 'react'
import { AppHeader } from '../app-header/app-header';
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '../burger-constructor/burger-constructor';
import { useDispatch, useSelector } from 'react-redux';
import { getIngredientsData } from '../../services/actions/ingredients';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import styles from "./app.module.css"

function App() {
  const dispatch = useDispatch();
  const { ingredientsRequest, ingredientsError, ingredients } = useSelector(state => state.ingredients);

  useEffect(() => {
    dispatch(getIngredientsData());
  }, []);

  return (
    <div className={styles.page}>
      <AppHeader />
      <main className={styles.container}>
        <DndProvider backend={HTML5Backend}>
          {ingredientsRequest ? (
            <p className="text text_type_main-default text_color_inactive">
              Поиск...
            </p>
          ) : ingredientsError && ingredientsError.length > 0 ? (
            <p className="text text_type_main-default text_color_inactive">
              Что-то пошло не так: {ingredientsError}
            </p>
          ) : !!ingredients?.length ? (
            <>
              <section className={`${styles.columnsection} pr-10`}>
                <BurgerIngredients />
              </section>
              <section className={styles.columnsection}>
                <BurgerConstructor />
              </section>
            </>
          ) : (
            <p>Нет результатов</p>
          )}
        </DndProvider>
      </main>
    </div>
  )
}

export default App
