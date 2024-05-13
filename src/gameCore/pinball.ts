import { Body, Contact, Vec2 } from "planck";
import {
  createBalls,
  holdBall,
  plunge,
  throwBall,
} from "@gameCore/elements/ball";
import { createLanes, createChainLanes } from "./elements/lane";
import {
  createChainBumpers,
  createCircleBumpers,
} from "@gameCore/elements/bumper";
import { createParticleFx } from "@gameCore/effects/effect";
import { createFlippers } from "@gameCore/elements/flipper";
import { globals, credits } from "@gameConfig/globals";
import { initTick } from "./tick";
import { BodyUserData, FF, GameElementUserData, GameInfo } from "./types";
import { createSlingShots } from "./elements/slingShot";
import { createScoops } from "./elements/scoop";
import { createSensors } from "./elements/sensor";
import { checkEndOfGame, manageLevels } from "./score/levels";
import { createTubes } from "./elements/tube";
import {
  toneWork,
  playCircleBumperSound,
  playChainBumperSound,
  playTubeSound,
  playScoopLockSound,
} from "./audio/toneWorks";

const gameInfo: GameInfo = {
  totalScore: 0,
  score: 0,
  hitTarget: "",
  runningMode: "paused",
  levelFalseBall: false,
  level: 0,
  contactedTypes: "",
};

let eventGameInfo: CustomEvent;
let balls: Body[];
let chainLaneFixtures: FF[];
let pFx: null | Vec2 = null;

export function createPinball() {
  eventGameInfo = new CustomEvent("onGameInfo", { detail: gameInfo });
  //flippers
  const [moveLeftFlipper, moveRightFlipper] = createFlippers();
  createChainBumpers();
  createCircleBumpers();
  createLanes();
  chainLaneFixtures = createChainLanes();
  createSlingShots();
  createScoops();
  createSensors();
  createTubes();
  //initial ball
  balls = createBalls();
  //sound
  const permitSoundWithUserClick = toneWork();
  //audioContext is not allowed until  user's first click
  document.addEventListener(
    "click",
    async () => {
      await permitSoundWithUserClick();
    },
    { once: true }
  );

  /*
  globals.world.on("remove-fixture", function (obj) {
    //obj.ui && obj.ui.remove();
  });

  globals.world.on("remove-joint", function (obj) {
    //obj.ui && obj.ui.remove();
  });
  */

  globals.world.on("begin-contact", (contact) => {
    handleContact(contact);
  });

  globals.world.on("pre-solve", (contact) => {
    handlePreSolve(contact);
  });

  initTick(handleTick);

  return {
    plunge: plunge(balls[0]),
    moveLeftFlipper,
    moveRightFlipper,
    removeContactListener,
  };
}

function removeContactListener() {
  globals.world.off("begin-contact", handleContact);
}

