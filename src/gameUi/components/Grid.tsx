import styles from "./Grid.module.css";

export const Grid = () => {
  const squares = [];

  for (let i = 0; i < 840; i++) {
    squares.push(
      <div className={styles.GridSquare} key={i}>
        <span>
          x: {i % 24} - y: {Math.floor(i / 24)}
        </span>
      </div>
    );
  }
  return <div className={styles.Grid}>{squares}</div>;
};
