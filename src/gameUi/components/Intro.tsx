import { PropsWithRef } from "react";
import intro from "../../assets/videos/intro.mp4";
import poster from "@assets/images/biker-80.jpg"

export default function Intro(props: PropsWithRef<HTMLVideoElement> & { action: () => void }) {
  return (
    <video

      onTimeUpdate={() => {

        if (props.ref.current.currentTime > 7.3) {

          props.action();

        }
      }}
      ref={props.ref}
      src={intro}
      style={{ position: "absolute", top: 0, left: 0, zIndex: -1 }}
      poster={poster}
    />
  );
}
