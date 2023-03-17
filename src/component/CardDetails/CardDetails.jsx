
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'

import CardMedia from '@mui/material/CardMedia'


export default function RecipeReviewCard({item}) {
  return (
    <Card
      sx={{
        display:'flex',
        alignItems:'center',
        width: 600,
        height: 550,
        backgroundColor: '#C9ECFF',
        position: 'relative',
        padding: '10px 0',
        marginLeft: '70px',
        marginRight: '70px',
      }}
    >   

      <CardMedia
        component="img"
        height="410"
        width="350"
        image={item}
        alt="Paella dish"
      />
        

      <CardActions
        disableSpacing
        style={{position: 'absolute', left: 20, bottom: 20}}
      >

      </CardActions>
    </Card>
  )
}