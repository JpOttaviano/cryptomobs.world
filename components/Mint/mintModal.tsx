import {
  Button,
  Card,
  Container,
  IconButton,
  Modal,
  Stack,
  TextField,
  Paper,
  Box,
  CardMedia,
  CardContent,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import { ethers } from 'ethers'
import React, { useCallback, useEffect } from 'react'
import Image from 'next/image'
import { IoMdClose } from 'react-icons/io'

import modalImage from '../../public/mintModa.png'
import styles from '../../styles/Home.module.css'

const UNIT_PRICE = 0.03

const containerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  // border: '2px solid #000',
  // backgroundImage: 'url(modalbckgredo.png)',
}

const Item = styled(Paper)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(4),
  border: '0',
}))

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
  const [amount, setAmount] = React.useState(0)
  // const [grlyName, setGrlyName] = React.useState('')
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(Number(event.target.value))
  }

  const triggerMint = async () => {
    const price = amount * UNIT_PRICE
    await contract.mint(amount, {
      value: ethers.utils.parseEther(price.toString()),
    })
    setOpen(false)
  }

  useEffect(() => {
    contract.connect(signer)
    // contract.name().then(name => { setGrlyName(name) })
    // TODO add contract listeners ?
  }, [])

  return (
    <div>
      <Button variant="contained" onClick={handleOpen}>
        MINT
      </Button>
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
          <div className={styles.pxielfont}>
            <Card
              sx={{
                borderRadius: 5,
                display: 'flex',
                backgroundColor: 'transparent',
              }}
            >
              <Image src={modalImage} width="250hv" height="50%" />
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  backgroundColor: '#fafafa',
                }}
              >
                <CardContent>
                  <Stack>
                    <div className={styles.modalclose}>
                      <IconButton
                        className={styles.modalclose}
                        onClick={handleClose}
                      >
                        <IoMdClose />
                      </IconButton>
                    </div>
                    <Item>Select amount to mint</Item>
                    <Item>
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
                            max: 10,
                          },
                        }}
                        value={amount}
                        onChange={handleAmount}
                        variant="standard"
                      />
                    </Item>
                    <Item>
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => triggerMint()}
                      >
                        MINT
                      </Button>
                    </Item>
                  </Stack>
                </CardContent>
              </Box>
            </Card>
          </div>
        </Container>
      </Modal>
    </div>
  )
}