function handleContact(contact: Contact) {
  const fixtureA: FF = contact.getFixtureA();
  const fixtureB: FF = contact.getFixtureB();

  const contactedBall = fixtureB.getBody();
  const {
    gameElementType: aType,
    id: aId,
    bonus: bonusA,
    midPoint,
  } = fixtureA.getUserData() as GameElementUserData;
  const { gameElementType: bType } =
    fixtureB.getUserData() as GameElementUserData;

  gameInfo.contactedTypes = aType + bType;

  if (aType === "CHAIN-BUMPER") {
    playChainBumperSound();
  }

  if (aType === "CIRCLE-BUMPER") {
    playCircleBumperSound();
    changeScore(fixtureA.bumperId, credits.bumper);
  }
  // *** Drain *** //
  if (aId === "sensor-left-drain" || aId === "sensor-right-drain") {
    holdBall(contactedBall, Vec2(12.0, 32.0), () => {
      throwBall(contactedBall, Vec2(0.8, -10.0));
    });
  }

  if (aId === "sensor-gameover") {
    holdBall(
      contactedBall,
      (fixtureB.getUserData() as GameElementUserData).initPosition,
      () => {
        if (checkEndOfGame(balls)) gameInfo.runningMode = "stopped";
        window.dispatchEvent(eventGameInfo);
      }
    );
  }

  if (aType === "TUBE-SENSOR-IN") {
    const v = contactedBall.getLinearVelocity();
    //const contactedBallPos = contactedBall.getPosition();
    const ang =
      Math.atan2(midPoint.y - v.y, midPoint.x - v.x) * (180 / Math.PI);
    console.log(ang);

    if (v.y < 0.0 && ang < 117 && ang > 66) {
      playTubeSound();
      //speed up in tube
      contactedBall.applyLinearImpulse(Vec2(v.x * 2, v.y * 2), Vec2(0, 0));
      fixtureA.getBody().getUserData().toggleTubeWalls(chainLaneFixtures);
    }
  }

  if (aType === "TUBE-SENSOR-OUT") {
    fixtureA.getBody().getUserData().toggleTubeWalls(chainLaneFixtures);
  }

  // *** Bonus *** //
  if (aId === "sensor0") {
    if (bonusA.state === "active") {
      playScoopLockSound();
      bonusA.lock(contactedBall).then(() => {
        changeScore("sonsor0", 50);
      });
    }
  }

  // *** Bonus *** //
  if (aId === "sensor1") {
    if (bonusA.state === "active") {
      playScoopLockSound();
      bonusA.lock(contactedBall).then(() => {
        changeScore("sonsor0", 50);
      });
    }
  }

  //manage level
  manageLevels(gameInfo.totalScore, balls);

  // Effects

  if (aType === "CHAIN-BUMPER" || aType === "CIRCLE-BUMPER") {
    pFx = contactedBall.getPosition();
  }

  window.dispatchEvent(eventGameInfo);
}

/* --- PRE-SOLVE --- */

function handlePreSolve(contact: Contact) {
  const fixtureA: FF = contact.getFixtureA();
  const fixtureB: FF = contact.getFixtureB();

  const contactedBall = fixtureB.getBody();
  const { gameElementType: aType, midPoint } =
    fixtureA.getUserData() as GameElementUserData;

  if (aType === "TUBE-SENSOR-IN") {
    const contactedBallPos = contactedBall.getPosition();
    const ang = Math.atan2(
      contactedBallPos.y - midPoint.y,
      contactedBallPos.x - midPoint.y
    );
    console.log(ang);
    const v = contactedBall.getLinearVelocity();
    // //console.log(fixtureA.getAABB(0), fixtureB.getAABB(0).lowerBound);
    // //console.log(leftLimitSensor, "****", aType);
    const normal = contact.getWorldManifold().normal;
    const normalAngleDeg = (Math.atan2(normal.y, normal.x) * 180) / Math.PI;
    console.log((Math.atan2(normal.y, normal.x) * 180) / Math.PI);
    console.log(contact.getWorldManifold());
    fixtureA.setFilterCategoryBits(0);

    if (normalAngleDeg > 68 && normalAngleDeg < 107) {
      //speed up in tube

      contactedBall.applyLinearImpulse(Vec2(v.x * 2, v.y * 2), Vec2(0, 0));
      fixtureA.getBody().getUserData().toggleTubeWalls(chainLaneFixtures);
    }
  }
}

function handleTick() {
  if (pFx) {
    createParticleFx(pFx, 4);
    pFx = null;
  }

  for (const [index, b] of globals.willBeRemovedParticles.entries()) {
    if (b.getPosition().y > (b.getUserData() as BodyUserData).decayY) {
      globals.world.destroyBody(b);
      globals.willBeRemovedParticles.splice(index, 1);
    }
  }
}

function changeScore(id?: string, score = 3) {
  gameInfo.totalScore = gameInfo.totalScore + score;
  return id;
  //const level = checkLevel(gameInfo.totalScore, gameInfo.level);
}
