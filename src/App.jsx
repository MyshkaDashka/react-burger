import { useEffect } from 'react'
import './App.css'
import { AppHeader } from './components/app-header/app-header';
import { BurgerIngredients } from './components/burger-ingredients/burger-ingredients';
import { BurgerConstructor } from './components/burger-constructor/burger-constructor';
import { useDispatch, useSelector } from 'react-redux';
import { getIngredientsData } from './services/actions/ingredients';

function App() {
  const dispatch = useDispatch();
  const { ingredientsRequest, ingredientsError, ingredients } = useSelector(state => state.ingredients);

  useEffect(() => {
    dispatch(getIngredientsData());
  }, []);

  return (
    <>
      <AppHeader />
      <main className='container'>
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
            <section className='columnsection pr-10'>
              <BurgerIngredients data={ingredients} />
            </section>
            <section className='columnsection'>
              <BurgerConstructor data={ingredients} />
            </section>
          </>
        ) : (
          <p>Нет результатов</p>
        )}
      </main>
    </>
  )
}

export default App
