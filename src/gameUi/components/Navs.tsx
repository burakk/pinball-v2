import { IconGithub } from "./Icons";

const NavFooter = () => {
  return (
    <nav>
      <ul>
        <li>
          The classical{" "}
          <a href="https://en.wikipedia.org/wiki/Pinball" target="_blank">
            pinball
          </a>{" "}
          game's digital version. Illustrated and coded by{" "}
        </li>

        <li>
          <a href="https://kuyucakli.com" target="_blank">
            Burak Kuyucaklı
          </a>
        </li>

        <li>
          <a href="https://github.com/burakk/pinball" target="_blank">
            <IconGithub />
          </a>
        </li>
      </ul>
    </nav>
  );
};

export { NavFooter };
