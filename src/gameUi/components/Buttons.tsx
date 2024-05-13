import { ButtonProps } from "@gameCore/types";
import styles from "./Buttons.module.css";
import { useState } from "react";
import { playPlungerSound } from "@gameCore/audio/toneWorks";

export const Button = ({
  id,
  onClick,
  children,
  className = styles.Button,
  style,
}: ButtonProps) => {
  return (
    <>
      <button id={id} className={className} onClick={onClick} style={style}>
        {children}
      </button>
    </>
  );
};

export const ButtonPlunge = ({ onPlunge }: { onPlunge: () => void }) => {
  const [active, setActive] = useState(true);
  return (
    <Button
      onClick={() => {
        playPlungerSound();
        setActive(!active);
        onPlunge();
      }}
      className={`${styles.ButtonPlunge} ${!active && styles.ButtonPlungeOff}`}
    />
  );
};
