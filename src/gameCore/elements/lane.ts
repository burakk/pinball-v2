import { globals } from "@gameConfig/globals";
import { Chain, Vec2 } from "planck";
import { FF } from "@gameCore/types";
import { Edge } from "planck";

export const createLanes = () => {


    for (const [laneStart, laneEnd] of globals.gameElements.lanes) {
        const laneBody = globals.world.createBody({
            position: Vec2(0, 0),
        });

        const f: FF = laneBody.createFixture({
            shape: Edge(laneStart, laneEnd),
        });

        f.setUserData({ gameElementType: "LANE", gameElementId: "LANE" });

    }

}


export const createChainLanes = () => {

    const chainLaneFixtures = [];
    const { gameElements } = globals;

    for (const cL of gameElements.chainLanes) {
        const body = globals.world.createBody();

        const f: FF = body.createFixture({
            shape: Chain(cL.coordinates, cL.loop),
        });

        f.setUserData({ gameElementType: "CHAIN-LANE" });
        chainLaneFixtures.push(f);

    }

    return chainLaneFixtures;


}