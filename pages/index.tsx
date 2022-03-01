import { Box, Button, Grid, MenuItem, Typography } from '@mui/material'
import { withStyles } from '@material-ui/core/styles'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useRef } from 'react'
import { FaTwitter, FaDiscord } from 'react-icons/fa'
import { Parallax, useParallax } from 'react-scroll-parallax'
import styled from 'styled-components'

import Mint from '../components/Mint/mint'
import Footer from '../components/PageComps/Footer'
import Header from '../components/PageComps/Header'
import Navbar from '../components/PageComps/Navbar'
import Transition from '../components/Transition/transition'
import styles from '../styles/Home.module.css'

const MenuItmSty = withStyles({
  root: {
    justifyContent: 'flex-start',
  },
})(MenuItem)

const imgRes = {
  width: 2400,
  height: 1350,
}

const PurpleLink = styled.a`
  color: violet;
`

const Home: NextPage = () => {
  const router = useRouter()
  return (
    <div className={styles.container} style={{}}>
      <Header />

      <main className={styles.main}>
        <Navbar />
        <div>
          <Grid container={true} spacing={50} direction="column">
            <Grid item={true}>
              <div className={styles.skybckg} />
              <div className={styles.titlesign}>
                <Image src="/cryptomobstitle.png" width={1200} height={246} />
              </div>
              <Image src="/landingHeader.png" width={2400} height={1350} />
              <Transition
                elem={
                  <div id="about" className={styles.transitiontext}>
                    Monsters are escaping the dungeons on a massive exodus never
                    before seen. The cause remains a mystery so far.
                    <p />
                    The sheer amount of monsters roaming the land is just too
                    much to fight off. Without intervention a massive conflict
                    between species is imminent.
                    <p />
                    Luckily, the King came up with a peaceful solution.
                  </div>
                }
              />
            </Grid>
            <Grid item={true}>
              <Image src="/landingDesigns.png" width={2400} height={1350} />
              <Transition
                elem={
                  <div className={styles.transitiontext}>
                    The King proposed an alternative solution to the problem:
                    Integration.
                    <br />
                    The &#39;Adopt-a-Mob&#39; initiative came to be. All
                    citizens of the Kingdom are encouraged to adopt a monster,
                    teach them the human ways while learning theirs and try to
                    adapt them into our society.
                    <p />
                    Not only would this solve the monster overpopulation problem
                    but the union between monsters and humans would also prove
                    beneficial for both.
                  </div>
                }
              />
            </Grid>

            <Grid item={true}>
              <div className={styles.cavecenter}>
                <Image
                  src="/cavePreview.png"
                  width={1280}
                  height={720}
                  unoptimized={true}
                />
              </div>
              <Transition
                elem={
                  <div className={styles.transitiontext}>
                    An initial bunch of 10.000 monsters of 5 different species
                    agreed to the initiave to prove that co-existing is
                    possible.
                    <br />
                    You can adopt these unique creatures to help humans and
                    monsters close the gap between species.
                    <p />
                    Help relieve the monster overpopulation issue, while the
                    Kingdom keeps investigating the root cause of the monster
                    dungeon exodus.
                  </div>
                }
              />
            </Grid>
            <Grid item={true}>
              <div className={styles.cavetop}>
                <Image src="/fintop.png" width={2400} height={1650} />
              </div>
              <Parallax translateY={[10, -10]} className={styles.cavemiddletop}>
                <Image src="/finmiddletop.png" width={2400} height={1650} />
              </Parallax>
              <Parallax
                translateY={[15, -15]}
                className={styles.cavemiddlebottom}
              >
                <Image src="/finmiddlelow.png" width={2400} height={1650} />
              </Parallax>

              <Image src="/endbackcolor.png" width={2400} height={1650} />
            </Grid>
          </Grid>

          <Grid container={true} spacing={16} direction="column">
            <Grid item={true}>
              <div className={styles.faqtext}>
                CryptoMobs is a collection of 10.000 unique animated monsters
                from 5 different species hosted on the Ethereum network
                <p />
              </div>
            </Grid>
            <Grid item={true}>
              <div className={styles.faqtext}>
                <Grid container={true} spacing={6} direction="column">
                  <Grid item={true}>
                    <div id="faq" />
                  </Grid>
                  <Grid item={true}>
                    <h2>How can I get my CryptoMobs?</h2>
                    There will be a presale for whitelisted addresses on the
                    first week for early supporters as well as active community
                    members. After that the public mint will begin the second
                    week after the launch.
                  </Grid>
                  <Grid item={true}>
                    <h2>When will mint start?</h2>
                    Whitelist mint: 3rd March 2022
                    <br />
                    Public mint: 7th March 2022
                  </Grid>

                  <Grid item={true}>
                    <h2>How much will it cost?</h2>
                    0.03 ETH
                  </Grid>
                  <Grid item={true}>
                    <h2>How can I get a whitelist spot?</h2>
                    Through our{' '}
                    <Link
                      href={'https://discord.gg/jshSquFwUF'}
                      passHref={true}
                    >
                      <PurpleLink> Discord</PurpleLink>
                    </Link>{' '}
                    server
                  </Grid>
                </Grid>
              </div>
            </Grid>
            <div id="roadmap" />
            <Grid item={true}>
              <div className={styles.faqtext}>
                <h1>ROADMAP</h1>
                <p />
                CryptoMobs Launch
                <br />
                Project launch --&gt; Whitelist mint --&gt; Public mint --&gt;
                Reveal
                <br />
                |
                <br />
                |
                <br />
                Metaverse Integration
                <br />
                Once all CryptoMobs are minted, the next step is Metaverse
                integration so owners can interact with their CryptoMobs in more
                exciting ways.
                <br />
                |
                <br />
                |
                <br />
                Crypto Game
                <br />
                The launch of this this collection will serve as a kickstarter
                to develop a crypto game.
                <br />
                We cant say much about it since it is still in very early
                stages, but we can confirm that it will be possible to use
                CryptoMobs to interact with the game.
              </div>
            </Grid>
            <Grid item={true}>
              <div className={styles.faqtext}>
                <Grid container={true} spacing={20} direction="column">
                  <Grid item={true}>
                    Join our
                    <Link
                      href={'https://discord.gg/jshSquFwUF'}
                      passHref={true}
                    >
                      <PurpleLink> Discord</PurpleLink>
                    </Link>{' '}
                    server to get whitelisted, updates and more information
                    about the project.
                  </Grid>
                </Grid>
              </div>
            </Grid>
            <Grid item={true}>
              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                <MenuItmSty>
                  <Link href="https://twitter.com/MobsCrypto">
                    <div className={styles.invertimg}>
                      <FaTwitter />
                    </div>
                  </Link>
                </MenuItmSty>
                <MenuItmSty>
                  <Link href="https://discord.gg/jshSquFwUF">
                    <div className={styles.invertimg}>
                      <FaDiscord />
                    </div>
                  </Link>
                </MenuItmSty>
                <MenuItmSty>
                  <Link href="/">
                    <Image
                      src="/opensea.png"
                      alt="OpenSea Logo"
                      width={17}
                      height={17}
                    />
                  </Link>
                </MenuItmSty>
              </Box>
            </Grid>
          </Grid>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default Home
