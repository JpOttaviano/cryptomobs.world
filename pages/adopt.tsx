import { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import Image from 'next/image'

import Mint from '../components/Mint/mint'
import Head from 'next/head'
import { Button } from '@mui/material'
import { Router, useRouter } from 'next/router'
import Header from '../components/PageComps/Header'
import Footer from '../components/PageComps/Footer'
import Link from 'next/link'
import Navbar from '../components/PageComps/Navbar'

const backgroundStyle = {
  backgroundImage: `url(escapecave.png)`,
}

const Adopt: NextPage = () => {
  const router = useRouter()
  return (
    <div className={styles.container}>
      <Header />

      <main className={styles.main}>
        <Navbar />
        <div className={styles.backgroundimage}>
          <Image src="/escapecave.png" width={2400} height={1350} />
        </div>
        <p className={styles.description}>this is mono</p>
        <div className={styles.overindex}>
          <Mint />
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default Adopt
