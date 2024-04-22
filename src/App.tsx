
import { Layout } from "./pages/Layout";


import "./App.css";
import { GameContextProvider } from "./context/GameContext";

function App() {
  return (
    <GameContextProvider>

      <Layout>

      </Layout>


    </GameContextProvider>
  );
}

export default App;
