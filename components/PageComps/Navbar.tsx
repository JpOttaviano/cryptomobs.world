import React from 'react'
import {
  AppBar,
  Avatar,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material'
import { makeStyles } from '@material-ui/styles'
import { Box } from '@mui/system'
import Link from 'next/link'
import Image from 'next/image'
import { FaDiscord, FaTwitter } from 'react-icons/fa'
import { HiMenu } from 'react-icons/hi'
import styles from '../../styles/Home.module.css'

import skeleIcon from '../../public/cmbaseicon.png'
import navbarLong from '../../public/navbarlong.png'

const navbarBckg = {
  backGroundImage: `url(${navbarLong})`,
}

const useStyles = makeStyles((theme) => ({
  navbarBckg: {
    backGroundImage: `url(${navbarLong})`,
  },
}))

export default function Navbar() {
  const classes = useStyles()
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null)
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  )

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  return (
    <AppBar className={classes.navbarBckg}>
      <Container maxWidth="xl">
        <Toolbar disableGutters={true}>
          <Typography
            variant="h6"
            noWrap={true}
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            <div className={styles.flipimage}>
              <Link href="/">
                <Image src={skeleIcon} alt="logo" width={35} height={35} />
              </Link>
            </div>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <HiMenu />
            </IconButton>

            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              color="transparent"
              keepMounted={true}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              <MenuItem onClick={handleCloseNavMenu}>
                <Link href="/#about" scroll={true}>
                  About
                </Link>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Link href="/#faq">FAQ</Link>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Link href="/adopt">Mint</Link>
              </MenuItem>
              <MenuItem onClick={handleCloseUserMenu}>
                <Link href="https://twitter.com/MobsCrypto">
                  <FaTwitter />
                </Link>
              </MenuItem>
              <MenuItem onClick={handleCloseUserMenu}>
                <Link href="https://discord.gg/jshSquFwUF">
                  <FaDiscord />
                </Link>
              </MenuItem>
              <MenuItem onClick={handleCloseUserMenu}>
                <Link href="/">
                  <div className={styles.invertimg}>
                    <Image
                      src="/opensea.png"
                      alt="OpenSea Logo"
                      width={17}
                      height={17}
                    />
                  </div>
                </Link>
              </MenuItem>
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap={true}
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            <div className={styles.flipimage}>
              <Link href="/">
                <Image src={skeleIcon} alt="logo" width={35} height={35} />
              </Link>
            </div>
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <MenuItem onClick={handleCloseNavMenu}>
              <Link href="/#about" scroll={true}>
                About
              </Link>
            </MenuItem>
            <MenuItem onClick={handleCloseNavMenu}>
              <Link href="/#faq" scroll={true}>
                FAQ
              </Link>
            </MenuItem>
            <MenuItem onClick={handleCloseNavMenu}>
              <Link href="/adopt" scroll={true}>
                Mint
              </Link>
            </MenuItem>
          </Box>

          <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
            <MenuItem onClick={handleCloseUserMenu}>
              <Link href="https://twitter.com/MobsCrypto">
                <FaTwitter />
              </Link>
            </MenuItem>
            <MenuItem onClick={handleCloseUserMenu}>
              <Link href="https://discord.gg/jshSquFwUF">
                <FaDiscord />
              </Link>
            </MenuItem>
            <MenuItem onClick={handleCloseUserMenu}>
              <Link href="/">
                <Image
                  src="/opensea.png"
                  alt="OpenSea Logo"
                  width={17}
                  height={17}
                />
              </Link>
            </MenuItem>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
