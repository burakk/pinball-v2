import { globals } from "@gameConfig/globals";
import { Circle, Chain, } from "planck";
import { FF } from "@gameCore/types";



export function createChainBumpers() {

  const { gameElements, world } = globals;


  for (const bumper of gameElements.chainBumpers) {
    const body = world.createBody();
    const f = body.createFixture(
      {
        shape: Chain(bumper.coordinates, true),
        ...bumper.props,
      }
    )

    f.setUserData({ gameElementType: "CHAIN-BUMPER" });
  }
}


export function createCircleBumpers() {
  for (const cB of globals.gameElements.circleBumpers) {
    const body = globals.world.createBody({
      position: cB.position,
    });

    const f: FF = body.createFixture({
      shape: Circle(1.0),
      ...cB.props,
    });

    f.setUserData({ gameElementType: "CIRCLE-BUMPER" });

  }

}

