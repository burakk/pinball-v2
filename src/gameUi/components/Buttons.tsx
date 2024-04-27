import { ButtonProps } from "@gameCore/types";
import styles from "./Buttons.module.css";
import { useState } from "react";

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

export const ButtonPlunge = ({ onPlunge }) => {
  const [active, setActive] = useState(true);
  return (
    <Button
      onClick={() => {
        setActive(!active);
        onPlunge();
      }}
      className={`${styles.ButtonPlunge} ${!active && styles.ButtonPlungeOff}`}
      style={{ zIndex: 1003 }}
    />
  );
};
