import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppHeader } from '../app-header/app-header';
import { HomePage } from '../../pages/home/home';
import { NotFound404Page } from '../../pages/not-found-404/not-found-404';
import { getIngredientsData } from '../../services/actions/ingredients';
import styles from "./app.module.css"


function App() {
  const dispatch = useDispatch();
  const { ingredientsRequest, ingredientsError, ingredients } = useSelector(state => state.ingredients);

  useEffect(() => {
    dispatch(getIngredientsData());
  }, []);

  if (ingredientsRequest) {
    return <p className="text text_type_main-default text_color_inactive">
      Поиск...
    </p>
  }
  if (ingredientsError && ingredientsError.length > 0) {
    return <p className="text text_type_main-default text_color_inactive">
      Что-то пошло не так: {ingredientsError}
    </p>
  }
  if (!ingredientsRequest && ingredients.length === 0) {
    <p className="text text_type_main-default text_color_inactive">
      Нет результатов
    </p>
  }

  return (
    <div className={styles.page}>
      <AppHeader />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<NotFound404Page />} />
      </Routes>
    </div>
  )
}

export default App
