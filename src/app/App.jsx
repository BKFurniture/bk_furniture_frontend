import CssBaseline from '@mui/material/CssBaseline'
import {ThemeProvider} from '@mui/material/styles'
import {Provider} from 'react-redux'
import {RouterProvider} from 'react-router-dom'
import {store} from '../store/store'
import SnackbarProvider from './hoc/SnackbarProvider'

import {router} from './router'
import theme from './theme'
export default function App() {
  return (
    <div>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <SnackbarProvider>
            <RouterProvider router={router} />
          </SnackbarProvider>
        </ThemeProvider>
      </Provider>
    </div>
  )
}
