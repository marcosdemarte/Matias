import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "../provider/authProvider";
import { ProtectedRoute } from "./ProtectedRoute";
import Login from "../pages/Login";
import Logout from "../pages/Logout";
import Home from "../pages/Home";
import React from "react";
import Registro from "../pages/Registro";
import { Modal } from "../pages/Modal";
import { Opps } from "../pages/Opps";
import { Test1 } from "../pages/Test1";
import { Test2 } from "../pages/Test2";
import { Test3 } from "../pages/Test3";
import { Test4 } from "../pages/Test4";
import { Test5 } from "../pages/Test5";
import { Test6 } from "../pages/Test6";

const Routes = () => {
  const { token } = useAuth();
  const [usuario, setUsuario] = React.useState(false);

  // Define public routes accessible to all users
  const routesForPublic = [
    {
      path: "*",
      element: <Opps />,
    },
    {
      path: process.env.PUBLIC_URL + "/",
      element: <Home />,
    },
  ];

  /*
        {
            path: "/service",
            element: <div>Service Page</div>,
        },
        {
            path: "/about-us",
            element: <div>About Us</div>,
        },
    */
  // Define routes accessible only to authenticated users
  const routesForAuthenticatedOnly = [
    {
      path: process.env.PUBLIC_URL + "/",
      element: <ProtectedRoute />, // Wrap the component in ProtectedRoute
      children: [
        {
          path: process.env.PUBLIC_URL + "/test1",
          element: <Test1 />, // <RegistroExito />
        },
      ],
    },
  ];

  // Define routes accessible only to non-authenticated users
  const routesForNotAuthenticatedOnly = [
    {
      path: process.env.PUBLIC_URL + "/login", //funciona  "/controlfit/login"
      element: <Login />,
    },
    {
      path: process.env.PUBLIC_URL + "/registro",
      element: <Registro />,
    },
    {
      path: process.env.PUBLIC_URL + "/registro",
      element: <Modal />, // <RegistroExito />
    },
    {
      path: process.env.PUBLIC_URL + "/test1",
      element: <Test1 />, // <RegistroExito />
    },
    {
      path: process.env.PUBLIC_URL + "/test2",
      element: <Test2 />, // <RegistroExito />
    },
    {
      path: process.env.PUBLIC_URL + "/test3",
      element: <Test3 />, // <RegistroExito />
    },
    {
      path: process.env.PUBLIC_URL + "/test4",
      element: <Test4 />, // <RegistroExito />
    },
    {
      path: process.env.PUBLIC_URL + "/test5",
      element: <Test5 />, // <RegistroExito />
    },
    {
      path: process.env.PUBLIC_URL + "/test6",
      element: <Test6 />, // <RegistroExito />
    },
  ];

  // Combine and conditionally include routes based on authentication status
  const router = createBrowserRouter([
    ...routesForPublic,
    ...(!token ? routesForNotAuthenticatedOnly : []),
    ...routesForAuthenticatedOnly,
  ]);

  // Provide the router configuration using RouterProvider
  return <RouterProvider router={router} />;
};

export default Routes;
