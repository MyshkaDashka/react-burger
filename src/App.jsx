import { useState, useEffect } from 'react'
import './App.css'
import { AppHeader } from './components/app-header/app-header';
import { BurgerIngredients } from './components/burger-ingredients/burger-ingredients';
import { BurgerConstructor } from './components/burger-constructor/burger-constructor';

const GET_BURGERS_INGREDIENTS_URL = `https://norma.nomoreparties.space/api/ingredients`;

function App() {

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    setError(null);
    const getBurgersIngredientsData = async () => {
      try {
        setLoading(true);
        const res = await fetch(GET_BURGERS_INGREDIENTS_URL);
        const data = await res.json();
        setResults(data.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };
    getBurgersIngredientsData();
  }, []);

  return (
    <>
      <AppHeader />
      <main className='container'>
        {loading ? (
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
