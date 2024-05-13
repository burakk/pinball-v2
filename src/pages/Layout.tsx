
import { NavFooter } from "../gameUi/components/Navs";

import LogoMain from "@gameUi/components/LogoMain";

export const Layout = ({ children }: { children?: React.ReactNode }) => {
  
  return (
    <>
      <main>
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
