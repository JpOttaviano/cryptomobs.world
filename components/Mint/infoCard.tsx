import { Card } from '@mui/material'
import styles from '../../styles/Home.module.css'

import cardpng from '../../public/mintinfocard.png'

const imgbckg = {
  backgroundImage: `url(${cardpng})`,
}

export default function InfoCard({ elem }: { elem: JSX.Element }) {
  return (
    <div className={styles.infocard} style={imgbckg}>
      <Card
        sx={{
          borderRadius: 2,
          opacity: 0.5,
          width: '30vh',
          height: '25vh',
        }}
      >
        {elem}
      </Card>
    </div>
  )
}
