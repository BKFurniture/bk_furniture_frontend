import {createBrowserRouter} from 'react-router-dom'
import Home from '../page/Home'

import SignIn from '../page/SignIn'
import SignUp from '../page/SignUp'
import Layout from './Layout'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
    ],
  },
  {
    path: '/sign-up',
    element: <SignUp />,
  },
  {
    path: '/sign-in',
    element: <SignIn />,
  },
  {
    path: '/sign-out',
    element: <SignIn />,
  },
])
