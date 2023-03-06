import {red} from '@mui/material/colors'
import {createTheme} from '@mui/material/styles'

// A custom theme for this app
const theme = createTheme({
  palette: {
    background: {
      default: '#E0E0E0',
    },
    primary: {
      main: '#1264A9',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
  },
})

export default theme
