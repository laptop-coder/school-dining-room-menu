import { JSX } from 'solid-js';

import { Router, Route } from '@solidjs/router';

import HomePage from './pages/Home';
import TVPage from './pages/TV';
import AdminPage from './pages/Admin';
import CategoryManagementPage from './pages/CategoryManagement';
import AddCategoryPage from './pages/AddCategory';
import AddDishPage from './pages/AddDish';
import EditDishPage from './pages/EditDish';
import DishManagementPage from './pages/DishManagement';
import DishAvailabilityManagementPage from './pages/DishAvailabilityManagement';
import AdminLoginPage from './pages/AdminLogin';
import AdminRegisterPage from './pages/AdminRegister';
import {
  HOME_ROUTE,
  TV_ROUTE,
  ADMIN_ROUTE,
  CATEGORY_MANAGEMENT_ROUTE,
  DISH_MANAGEMENT_ROUTE,
  DISH_AVAILABILITY_MANAGEMENT_ROUTE,
  ADD_CATEGORY_ROUTE,
  ADD_DISH_ROUTE,
  EDIT_DISH_ROUTE,
  ADMIN_LOGIN_ROUTE,
  ADMIN_REGISTER_ROUTE,
} from './utils/consts';

const AppRouter = (): JSX.Element => {
  return (
    <Router>
      <Route
        path={HOME_ROUTE}
        component={HomePage}
      />
      <Route
        path={TV_ROUTE}
        component={TVPage}
      />
      <Route
        path={CATEGORY_MANAGEMENT_ROUTE}
        component={CategoryManagementPage}
      />
      <Route
        path={DISH_AVAILABILITY_MANAGEMENT_ROUTE}
        component={DishAvailabilityManagementPage}
      />
      <Route
        path={DISH_MANAGEMENT_ROUTE}
        component={DishManagementPage}
      />
      <Route
        path={ADD_CATEGORY_ROUTE}
        component={AddCategoryPage}
      />
      <Route
        path={ADD_DISH_ROUTE}
        component={AddDishPage}
      />
      <Route
        path={EDIT_DISH_ROUTE}
        component={EditDishPage}
      />
      <Route
        path={ADMIN_LOGIN_ROUTE}
        component={AdminLoginPage}
      />
      <Route
        path={ADMIN_REGISTER_ROUTE}
        component={AdminRegisterPage}
      />
      <Route
        path={ADMIN_ROUTE}
        component={AdminPage}
      />
    </Router>
  );
};

export default AppRouter;
