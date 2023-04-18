import HeadsetMicIcon from '@mui/icons-material/HeadsetMic'
import {Avatar, Grid, IconButton, Typography} from '@mui/material'
import {Widget, addResponseMessage} from 'react-chat-widget'
import 'react-chat-widget/lib/styles.css'
import chatBoxApi from 'api/chat-box'
const ChatBox = () => {
  const handleNewUserMessage = (newMessage) => {
    console.log(`New message incoming! ${newMessage}`)
    chatBoxApi.sendMessage(newMessage).then((res) => {
      addResponseMessage(res.response)
    })
  }
  const getCustomLauncher = (handleToggle) => (
    <Grid container justifyContent={'end'}>
      <IconButton
        onClick={handleToggle}
        color="secondary"
        aria-label="add an alarm"
        size="large"
      >
        <Avatar style={{backgroundColor: '#1264A9'}}>
          <HeadsetMicIcon />
        </Avatar>
      </IconButton>
    </Grid>
  )

  return (
    <Widget
      title={
        <Grid container alignItems={'center'}>
          <Avatar style={{backgroundColor: 'white'}}>
            <HeadsetMicIcon style={{color: '#1264a9'}} />
          </Avatar>
          <Typography variant="h6">Customer care</Typography>
        </Grid>
      }
      handleNewUserMessage={handleNewUserMessage}
      subtitle=" "
      launcher={(handleToggle) => getCustomLauncher(handleToggle)}
    />
  )
}

export default ChatBox
