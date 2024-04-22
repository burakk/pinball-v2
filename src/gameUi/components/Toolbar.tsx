import { NavControls } from "./NavControls";
import Score from "./Score";
import LogoMain from "./LogoMain";
import styles from "./Toolbar.module.css";

export default function Toolbar() {
  return (
    <footer className={styles.Toolbar}>
      <LogoMain />
      <NavControls />
      <Score />
    </footer>
  );
}
