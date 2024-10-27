import { useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppHeader } from '../app-header/app-header';
import { HomePage } from '../../pages/home/home';
import { NotFound404Page } from '../../pages/not-found-404/not-found-404';
import { getIngredientsData } from '../../services/actions/ingredients';
import { IngredientDetails } from '../ingredient-details/ingredient-details';
import { Modal } from '../modal/modal';
import styles from "./app.module.css"

function App() {
  const dispatch = useDispatch();
  const { ingredientsRequest, ingredientsError, ingredients } = useSelector(state => state.ingredients);
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state;

  useEffect(() => {
    dispatch(getIngredientsData());
  }, []);

  const onCloseModal = e => {
    e.stopPropagation();
    navigate("/");
  };

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
      {state?.backgroundLocation && (
        <Routes>
          <Route
            path="/ingredients/:id"
            element={
              <Modal title="Детали ингредиента" onClose={onCloseModal}>
                <IngredientDetails />
              </Modal>
            } />
        </Routes>
      )}
      <Routes location={state?.backgroundLocation || location}>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<NotFound404Page />} />
        <Route path="/ingredients/:id" element={<IngredientDetails />} />
      </Routes>
    </div>
  )
}

export default App
