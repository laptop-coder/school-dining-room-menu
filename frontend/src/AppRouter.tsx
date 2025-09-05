import { JSX } from "solid-js";

import { Router, Route } from "@solidjs/router";

import HomePage from "./pages/Home";
import { HOME_ROUTE } from "./utils/consts";

const AppRouter = (): JSX.Element => {
  return (
    <Router>
      <Route path={HOME_ROUTE} component={HomePage} />
    </Router>
  );
};

export default AppRouter;
