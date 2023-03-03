import {Box, Container, Grid, Typography} from '@mui/material'
import React from 'react'
import PosterHomePage from 'asset/img/poster-home.png'
import CardRoom from 'component/CardRoom'
import DiningRoomImg from 'asset/img/dining-room.png'
import BedRoomImg from 'asset/img/bed-room.png'
import LivingRoomImg from 'asset/img/living-room.png'
const listRoom = [
  {
    title: 'Dining Room',
    src: DiningRoomImg,
  },
  {
    title: 'Bed Room',
    src: BedRoomImg,
  },
  {
    title: 'Living Room',
    src: LivingRoomImg,
  },
]
const Home = () => {
  return (
    <>
      <img src={PosterHomePage} style={{width: '100%'}} />
      <Container>
        <Box style={{backgroundColor: '#fff', borderRadius: 10, marginTop: 30}}>
          <Grid container textAlign="center">
            <Grid sm={12} textAlign="center">
              <Typography
                variant="h6"
                component="h2"
                style={{color: '#1264A9'}}
              >
                Choose By Room
              </Typography>
              <div>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </div>
              <Grid container style={{padding: 30}}>
                {listRoom.map((item) => (
                  <Grid item xs={4}>
                    <CardRoom src={item.src} title={item.title} />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  )
}

export default Home
