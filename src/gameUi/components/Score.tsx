import { useGameContext } from "@context/GameContext";

const Score = () => {
  const { gameInfo } = useGameContext() || { gameInfo: { totalScore: 0 } };
  const scoreStyle = {
    textAlign: "right",
    position: "absolute",
    top: 300,
    right: 4,
    color: "white",
    backgroundColor: "rgba(0,0,0,0.4)",
    padding: "8px",
  } as const;
  return (
    <p style={scoreStyle}>
      <strong>{formatScore(gameInfo.totalScore)}</strong>
    </p>
  );
};

function formatScore(score: number) {
  if (Math.abs(score) < 1) return "0000";
  const length = Math.floor(Math.log10(score) + 1);

  return "0".repeat(4 - length) + score;
}

export default Score;
