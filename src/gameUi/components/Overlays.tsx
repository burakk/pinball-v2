import { ReactNode } from "react";
import styles from './Overlays.module.css';

export const Overlay = ({ children }: { children: ReactNode }) => (

  <div className={styles.Overlay}>
    {children}
  </div>

)



export const OverlayGameOver = () => {
  return (
    <Overlay>
      <p>Game Over</p>
      <a href="/">replay</a>
    </Overlay>
  )
}


