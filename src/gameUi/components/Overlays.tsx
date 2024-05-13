import { ComponentPropsWithRef, useEffect, useState } from "react";
import styles from './Overlays.module.css';
import { IconKeyboardKeys, IconKeyboardLeft, IconKeyboardRight, IconPlay } from "./Icons";
import LogoMain from "./LogoMain";
import { Button } from "./Buttons";
import { playIntro } from "@gameCore/audio/toneWorks";


type OverlayContents = "intro" | "gameover" | "";

export const Overlay = ({ children, className }: ComponentPropsWithRef<"div">) => {


  return (

    <div className={`${styles.Overlay} ${className}`}>

      {children}

    </div >

  )

}

export function OverlayRouter({ content = "intro" }: { content?: OverlayContents }) {


  //const [content, setContent] = useState<OverlayContents>("intro");
  const [exiting, setExiting] = useState<boolean>(false);
  const [active, setActive] = useState<boolean>(true);

  useEffect(() => {
    setActive(true);
  }, [content]);


  function closeOverlay(wait?: number) {
    setExiting(true);
    if (wait) {
      setTimeout(() => {
        setActive(false);
        setExiting(false);
      }, wait);

      return;
    }
  }

  return (
    active
      ?
      <Overlay className={exiting ? styles.OverlayExiting : ""} >
        {content === "intro" && <OverlayContentIntro onChangeRoute={() => { closeOverlay(1000); playIntro(); }


        } />}
        {content === "gameover" && <OverlayContentGameOver />}
      </Overlay>
      :
      null
  )
}

export const OverlayContentGameOver = () => {
  return (
    <div className="OverlayContentGameOver">
      <p>Game Over</p>
      <a href="/">replay</a>
    </div>
  )
}

export const OverlayContentIntro = ({ onChangeRoute }: { onChangeRoute: () => void }) => {
  return (
    <div className={styles.OverlayContentIntro}>
      <LogoMain />
      <Button onClick={() => onChangeRoute()}>
        <IconPlay /> Play
      </Button>


      <p> <IconKeyboardKeys /> You can play by using the left <IconKeyboardLeft /> and right <IconKeyboardRight /> arrow keys of your keyboard, or by touching the right and left sides of your touch screen...</p>

    </div>
  )
}



