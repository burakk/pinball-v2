import PinballTable from "@gameUi/components/PinballTable";

import { NavFooter } from "../gameUi/components/Navs";
import { useImagePreloader } from "@hooks/UsePreloader";
import flipperUrl from "../assets/images/flipper.svg";
import gifFx1 from "../assets/images/fx-1.gif";
import LogoMain from "@gameUi/components/LogoMain";

export const Layout = ({ children }: { children?: React.ReactNode }) => {
  const gameImages = [flipperUrl, gifFx1];
  const isOk = useImagePreloader(gameImages);

  if (!isOk) return "loading";
  return (
    <>
      <main>
        <PinballTable />
        {children}
      </main>
      <footer>
        <dialog>
          <NavFooter />
        </dialog>
        <LogoMain />
      </footer>
    </>
  );
};
