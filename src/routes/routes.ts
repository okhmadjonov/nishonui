import { routes } from "@/constants/routes";
import Admins from "@/pages/admins";

import Home from "@/pages/home";
import Login from "@/pages/login";
import Results from "@/pages/results";
import Settings from "@/pages/settings";
import Start from "@/pages/start";

export const publicRoutes = [
  {
    path: routes.LOGIN,
    element: Login,
  },
];

export const privateRoutes = [
  {
    path: routes.HOME,
    element: Home,
  },


  {
    path: routes.START,
    element: Start,
  },

  {
    path: routes.RESULTS,
    element: Results,
  },

  {
    path: routes.SETTINGS,
    element: Settings,
  },
  {
    path: routes.ADMINS,
    element: Admins,
  },
];
