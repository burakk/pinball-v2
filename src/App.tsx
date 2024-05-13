
import { Layout } from "./pages/Layout";
import PinballTable from "@gameUi/components/PinballTable";
import { useImagePreloader } from "@hooks/UsePreloader";
import flipperUrl from "./assets/images/flipper.svg";
import gifFx1 from "./assets/images/fx-1.gif";


import "./App.css";
import { GameContextProvider } from "./context/GameContext";


function App() {
  const gameImages = [flipperUrl, gifFx1];
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
