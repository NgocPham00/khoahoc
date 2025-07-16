import Answers from "../Favorites";
import PrivateRoutes from "../components/PrivateRoutes";
import LayoutDefault from "../layout/LayoutDefault";
import Login from "../Login";
import Home from "../pages/Home";
import Quiz from "../Quiz";
import Register from "../Register";
import Topic from "../Topic";
import Logout from "../logout";
import ProductDetail from "../Result";
import Favorites from "../Favorites";
import ViewHistory from "../History";

export const routes = [
  {
    path: "/",
    element: <LayoutDefault />,
    children: [
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "logout",
        element: <Logout />,
      },
      {
        element: <PrivateRoutes />,
        children: [
          {
            path: "favorites",
            element: <Favorites />,
          },
          {
            path: "quiz/:id",
            element: <Quiz />,
          },
          {
            path: "topics",
            element: <Topic />,
          },
          {
            path: "course/:id", // ✅ Sửa từ "result/:id" => "course/:id"
            element: <ProductDetail />,
          },
          {
            path: "view-history",
            element: <ViewHistory />,
          },
        ],
      },
    ],
  },
];
