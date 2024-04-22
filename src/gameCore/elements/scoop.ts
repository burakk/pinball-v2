import { globals } from "@gameConfig/globals"
import { Chain } from "planck";
import { FF } from "@gameCore/types";

export const createScoops = () => {
    const { gameElements } = globals;

    for (const scoop of gameElements.scoops) {
        const body = globals.world.createBody();

        const f: FF = body.createFixture({
            shape: Chain(scoop.coordinates, false),
        });

        f.setUserData({ gameElementType: "SCOOP" });
    }
}