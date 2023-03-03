import * as React from 'react'
import Paper from '@mui/material/Paper'
import InputBase from '@mui/material/InputBase'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import SearchIcon from '@mui/icons-material/Search'
import DirectionsIcon from '@mui/icons-material/Directions'

export default function CustomizedInputBase() {
  return (
    <Paper
      variant="outlined"
      sx={{
        p: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 400,
        height: 40,
      }}
    >
      <IconButton type="submit" sx={{p: '10px'}} aria-label="search">
        <SearchIcon />
      </IconButton>
      <InputBase
        sx={{ml: 1, flex: 1}}
        placeholder="Search for products, brand,... "
        inputProps={{'aria-label': 'search '}}
      />
    </Paper>
  )
}
