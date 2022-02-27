import Image from 'next/image'

import styles from '../../styles/Home.module.css'
import transiticionBottomUp from '../../public/caveTransitionbottomup.png'
import transiticionBottomDown from '../../public/caveTransitionbottomdown.png'
import transiticionTopDown from '../../public/caveTransitiontopdown.png'
import transiticiontopUp from '../../public/caveTransitiontopup.png'
import { Parallax } from 'react-scroll-parallax'

export default function transitionText({ elem }: { elem: JSX.Element }) {
  return (
    <Parallax 
        translateY={[0, -105]}
        className={styles.transitiontop}
    >    
      <Image
        src={transiticionBottomUp}
        width={2200}
        height={320}
        layout="responsive"
      />
      <div className={styles.outertransition}>
      <Parallax
        translateY={[10,-20]}
      >
        <Image
          src={transiticiontopUp}
          width={2200}
          height={320}
          layout="responsive"
        />
        <div className={styles.innertransition}>{elem}</div>
        <Image
          src={transiticionTopDown}
          width={2200}
          height={320}
          layout="responsive"
        />
      </Parallax>
      </div>
      <Image
        src={transiticionBottomDown}
        width={2200}
        height={320}
        layout="responsive"
      />
    </Parallax>
  )
}
