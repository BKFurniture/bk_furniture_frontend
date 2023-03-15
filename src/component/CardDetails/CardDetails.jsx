import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ShareIcon from '@mui/icons-material/Share'
import {Chip, Grid, Paper} from '@mui/material'
import Avatar from '@mui/material/Avatar'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import ChairImg from 'asset/img/chair.png'
export default function RecipeReviewCard() {
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
        image={ChairImg}
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