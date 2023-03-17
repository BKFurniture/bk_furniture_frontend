import Account from "page/Account";
import ProductList from "page/ProductList";
import { createBrowserRouter } from "react-router-dom";
import Home from "../page/Home";

<<<<<<< HEAD
import SignIn from "../page/SignIn";
import SignUp from "../page/SignUp";
import AppProvider from "./hoc/AppProvider";
import CheckedUser from "./hoc/CheckedUser";
import Layout from "./Layout";
import Details from "../page/Details";
=======
import SignIn from '../page/SignIn'
import SignUp from '../page/SignUp'
import AppProvider from './hoc/AppProvider'
import CheckedUser from './hoc/CheckedUser'
import Layout from './Layout'
import Details from '../page/Details'
import Cart from 'page/Cart'
>>>>>>> 10902a9248484af7b0a34f5c2bb81e2eb314266d

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppProvider />,
    children: [
      {
        element: <Layout />,
        children: [
          {
            path: "/",
            element: <Home />,
          },
          {
            path: "products",
            element: <ProductList />,
          },
          {
            path: "account",
            element: <Account />,
          },
          {
            path: "details/:name",
            element: <Details />,
            exact: true,
          },
          {
            path: 'cart',
            element: <Cart />,
          },
        ],
      },
      {
        element: <CheckedUser />,
        children: [
          {
            path: "sign-up",
            element: <SignUp />,
          },
          {
            path: "sign-in",
            element: <SignIn />,
          },

          // {
          //   path: 'sign-out',
          //   element: <SignIn />,
          // },
        ],
      },
    ],
  },
]);

