import { Card } from '@mui/material'
import styles from '../../styles/Home.module.css'

export default function InfoCard({ elem }: { elem: JSX.Element }) {
  return (
    <div className={styles.infocard}>
      <Card
        sx={{
          borderRadius: 2,
          opacity: 0.5,
          width: '30vh',
          height: '30vh',
        }}
      >
        {elem}
      </Card>
    </div>
  )
}
