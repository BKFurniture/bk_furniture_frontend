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
            path: 'item/:id',
            element: <Details />,
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
