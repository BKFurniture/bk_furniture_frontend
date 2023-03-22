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

const ITEMS = [
  {
    title: 'Standard Shipping',
    subTitle: 'Land Shipping',
    content: '7 to 14 days shipping after purchase',
    span: 'Nationwide shipping only',
    cost: 2,
    isActive: true,
  },
  {
    title: 'Express Shipping',
    subTitle: 'Air Shipping',
    content: '2 to 6 days shipping after purchase',
    span: 'Nationwide and Global shipping',
    cost: 4,
    isActive: false,
  },
]
const Option = () => {
  const [items, setItems] = useState(ITEMS)
  return (
    <div>
      <Paper elevation={0} style={{padding: 10}}>
        <Typography
          variant="h6"
          component="h2"
          style={{color: '#1264A9', fontWeight: 700, marginBottom: 20}}
        >
          O ption
        </Typography>
        <Divider />
        {items.map((item, index) => (
          <>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Radio
                  checked={item.isActive}
                  onChange={(event) => {
                    setItems(
                      items.map((el, idx) => {
                        if (idx === index)
                          return {
                            ...el,
                            isActive: true,
                          }
                        else return {...el, isActive: false}
                      }),
                    )
                  }}
                />
              </ListItemAvatar>
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
                    <div>
                      {' '}
                      <Typography
                        sx={{display: 'inline'}}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {item.content}
                      </Typography>
                    </div>
                    <div> {`${item.span}`}</div>
                  </React.Fragment>
                }
              />
              <Typography
                variant
                style={{color: '#1264A9', paddingTop: 35, fontWeight: 500}}
              >
                ${item.cost}
              </Typography>
            </ListItem>
            <Divider />
          </>
        ))}
      </Paper>
    </div>
  )
}

export default Option
