
import { ComponentPropsWithoutRef } from "react";


import { Fixture, World, Body, Vec2, } from "planck";

export type FF = {
  id?: string | number;
  bumperId?: string;
  type?: "bumper" | "ball" | "particle";
} & Fixture;


export type Globals = { world: World; ground: Body; scaleCanvas: number; gameElements: any; willBeRemovedParticles: Body[] }


export type Pinball = {
  plunge: () => void;
  moveLeftFlipper: (motorSpeed?: number) => void;
  moveRightFlipper: (motorSpeed?: number) => void;
  removeContactListener: () => void;
};


export type shapeOptions = { lineWidth: number }


export type BodyUserData = { decayY: number }



export type FlipperJointProps = { lowerAngle: number, upperAngle: number }

export interface GameInfoEvent extends Event {
  detail: GameInfo;
}

export type GameInfo = {
  totalScore: number,
  score?: number,
  hitTarget?: string,
  runningMode: "stopped" | "started" | "paused";
  levelFalseBall?: boolean,
  level?: number,
  bonusMode?: null | string,
  contactedTypes?: string,
};



export type GameElementTypes = "CHAIN-BUMPER" | "CIRCLE-BUMPER" | "LANE" | "BALL" | "GROUND" | "CHAIN-LANE" | "SCOOP" | "CENTRAL-SENSOR" | "SCOOP-SENSOR" | "EDGE-SENSOR" | "TUBE-WALL" | "TUBE-SENSOR-IN" | "TUBE-SENSOR-OUT";


export type GameElementUserData = {
  gameElementType: GameElementTypes,
  id: string,
  bonus: { state: 'inactive' | 'active' | 'busy', lock: (ball: Body) => Promise<void> },
  fillColor?: string,
  initPosition?: Vec2,
}

export interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  color?: string,
}


export type runningState = "started" | "paused" | "stopped";