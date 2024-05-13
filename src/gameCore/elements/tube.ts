import { globals } from "@gameConfig/globals"
import { FF } from "@gameCore/types";
import { Chain, Edge, Vec2 } from "planck";

export function createTubes() {

    const { tubes } = globals.gameElements;
    const body = globals.world.createBody();
    for (const tube of tubes) {

        const wall1: FF = body.createFixture({
            shape: Chain(tube.coordinates[0]),
        });

        const wall2: FF = body.createFixture({
            shape: Chain(tube.coordinates[1]),
        });


        wall1.setUserData({ gameElementType: "TUBE-WALL" });

        wall2.setUserData({ gameElementType: "TUBE-WALL" });

        wall1.setFilterCategoryBits(0);
        wall2.setFilterCategoryBits(0);


        const [w1Coords, w2Coords] = tube.coordinates;

        const w1coordsStart = w1Coords[w1Coords.length - 1];
        const w2coordsStart = w2Coords[w2Coords.length - 1];


        const inSensorMidPoint = Vec2((w2coordsStart.x + w1coordsStart.x) * 0.5, (w2coordsStart.y + w1coordsStart.y) * 0.5);

        const inSensor: FF = body.createFixture({
            shape: Edge(
                Vec2(w1coordsStart.x + 0.3, w1coordsStart.y - 0.2),
                Vec2(w2coordsStart.x - 0.4, w2coordsStart.y - 0.09),
            ),
            isSensor: true,
        });


        const outSensor: FF = body.createFixture({
            shape: Edge(
                w1Coords[0],
                w2Coords[0]
            ),
            isSensor: true,
        });

        inSensor.setUserData({ gameElementType: "TUBE-SENSOR-IN", midPoint: inSensorMidPoint,color:"rgba(200, 200, 0, 0.5)" });
        outSensor.setUserData({ gameElementType: "TUBE-SENSOR-OUT", color:"rgba(200, 200, 0, 0.1)" });


        body.setUserData({ gameElementType: "TUBE", toggleTubeWalls: toggleTubeWalls(wall1, wall2) });
    }

}


function toggleTubeWalls(wall1: FF, wall2: FF) {

    return (willBeInactivated: FF[]) => {
        const isActive = wall1.getFilterCategoryBits();

        if (!isActive) {
            wall1.setFilterCategoryBits(1);
            wall2.setFilterCategoryBits(1);


            for (const wBi of willBeInactivated) wBi.setFilterCategoryBits(0);
            return;
        }

        wall1.setFilterCategoryBits(0);
        wall2.setFilterCategoryBits(0);

        for (const wBi of willBeInactivated) wBi.setFilterCategoryBits(1);

    }

}