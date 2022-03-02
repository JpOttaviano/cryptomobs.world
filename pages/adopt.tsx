import { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import Image from 'next/image'

import Mint from '../components/Mint/mint'
import Head from 'next/head'
import { Button } from '@mui/material'
import Header from '../components/PageComps/Header'
import Footer from '../components/PageComps/Footer'
import Navbar from '../components/PageComps/Navbar'

const backgroundStyle = {
  backgroundImage: `url(escapecave.png)`,
}

const Adopt: NextPage = () => {
  // const router = useRouter()
  /*return (
    <div className={styles.container}>
      <Header />

      <main className={styles.main}>
        <Navbar />
        <p className={styles.description}>this is mono</p>
        <Mint />
      </main>

      <Footer />
    </div>
  )*/
  return (
    <div className={styles.container}>
      <Header />

      <main className={styles.main}>
        <p className={styles.description}> No mobs to adopt</p>
        <Mint />
      </main>

      <Footer />
    </div>
  )
}

export default Adopt
