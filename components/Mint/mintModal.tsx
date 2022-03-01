import {
  Button,
  Card,
  CardContent,
  Container,
  IconButton,
  Modal,
  TextField,
  Typography,
} from '@mui/material'
import Grid from '@material-ui/core/Grid'
import { ethers } from 'ethers'
import React, { useCallback, useEffect } from 'react'
import Image from 'next/image'
import { IoMdClose } from 'react-icons/io'

import modalImage from '../../public/mintModa.png'
import styles from '../../styles/Home.module.css'

const containerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '400px',
  height: '700px',
  // border: '2px solid #000',
  // backgroundImage: 'url(modalbckgredo.png)',
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
    // await contract.mint(count)
    setOpen(false)
  }

  useEffect(() => {
    // contract.connect(signer)
    // contract.name().then(name => { setGrlyName(name) })
    // TODO add contract listeners ?
  }, [])

  return (
    <div>
      <Button onClick={handleOpen}>MINT</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          display: 'flex',
        }}
      >
        <Container style={containerStyle}>
          <Grid
            container={true}
            spacing={0}
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item={true} className={styles.modalgridimage}>
              <Image
                src={modalImage}
                alt="Modal image"
                width={300}
                height={500}
                layout="responsive"
              />
            </Grid>
            <Grid item={true} className={styles.modalgriditem}>
              <Card
                sx={{
                  borderLeft: 0,
                  borderRadius: 0,
                }}
              >
                <CardContent>
                  <Grid
                    container={true}
                    spacing={5}
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Grid item={true}>
                      <div className={styles.modalclose}>
                        <IconButton
                          className={styles.modalclose}
                          onClick={handleClose}
                        >
                          <IoMdClose />
                        </IconButton>
                      </div>
                    </Grid>
                    <Grid item={true} xs={true}>
                      Select amount to mint
                    </Grid>
                    <Grid item={true} xs={true}>
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
                    <Grid item={true} xs={true}>
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => triggerMint(2)}
                      >
                        MINT
                      </Button>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Modal>
    </div>
  )
}
