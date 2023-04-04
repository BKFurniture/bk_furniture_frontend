import {
  Button,
  Divider,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Radio,
  Typography,
} from '@mui/material'
import React, {useState} from 'react'
import NewAddressModal from './AddNewModal'
import {useDispatch} from 'react-redux'
import {setAddress} from 'store/cartSlice'

export const ITEMS_ADDRESS = [
  {
    id: 0,
    fullName: 'Duong Lam',
    phoneNumber: '(+84) 942826536',
    location: '248 Ly Thuong Kiet, Quan 10, Ho Chi Minh City, Viet Nam',
    cost: 2,
    isActive: true,
  },
]
const Address = () => {
  const dispatch = useDispatch()
  const [items, setItems] = useState(ITEMS_ADDRESS)
  const [itemUpdate, setItemUpdate] = useState({})
  const [modalAdd, setModalAdd] = React.useState(false)

  const handleAddAddress = (item) => {
    if (item.id || item.id == 0) {
      setItems([
        ...items.map((el) => {
          if (el.id == item.id) return {...el, ...item}
          return {...el, isActive: !item.isActive}
        }),
      ])
    } else setItems([...items, {...item, id: items.length}])
  }
  const handleSelectAddress = (id) => (e) => {
    setItems([
      ...items.map((item) => {
        if (item.id == id) {
          dispatch(setAddress(item))
          return {...item, isActive: true}
        } else return {...item, isActive: false}
      }),
    ])
  }
  return (
    <>
      <Paper elevation={0} style={{padding: 10}}>
        <Typography
          variant="h6"
          component="h2"
          style={{color: '#1264A9', fontWeight: 700, marginBottom: 20}}
        >
          Your Address
          <Button
            color="primary"
            variant="contained"
            style={{float: 'right'}}
            onClick={() => {
              setItemUpdate({})
              setModalAdd(true)
            }}
          >
            + Add new address
          </Button>
        </Typography>
        {items.map((item) => (
          <>
            {' '}
            <Divider />
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Radio
                  checked={item.isActive}
                  onChange={handleSelectAddress(item.id)}
                />
              </ListItemAvatar>
              <ListItemText
                primary=<div style={{fontWeight: 500}}>{item.fullName}</div>
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{display: 'inline'}}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {item.phoneNumber}
                    </Typography>
                    <div style={{width: 500}}>
                      <Typography
                        sx={{display: 'inline'}}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {item.location}
                      </Typography>
                    </div>
                  </React.Fragment>
                }
              />
              <Typography
                variant
                style={{color: '#1264A9', paddingTop: 35, cursor: 'pointer'}}
                onClick={() => {
                  setItemUpdate(item)
                  setModalAdd(true)
                }}
              >
                Edit
              </Typography>
            </ListItem>
          </>
        ))}
      </Paper>
      <NewAddressModal
        open={modalAdd}
        onAdd={handleAddAddress}
        item={itemUpdate}
        handleClose={() => setModalAdd(false)}
      />
    </>
  )
}

export default Address
