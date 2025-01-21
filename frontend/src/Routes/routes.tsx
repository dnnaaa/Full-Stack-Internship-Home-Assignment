import { createBrowserRouter } from "react-router-dom";
import App from "../App";

import NotFound from "../Pages/NotFound/NotFound";
import JobPage from "../Pages/JobPage/JobPage";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        path: "/",
        element: <JobPage></JobPage>,
      },
      { path: "*", element: <NotFound></NotFound> },
    ],
  },
]);
