import {
  Avatar,
  Divider,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Radio,
  Typography,
} from '@mui/material'
import React, {useState} from 'react'
import cashImg from 'asset/img/cash.svg'
import bankImg from 'asset/img/bank.svg'
import momoImg from 'asset/img/momo.png'
import paypalImg from 'asset/img/paypal.svg'
import PayPal from 'component/PayPal'
import {useDispatch} from 'react-redux'
import {setSnackbar} from 'store/appSlice'
import {useSelector} from 'react-redux'
import {setPaymentMethod} from 'store/cartSlice'
const ITEMS = [
  {
    title: 'Cash on Delivery',
    subTitle: 'Vietnam Dong Support Only',
    span: 'Accept for Nationwide shipment',
    image: cashImg,
    isActive: true,
    key: 'cash',
  },
  // {
  //   title: 'Pay with MOMO E-Wallet',
  //   subTitle: 'Vietnam Dong Support Only',
  //   span: 'Accept for Nationwide shipment',
  //   image: momoImg,
  //   isActive: false,
  // },
  {
    title: 'Pay with PayPal Balance',
    subTitle: 'Vietnam Dong Support Only',
    span: 'Accept for Nationwide shipment',
    image: paypalImg,
    isActive: false,
    key: 'paypal',
  },
  // {
  //   title: 'Bank transfer',
  //   subTitle: 'Vietnam Dong Support Only',
  //   span: 'Accept for Nationwide shipment',
  //   image: bankImg,
  //   isActive: false,
  // },
]
const Payment = () => {
  const dispatch = useDispatch()
  const [items, setItems] = useState(ITEMS)
  const [isSuccess, setIsSuccess] = useState(false)
  const totalPrice = useSelector((state) => state.cart.total)
  const handleSetDefaultMethods = () => {
    setItems([
      ...items.map((item) => {
        if (item.key == 'cash') return {...item, isActive: true}
        else return {...item, isActive: false}
      }),
    ])
  }
  return (
    <div>
      <Paper elevation={0} style={{padding: 10}}>
        <Typography
          variant="h6"
          component="h2"
          style={{color: '#1264A9', fontWeight: 700, marginBottom: 20}}
        >
          Payment Method
        </Typography>
        <Divider />
        {items.map((item, index) => (
          <>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Radio
                  disabled={isSuccess || false}
                  checked={item.isActive}
                  onChange={(event) => {
                    setItems(
                      items.map((el, idx) => {
                        if (idx === index) {
                          dispatch(setPaymentMethod(el.key))
                          return {
                            ...el,
                            isActive: true,
                          }
                        } else return {...el, isActive: false}
                      }),
                    )
                  }}
                />
              </ListItemAvatar>
              {item.key == 'paypal' && (
                <PayPal
                  open={item.isActive}
                  cost={totalPrice}
                  onClose={handleSetDefaultMethods}
                  onSuccess={() => {
                    setIsSuccess(true)
                    dispatch(
                      setSnackbar({
                        open: true,
                        message: 'Payment successfully!',
                        severity: 'success',
                      }),
                    )
                  }}
                />
              )}
              <ListItemText
                primary=<div style={{fontWeight: 500}}>{item.title}</div>
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{display: 'inline'}}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {item.subTitle}
                    </Typography>
                    <div> {`${item.span}`}</div>
                  </React.Fragment>
                }
              />
              <ListItemAvatar>
                <Avatar
                  alt="Travis Howard"
                  src={item.image}
                  style={{width: 80, height: 80}}
                />
              </ListItemAvatar>
            </ListItem>
            <Divider />
          </>
        ))}
      </Paper>
    </div>
  )
}

export default Payment
