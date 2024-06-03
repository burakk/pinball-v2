import { Layout } from "./pages/Layout";
import PinballTable from "@gameUi/components/PinballTable";
import { useImagePreloader } from "@hooks/UsePreloader";
import flipperUrl from "./assets/images/flipper.svg";
import gifFx1 from "./assets/images/fx_1.gif";
import starAnim from "./assets/images/star.gif";
import arrowsAnim from "./assets/images/arrows.gif";
import bgShake from "./assets/images/bg-shake.gif";

import "./App.css";
import { GameContextProvider } from "./context/GameContext";


function App() {
  const gameImages = [flipperUrl, gifFx1, starAnim, arrowsAnim, bgShake];
  const isOk = useImagePreloader(gameImages);

  if (!isOk) return "loading";

  return (
    <>

      <GameContextProvider>

        <Layout>
          <PinballTable />
        </Layout>
      </GameContextProvider>
    </>
  );
}

export default App;
