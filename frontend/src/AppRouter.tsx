import { JSX } from 'solid-js';

import { Router, Route } from '@solidjs/router';

import HomePage from './pages/Home';
import AdminPage from './pages/Admin';
import { HOME_ROUTE, ADMIN_ROUTE } from './utils/consts';

const AppRouter = (): JSX.Element => {
  return (
    <Router>
      <Route
        path={HOME_ROUTE}
        component={HomePage}
      />
      <Route
        path={ADMIN_ROUTE}
        component={AdminPage}
      />
    </Router>
  );
};

export default AppRouter;
