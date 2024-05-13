import { globals } from "@gameConfig/globals";
import { attachLockBonus } from "@gameCore/score/bonus";
import { FF } from "@gameCore/types";
import { Chain, Circle, Edge } from "planck";


export function createSensors() {
  for (const s of globals.gameElements.sensors) {
    let shape;

    if (!s.shape) throw new Error("Shape is required.");

    switch (s.shape) {
      case 'circle':
        shape = Circle(s.coordinates, 0.4);
        break;
      case 'edge': {
        const [v1, v2] = s.coordinates;
        shape = Edge(v1, v2);
        break;
      }
      case 'chain':
        shape = Chain(s.coordinates);
        break;
      default:
        throw new Error('Sensor shape not known');
    }



    const sensor: FF = globals.ground.createFixture({
      shape: shape,
      isSensor: true,
    });

    sensor.setUserData({ id: s.id, gameElementType: s.gameElementType, bonus: attachLockBonus(), fxGif: s.fxGif,  color:"rgba(255, 255, 255, 0.1)"  });
  }
}
