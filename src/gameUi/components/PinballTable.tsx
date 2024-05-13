import { useRef, useEffect } from "react";
import { useAnimationFrame } from "@hooks/useAnimationFrame";
import { useDownKeys } from "@hooks/useDownKeys";
import { render } from "@gameCore/render";
import { createPinball } from "@gameCore/pinball";
import { globals } from "@gameConfig/globals";
import { Pinball } from "@gameCore/types";
import { useGameContext } from "@context/GameContext";
import { Grid } from "./Grid";
import { ButtonPlunge } from "./Buttons";
import Score from "./Score";
import { OverlayRouter } from "./Overlays";
import TouchLayout from "./TouchLayout";

export default function PinballTable({ width = 384, height = 560 }) {
  const downKeys = useDownKeys();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const pinballRef = useRef<Pinball | null>(null);

  const { gameInfo } = useGameContext() || {};

  /* helper grid for locating elements */
  const showGrid = false;
  // tick
  useAnimationFrame(() => {
    globals.world.step(1 / 60);
    globals.world.clearForces(); //???

    render(ctxRef.current as CanvasRenderingContext2D);

    if (downKeys["ArrowLeft"]) {
      pinballRef.current?.moveLeftFlipper(-22);
    } else {
      pinballRef.current?.moveLeftFlipper(10);
    }

    if (downKeys["ArrowRight"]) {
      pinballRef.current?.moveRightFlipper(22);
    } else {
      pinballRef.current?.moveRightFlipper(-10);
    }
  }, gameInfo?.runningMode);

  /* create pinball core */
  useEffect(() => {
    if (!pinballRef.current) {
      pinballRef.current = createPinball();

      ctxRef.current = (canvasRef.current as HTMLCanvasElement).getContext(
        "2d"
      );
      (ctxRef.current as CanvasRenderingContext2D).scale(2, 2);
    }

    return () => {
      pinballRef.current?.removeContactListener();
    };
  }, [width, height]);



  if (!gameInfo) return null;

  return (
    <div
      className="PinballTable"
      style={{ width, height, position: "relative", margin: "0 auto" }}
    >
      {showGrid && <Grid />}
      
      <ButtonPlunge
        onPlunge={() => {
          pinballRef.current?.plunge();
        }}
      />

      <TouchLayout />

      {<OverlayRouter content={gameInfo.runningMode === "stopped" ? "gameover" : undefined} />}
      <Score />

      <canvas
        ref={canvasRef}
        width={width * 2}
        height={height * 2}
        style={{ width, height }}
      />

    </div>
  );
}
