import { useGameContext } from "@context/GameContext";
import styles from "./Score.module.css";

const Score = () => {
  const { gameInfo } = useGameContext() || { gameInfo: { totalScore: 0 } };

  return (
    <p className={styles.Score}>
      <strong>{formatScore(gameInfo.totalScore)}</strong>
    </p>
  );
};

function formatScore(score: number) {
  if (Math.abs(score) < 1) return "0000";
  const length = Math.floor(Math.log10(score) + 1);

  return "0".repeat(4 - length) + score;
}



function NumStrip({ activeIndex = "0" }) {

  return (
    <ul className={styles.DynamicScoreStrip} style={{ top: `calc(${activeIndex} * var(--vertical-move-by))` }}>
      {
        Array(10)
          .fill(null)
          .map((_, num) => <li key={_} >{num}</li>)
      }
    </ul>
  );
}

function debounce(action: () => unknown, delay: number = 400) {
  let timeout: number | null;


  return () => {

    if (!timeout) {
      timeout = setTimeout(() => { action(); timeout = null; }, delay);
    }

  }

}


export function DynamicScore() {
  const { gameInfo } = useGameContext() || { gameInfo: { totalScore: 0 } };
  const formatted = formatScore(gameInfo.totalScore);
  return (
    <div className={styles.DynamicScore}>
      <div className={styles.NumStripsWrapper}>
      <NumStrip activeIndex={"-" + formatted[0]} />
      <NumStrip activeIndex={"-" + formatted[1]} />
      <NumStrip activeIndex={"-" + formatted[2]} />
      <NumStrip activeIndex={"-" + formatted[3]} />
      </div>
    </div>
  )
}

export default Score;
