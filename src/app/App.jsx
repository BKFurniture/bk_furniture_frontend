import * as React from 'react'

import {store} from '../store/store'
import {Provider} from 'react-redux'
import CssBaseline from '@mui/material/CssBaseline'
import {ThemeProvider} from '@mui/material/styles'
import {RouterProvider} from 'react-router-dom'

import theme from './theme'
import {router} from './router'
export default function App() {
  return (
    <div>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <RouterProvider router={router} />
        </ThemeProvider>
      </Provider>
    </div>
  )
}
