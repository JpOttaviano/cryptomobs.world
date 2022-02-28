import { Box, Button, Grid, MenuItem, Typography } from '@mui/material'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useRef } from 'react'
import { FaTwitter, FaDiscord } from 'react-icons/fa'
import { Parallax, useParallax } from 'react-scroll-parallax'
import Mint from '../components/Mint/mint'
import Footer from '../components/PageComps/Footer'
import Header from '../components/PageComps/Header'
import Navbar from '../components/PageComps/Navbar'
import Transition from '../components/Transition/transition'
import styles from '../styles/Home.module.css'

const texts = [
  `Monsters are escaping the dungeons on a massive exodus never before seen.
  The sheer amount of monsters roaming the land is just to much to fight off.
  Without mediation, a massive conflict between species is inminent.
  `,
  `The King proposed an alternative solution to the problem: Integration.
  The "Adopt-a-Mob" initiative came to be. All citizens of the kingdom are encouraged to adopt a monster, teach them the human ways while learning theirs and try to
  adapt them into our society. Not only would this solve the monster overpopulation problem but the union between monsters and humans would also prove beneficial for both.`,

  `An initial bunch of 10 thousand monsters of 5 different species agreed to the initiave to prove that co-existing is possible.
   Help relieve the monster overpopulation issue, while the kingdom keeps investigating the root cause of the monster dungeon exodus.
   `,
]

const imgRes = {
  width: 2400,
  height: 1350,
}

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
                    citizens of the kingdom are encouraged to adopt a monster,
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
                    An initial bunch of 10 thousand monsters of 5 different
                    species agreed to the initiave to prove that co-existing is
                    possible.
                    <br />
                    You can adopt these unique creatures to help humans and
                    monsters close the gap between species.
                    <p />
                    Help relieve the monster overpopulation issue, while the
                    kingdom keeps investigating the root cause of the monster
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
              <div id="faq" />
              <Image src="/endbackcolor.png" width={2400} height={1650} />
              <div className={styles.faqtext}>
                CryptoMobs is a collection of 10.000 unique animated monsters
                from 5 different species. Each with its own unique traits.
                <p />
              </div>
            </Grid>
            <div id="roadmap" />
            <Grid item={true}>
              <div className={styles.faqtext}>
                ROADMAP
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
                Once all CryptoMobs are minted, we hope to develop a Metaverse
                integration so owners can interact with their CryptoMobs in more
                exciting ways.
                <br />
                |
                <br />
                |
                <br />
                Crypto Game
                <br />
                Our initial idea was to create a crypto videogame. Due to lack of
                resources we ended up postponing the project. We hope that this
                collection can serve as a kickstarter to develop the game.
                <br />
                Most of the CryptoMobs design and animations are actually assets
                we are using for the game.
                <br />
                We cant say much about it since it is still in very early
                stages, but we can confirm that it will be possible to use
                CryptoMobs to interact with the game.
              </div>
            </Grid>
            <Grid item={true}>
              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                <MenuItem>
                  <Link href="https://twitter.com/MobsCrypto">
                    <div className={styles.invertimg}>
                      <FaTwitter />
                    </div>
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link href="https://discord.gg/jshSquFwUF">
                    <div className={styles.invertimg}>
                      <FaDiscord />
                    </div>
                  </Link>
                </MenuItem>
                <MenuItem>
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
            </Grid>
          </Grid>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default Home
