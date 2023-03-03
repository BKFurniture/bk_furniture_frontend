import * as React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import {Button, CardActionArea, CardActions} from '@mui/material'

export default function MultiActionAreaCard(props) {
  const {src, title} = props
  return (
    <Card sx={{maxWidth: 345}}>
      <CardActionArea>
        <CardMedia component="img" height="450" image={src} alt={title} />
        <CardContent>
          <Typography
            gutterBottom
            variant="h6"
            style={{color: '#1264A9'}}
            component="div"
          >
            {title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
