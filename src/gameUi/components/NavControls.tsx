import { useGameContext } from "@context/GameContext";
import styles from "./NavControls.module.css";

export function NavControls() {
  const { dispatch, gameInfo } = useGameContext() || {};

  if (!gameInfo || !dispatch) return null;

  return <div className={styles.NavControls}>{/* <p>{totalScore}</p> */}</div>;
}
