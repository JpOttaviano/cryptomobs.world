import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Container,
  Divider,
  FormControlLabel,
  Grid,
  Link,
  Modal,
  Paper,
  TextField,
  Typography,
} from '@mui/material'
import { width } from '@mui/system'
import { ethers } from 'ethers'
import React, { useCallback, useEffect } from 'react'

const containerStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '75vh',
  height: '60vh',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  backgroundImage: '',
}

export default function MintModal({
  provider,
  contract,
  signer,
}: {
  provider: ethers.providers.Web3Provider
  contract: ethers.Contract
  signer: ethers.providers.JsonRpcSigner
}) {
  const [open, setOpen] = React.useState(false)
  // const [grlyName, setGrlyName] = React.useState('')
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  useEffect(() => {
    contract.connect(signer)
    // contract.name().then(name => { setGrlyName(name) })
  }, [])

  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          backgroundImage: '',
        }}
      >
        <Box sx={containerStyle}>
          <Container sx={{ transform: 'translate(20%, 40%)' }}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Select an amount to mint
            </Typography>
            <TextField
              id="amount"
              label="Amount"
              type="number"
              sx={{ mt: 5, ml: 5 }}
              InputLabelProps={{
                shrink: true,
              }}
              variant="standard"
            />
            <Button
              variant="outlined"
              color="secondary"
              sx={{ mt: 15, ml: -15 }}
              onClick={() => {}}
            >
              MINT
            </Button>
          </Container>
        </Box>
      </Modal>
    </div>
  )
}
