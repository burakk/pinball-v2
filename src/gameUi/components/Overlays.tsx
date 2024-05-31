import {
  PropsWithChildren,
  useEffect,
  useRef,
  useState,
} from "react";
import styles from "./Overlays.module.css";
import {
  IconKeyboardKeys,
  IconKeyboardLeft,
  IconKeyboardRight,
  IconPlay,
} from "./Icons";
import LogoMain from "./LogoMain";
import { Button } from "./Buttons";
import IntroVideo from "./Intro";
import { useGameContext } from "@context/GameContext";

export function Overlays({ contentType }) {
  //const [content, setContent] = useState<OverlayContents>("intro");
  const [exiting, setExiting] = useState<boolean>(false);
  const [active, setActive] = useState<boolean>(true);

  function closeOverlay() {
    setExiting(true);
    /*
     give time for css animation to complete,
     duration must be the same wtih the css 
     animation duration 
     */
    setTimeout(() => {
      setActive(false);
      setExiting(false);
    }, 1000);
  }

  if (!active) return null;

  return (
    <div className={`${styles.Overlay} ${exiting ? styles.OverlayExiting : ""}`} >
      {contentType === "started" && <OverlayContentInfo onCloseOverlay={closeOverlay} />}
      {contentType === "stopped" && <OverlayContentGameOver />}
    </div>
  );
}

export const OverlayContentGameOver = () => {
  const { gameInfo } = useGameContext();
  return (
    <div className="OverlayContentGameOver">
      <p>Game Over</p>
      <p>Your score is: {gameInfo.totalScore}</p>
      <a href="/">replay</a>
    </div>
  );
};

export const OverlayContentInfo = (
  props: PropsWithChildren & { onCloseOverlay: () => void }
) => {

  const introPlayed = sessionStorage.getItem("introPlayed");
  const [showInfo, setShowInfo] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>();

  useEffect(() => {

    if (!introPlayed) {

      sessionStorage.setItem("introPlayed", "true");

    }
  }, []);

  return (
    <div className={styles.OverlayContentIntro}>
      {
        showInfo && <div>
          <LogoMain />
          {props.children}
          <Button onClick={() => {
            if (introPlayed) {
              videoRef.current ? videoRef.current.currentTime = 6.7 : null;
            }
            videoRef.current?.play();
            setShowInfo(false);
          }}>
            <IconPlay /> Play
          </Button>

          <p>"Tilt" is a pinball game by Burak Kuyucaklı.</p>
          <p>
            {" "}
            <IconKeyboardKeys /> You can play by using the left <IconKeyboardLeft />{" "}
            and right <IconKeyboardRight /> arrow keys of your keyboard, or by
            touching the right and left sides of your touch screen.
          </p>
        </div>
      }

      <IntroVideo ref={videoRef} action={props.onCloseOverlay} />
    </div>
  );
};



