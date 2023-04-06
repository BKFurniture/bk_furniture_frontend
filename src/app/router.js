import Account from 'page/Account'
import ProductList from 'page/ProductList'
import {createBrowserRouter} from 'react-router-dom'
import Home from '../page/Home'

import SignIn from '../page/SignIn'
import SignUp from '../page/SignUp'
import AppProvider from './hoc/AppProvider'
import CheckedUser from './hoc/CheckedUser'
import Layout from './Layout'
import Details from '../page/Details'
import Cart from 'page/Cart'
import Order from 'page/Order'
import OrderDetail from 'page/OrderDetail'
import Design from 'page/Design'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppProvider />,
    children: [
      {
        element: <Layout />,
        children: [
          {
            path: '/',
            element: <Home />,
          },
          {
            path: 'products',
            element: <ProductList />,
          },
          {
            path: 'account',
            element: <Account />,
          },
          {
            path: 'products/:name',
            element: <Details />,
            exact: true,
          },
          {
            path: 'cart',
            element: <Cart />,
          },
          {
            path: 'orders',
            element: <Order />,
          },
          {
            path: 'order/:id',
            element: <OrderDetail />,
          },
          {
            path: 'design',
            element: <Design />,
          },
        ],
      },
      {
        element: <CheckedUser />,
        children: [
          {
            path: 'sign-up',
            element: <SignUp />,
          },
          {
            path: 'sign-in',
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
])
