import React, { useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { AppHeader } from '../app-header/app-header';
import { HomePage } from '../../pages/home/home';
import { NotFound404Page } from '../../pages/not-found-404/not-found-404';
import { getIngredientsData } from '../../services/actions/ingredients';
import { IngredientDetails } from '../ingredient-details/ingredient-details';
import { Modal } from '../modal/modal';
import { LoginPage } from '../../pages/login/login';
import { RegisterPage } from '../../pages/register/register';
import { ForgotPasswordPage } from '../../pages/forgot-password/forgot-password';
import { ResetPasswordPage } from '../../pages/reset-password/reset-password';
import { checkUserAuth } from '../../services/actions/auth';
import { OnlyAuth, OnlyUnAuth } from '../protected-route/protected-route';
import { ProfilePage } from '../../pages/profile/profile';
import { OrdersPage } from '../../pages/orders/orders';
import { ProfileDetailsPage } from '../../pages/profile/profile-details/profile-details';
import { useDispatch, useSelector } from '../../services/store';
import styles from "./app.module.css";

function App(): React.JSX.Element {
  const dispatch = useDispatch();
  const { ingredientsRequest, ingredientsError, ingredients } = useSelector(state => state.ingredients);
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state;

  useEffect(() => {
    dispatch(getIngredientsData());
  }, []);

  useEffect(() => {
    dispatch(checkUserAuth());
  }, []);

  const onCloseModal = () => {
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

        <Route path="/login" element={<OnlyUnAuth component={<LoginPage />} />} />
        <Route path="/register" element={<OnlyUnAuth component={<RegisterPage />} />} />
        <Route path="/forgot-password" element={<OnlyUnAuth component={<ForgotPasswordPage />} />} />
        <Route path="/reset-password" element={<OnlyUnAuth component={<ResetPasswordPage />} />} />

        <Route path="/profile" element={<OnlyAuth component={<ProfilePage />} />}>
          <Route index element={<OnlyAuth component={<ProfileDetailsPage />} />} />
          <Route path="/profile/orders" element={<OnlyAuth component={<OrdersPage />} />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App;
