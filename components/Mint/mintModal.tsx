import {
  Button,
  Card,
  Container,
  Modal,
  TextField,
  Typography,
} from '@mui/material'
import Grid from '@material-ui/core/Grid';
import { ethers } from 'ethers'
import React, { useCallback, useEffect } from 'react'
import Image from 'next/image';

import modalImage from '../../public/mintModa.png'
import styles from '../../styles/Home.module.css'

const containerStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  //width: '75vh',
  //height: '60vh',
  //border: '2px solid #000',
  //backgroundImage: 'url(modalbckgredo.png)',
  backgroundPosition: 'center', /* Center the image */
  backgroundRepeat: 'no-repeat', /* Do not repeat the image */
  backgroundSize: '75%',
  color: '#fafafa',
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
    //await contract.mint(count)
    setOpen(false)
  }

  useEffect(() => {
    //contract.connect(signer)
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
       <Container style={containerStyle}>
          <Grid
            container
            spacing={0}
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item className={styles.modalgridimage}>
              <div style={{
                transform: 'translate(0, 1.5%)',
              }}>
                <Image src={modalImage} alt='Modal image' width={300} height={500} layout='fixed'/>
              </div>
            </Grid>
            <Grid item className={styles.modalgriditem}>

              <Card
                sx={{
                  borderLeft:0,
                  borderRadius: 0,
                  width: '30vh',
                  height: '50.3vh',
                }}
              >
                <Grid 
                  container 
                  spacing={5} 
                  direction='column'
                  justifyContent="center"
                  alignItems="center"
                >
                  <Grid item md>
                    <Button
                      className={styles.modalclosebutton}
                      variant="contained"
                      color="primary"
                      onClick={handleClose}
                    >

                    </Button>
                    <div
                      style={{
                        height: 100,
                      }}
                    ></div>
                  </Grid>
                  <Grid item xs>
                    Select amount to mint
                  </Grid>
                  <Grid item xs>
                    <TextField
                      sx={{
                        width: 100,
                        alignContent: 'center',
                      }}
                      id="amount"
                      label="Amount"
                      type="number"                  
                      InputProps={{
                        inputProps: {
                          min: 0,
                          max: 5,
                        },
                      }}
                      variant="standard"
                    />
                  </Grid>
                  <Grid item xs>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => triggerMint(2)}
                    >
                      MINT
                    </Button>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Modal>
    </div>
  )
}
