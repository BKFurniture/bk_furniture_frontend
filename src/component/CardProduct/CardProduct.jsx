import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ShareIcon from '@mui/icons-material/Share'
import {Link as RouterLink} from 'react-router-dom'
import slugify from 'slugify'
import Avatar from '@mui/material/Avatar'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import ChairImg from 'asset/img/chair.png'
import {useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'
import {addCartItem} from 'store/cartSlice'
import {Chip} from '@mui/material'
export default function RecipeReviewCard({item}) {
  const slug = slugify(item.name, {lower: true})
  const dispatch = useDispatch()
  const handleAddCard = (value) => () => {
    dispatch(addCartItem(value))
  }
  function convertToSlug(Text) {
    return Text.toLowerCase()
      .replace(/[^\w ]+/g, '')
      .replace(/ +/g, '-')
  }
  return (
    <Card
      sx={{
        maxWidth: 360,
        backgroundColor: '#C9ECFF',
        position: 'relative',
        padding: '10px 0',
        margin: 'auto',
      }}
    >
      <CardHeader
        action={
          <IconButton
            onClick={handleAddCard({...item, quantity: 1})}
            sx={{backgroundColor: '#fff'}}
          >
            <AddShoppingCartIcon style={{color: '#1264A9'}} />
          </IconButton>
        }
        title={
          <Link
            component={RouterLink}
            to={`/products/${slug}`}
            style={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: '1',
              WebkitBoxOrient: 'vertical',
              color: '#1264A9',
              fontWeight: 700,
              textDecoration: 'none',
            }}
          >
            {item.name}
          </Link>
        }
        subheader={item.category}
      />
      <CardMedia
        component="img"
        height="300"
        image={item.images[0]?.url || ChairImg}
        alt={item.name}
        style={{objectFit: 'contain'}}
      />

      <CardActions
        disableSpacing
        style={{position: 'absolute', left: 20, bottom: 20}}
      >
        <Chip
          label={
            <div style={{fontWeight: 700, color: '#1264A9'}}>{item.price}$</div>
          }
          style={{backgroundColor: 'rgba(255, 255, 255, 0.45)'}}
        />
      </CardActions>
    </Card>
  )
}
