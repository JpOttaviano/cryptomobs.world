import { Button, Grid, Typography } from '@mui/material'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useRef } from 'react'
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
            <div className={styles.skybckg}>
              </div>
              <div className={styles.titlesign}>
                <Image
                  src="/cryptomobstitle.png"
                  width={1200}
                  height={246}
                />
              </div>
              <Image
                src="/landingHeader.png"
                width={2400}
                height={1350}
              />
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
                    The &#39;Adopt-a-Mob&#39; initiative came to be. All citizens of the
                    kingdom are encouraged to adopt a monster, teach them the
                    human ways while learning theirs and try to adapt them into
                    our society.
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
                  unoptimized
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
                <Image
                  src="/endtop.png"
                  width={2400}
                  height={1650}
                />
              </div>
              <Parallax translateY={[15, -28]} className={styles.cavemiddletop}>
                <Image
                  src="/endmiddletop.png"
                  width={2400}
                  height={1650}
                />
              </Parallax>
              <Parallax
                translateY={[20, -31]}
                className={styles.cavemiddlebottom}
              >
                <Image
                  src="/endmiddlebottom.png"
                  width={2400}
                  height={1650}
                />
              </Parallax>
              <Image src="/endbackcolor.png" width={2400} height={1650} />
            </Grid>

            <Grid item={true}>
              <div id="faq" />
            </Grid>
          </Grid>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default Home
