import { globals } from "@gameConfig/globals";
import { Box, RevoluteJoint } from "planck";

const defaultJointProps = {
  enableMotor: true,
  maxMotorTorque: 1200.0,
  enableLimit: true,
  motorSpeed: 0.2,
};


export function createFlippers() {

  const moveFlipperJointList = [];

  for (const { bodyCoordinate, attributes, jointProps, boxCenter, isMirrored, id } of globals.gameElements.flippers) {


    const flipperBody = globals.world.createDynamicBody({ position: bodyCoordinate });

    //planck.js (box2d) box params half width, half height, center 
    const f = flipperBody.createFixture(Box(attributes.hX, attributes.hY, boxCenter), 1.0);
    //flipperFixture.render = { fill: 'white', stroke: 'white' };
    const flipperJoint = RevoluteJoint(
      {
        ...defaultJointProps,
        ...jointProps,
        collideConnected: false,
        userData: { isMirrored }
      },
      globals.ground,
      flipperBody,
      jointProps.anchor,


    );

    f.setUserData({ gameElementType: "flipper", id })

    globals.world.createJoint(flipperJoint);

    moveFlipperJointList.push(moveFlipper(flipperJoint));

  }

  return moveFlipperJointList;
}

export function moveFlipper(flipperJoint: RevoluteJoint,) {


  return (motorSpeed = 0) => {

    if (flipperJoint) {

      flipperJoint.setMotorSpeed(motorSpeed);

    }
  }



}


