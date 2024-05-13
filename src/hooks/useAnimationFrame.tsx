import { useEffect, useRef, useCallback } from "react";
import { runningState } from "../gameCore/types";

export function useAnimationFrame(
  handleAnimate: () => void,
  runningState: runningState = "started"
) {
  const frameRef = useRef(0);

  const animate = useCallback(() => {
    handleAnimate();
    frameRef.current = requestAnimationFrame(animate);
  }, [handleAnimate]);
  /*
        function animate(timeStep) {
            //console.log(timeStep)
            handleAnimate();
            frameRef.current = requestAnimationFrame(animate)
        }
        */

  useEffect(() => {
    if (runningState === "started") {
      frameRef.current = requestAnimationFrame(animate);
    }

    return () => cancelAnimationFrame(frameRef.current);
  }, [runningState, animate]);
}
