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
  Link,
  Modal,
  Paper,
  TextField,
  Typography,
} from '@mui/material'
import Grid from '@material-ui/core/Grid';
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
  //border: '2px solid #000',
  backgroundImage: 'url(modalbckgredo.png)',
  backgroundPosition: 'center', /* Center the image */
  backgroundRepeat: 'no-repeat', /* Do not repeat the image */
  backgroundSize: '75%',
  p: 4,
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

  const triggerMint = async (count: number) => {
    //await contract.setGreeting('No MOre mr good hardhat')
    setOpen(false)
  }

  useEffect(() => {
    contract.connect(signer)
    // contract.name().then(name => { setGrlyName(name) })

    // TODO add contract listeners ?
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
          backgroundColor: 'transparent',
        }}
      >
       
          <Container sx={containerStyle}>
          <Grid
          container
          spacing={1}
          direction="column"
          alignItems="center"
          justify="center"
        >
          <Grid
          container
          spacing={0}
          direction="row"
          alignItems="center"
          justify="center"
        >

          <Grid item xs={8}>
            <Card
              sx={{
                borderRadius: 4,
              }}
            >
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Select an amount to mint
            </Typography>
            <TextField
              id="amount"
              label="Amount"
              type="number"
              sx={{ mt: 5, ml: 5 }}
              
              InputProps={{
                inputProps: {
                  min: 0,
                  max: 5,
                },
              }}
              variant="standard"
            />
            <Button
              variant="outlined"
              color="secondary"
              sx={{ mt: 15, ml: -15 }}
              onClick={() => triggerMint(1)}
            >
              MINT
            </Button>
          </Card>
          </Grid>
          </Grid>
        </Grid>
        </Container>
        
      </Modal>
    </div>
  )
}
