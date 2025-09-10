import { JSX } from 'solid-js';

import { Router, Route } from '@solidjs/router';

import HomePage from './pages/Home';
import AdminPage from './pages/Admin';
import CategoryManagementPage from './pages/CategoryManagement';
import AddCategoryPage from './pages/AddCategory';
import DishManagementPage from './pages/DishManagement';
import DishAvailabilityManagementPage from './pages/DishAvailabilityManagement';
import {
  HOME_ROUTE,
  ADMIN_ROUTE,
  CATEGORY_MANAGEMENT_ROUTE,
  DISH_MANAGEMENT_ROUTE,
  DISH_AVAILABILITY_MANAGEMENT_ROUTE,
  ADD_CATEGORY_ROUTE,
} from './utils/consts';

const AppRouter = (): JSX.Element => {
  return (
    <Router>
      <Route
        path={HOME_ROUTE}
        component={HomePage}
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
        path={ADMIN_ROUTE}
        component={AdminPage}
      />
    </Router>
  );
};

export default AppRouter;
