import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Modal,
  TextField,
  Typography,
} from '@mui/material'
import {useEffect, useState} from 'react'
import Mapbox from './Mapbox'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  height: 650,
  bgcolor: 'background.paper',
  padding: '40px 30px',
  boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
  borderRadius: '30px',
  gap: 30,
}

function NewAddressModal(props) {
  const [item, setItem] = useState({})
  const [isDefault, setIsDefault] = useState(false)

  useEffect(() => {
    setItem({...props.item})
  }, [props.item])

  const ParentcallbackFunction = (address) => {
    const distance = address.distance
    let cost = 0
    if (distance > 40) {
      cost = 9.99
    }
    if (distance > 100) {
      cost = 14.99
    }
    if (distance > 150) {
      cost = 20.99
    }
    if (distance > 200) {
      cost = 24.99
    }
    if (distance > 300) {
      cost = 29.99
    }
    setItem({...item, location: address.choosenAdd, cost})
  }

  function handleAddNewAddress() {
    props.onAdd({
      ...item,
      isActive: isDefault,
    })

    props.handleClose()
  }
  const handleChangeFieldItem = (field) => (e) => {
    const newItem = {...item}
    newItem[field] = e.target.value
    setItem(newItem)
  }
  return (
    <Modal
      open={props.open}
      onClose={() => props.handleClose()}
      aria-labelledby="modal-modal-title"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          New Address
        </Typography>
        <TextField
          margin="normal"
          size="small"
          required
          label="Full Name"
          value={item?.fullName || ''}
          type="text"
          onChange={handleChangeFieldItem('fullName')}
        />
        <TextField
          margin="normal"
          size="small"
          style={{marginLeft: '30px'}}
          required
          label="Phone Number"
          type="text"
          value={item.phoneNumber || ''}
          onChange={handleChangeFieldItem('phoneNumber')}
        />
        <TextField
          margin="normal"
          size="small"
          required
          fullWidth
          label="Specific address"
          disabled
          type="text"
          value={item.location || ''}
          onChange={handleChangeFieldItem('location')}
        />
        <div style={{marginTop: 16}}>
          <Mapbox
            ParentcallbackFunction={ParentcallbackFunction}
            address={item.location}
          />
        </div>
        <FormControlLabel
          label="Set as default address"
          control={
            <Checkbox
              color="success"
              value={isDefault}
              onChange={() => {
                setIsDefault(!isDefault)
              }}
            />
          }
        />
        <div style={{display: 'flex', justifyContent: 'end'}}>
          <Button
            variant="text"
            style={{marginRight: 5, color: '#828282'}}
            onClick={() => props.handleClose()}
          >
            Cancel
          </Button>
          <Button
            color="primary"
            disabled={!(item.phoneNumber && item.fullName && item.location)}
            variant="contained"
            onClick={handleAddNewAddress}
          >
            OK
          </Button>
        </div>
      </Box>
    </Modal>
  )
}

export default NewAddressModal
