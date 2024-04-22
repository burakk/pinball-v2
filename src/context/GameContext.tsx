import {
  Dispatch,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useReducer,
} from "react";

import { GameInfo } from "@gameCore/types";
import { useSoundEffect } from "audio/hooks/useSoundEffect";

type action = {
  type: "started" | "paused" | "stopped" | "scoreChanged";
  payload?: number;
};

const GameContext = createContext<null | {
  gameInfo: GameInfo;
  dispatch: Dispatch<action>;
}>(null);

function gameReducer(gameInfo: GameInfo, action: action): GameInfo {
  switch (action.type) {
    case "started": {
      return { ...gameInfo, runningMode: "started" };
    }
    case "stopped": {
      return { ...gameInfo, runningMode: "stopped" };
    }
    case "paused": {
      return { ...gameInfo, runningMode: "paused" };
    }
    case "scoreChanged": {
      return { ...gameInfo, totalScore: 0 ?? action.payload };
    }
    default:
      return gameInfo;
  }
}

export function GameContextProvider({ children }: { children: ReactNode }) {
  const [gameInfo, dispatch] = useReducer(gameReducer, {
    runningMode: "started",
    bonusMode: "noBonus",
    totalScore: 0,
  });

  const playSoundEffect = useSoundEffect();

  useEffect(() => {
    function handleGameInfoChange(info: GameInfo) {
      if (gameInfo.totalScore !== info.totalScore) {
        dispatch({
          type: "scoreChanged",
          payload: info.totalScore,
        });

        if (info.contactedTypes?.includes("CIRCLE-BUMPER")) {
          playSoundEffect && playSoundEffect();
        }
      }

      if (info.runningMode == "stopped") {
        dispatch({
          type: "stopped",
        });
      }
    }
    window.addEventListener("onGameInfo", (e: Event) => {
      handleGameInfoChange((e as CustomEvent).detail);
    });

    return () => {
      //window.removeEventListener("onGameInfo");
    };
  }, []);

  return (
    <GameContext.Provider value={{ gameInfo, dispatch }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGameContext() {
  return useContext(GameContext);
}
