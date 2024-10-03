import { useState, useEffect } from 'react'
import './App.css'
import { AppHeader } from './components/app-header/app-header';
import { BurgerIngredients } from './components/burger-ingredients/burger-ingredients';
import { BurgerConstructor } from './components/burger-constructor/burger-constructor';
import {getIngredients} from './utils/burger-api';

function App() {

  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    setError(null);
    const getBurgersIngredientsData = async () => {
      try {
        const data = await getIngredients();
        setResults(data.data);
        setIsLoading(false);
      } catch (err) {
        setError(err);
        setIsLoading(false);
      }
    };
    getBurgersIngredientsData();
  }, []);

  return (
    <>
      <AppHeader />
      <main className='container'>
        {isLoading ? (
          <p className="text text_type_main-default text_color_inactive">
            Поиск...
          </p>
        ) : error ? (
          <p className="text text_type_main-default text_color_inactive">
            Что-то пошло не так: {error.message}
          </p>
        ) : !!results?.length ? (
          <>
            <section className='columnsection pr-10'>
              <BurgerIngredients data={results} />
            </section>
            <section className='columnsection'>
              <BurgerConstructor data={results} />
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
