import { Chain } from "planck";
import { globals } from "@gameConfig/globals";

const elasticProps = {
  restitution: 0.9,
  friction: 0,
  damping: 0,
};

export function createSlingShots() {
  const { gameElements, world } = globals;


  for (const s of gameElements.slingshots) {
    const sBody = world.createBody();
    const f = sBody.createFixture(
      {
        shape: Chain(s.coordinates, true),
        ...elasticProps,
      }
    )
    f.setUserData({ gameElementType: "slingShot" });
  }
  /*
    const slingshotL = world.createBody();
    slingshotL.createFixture({
      shape: Polygon([
        Vec2(-2.9, -4.8),
        Vec2(-2.9, -6.7),
        Vec2(-1.7, -7.4),
        Vec2(-1.7, -7.0),
        Vec2(-2.6, -5.0),
      ]),
      ...elasticProps,
    });
    //slingshotL.render = { stroke: obstacleColor };
  
    const slingshotR = world.createBody();
    slingshotR.createFixture({
      shape: Polygon([
        Vec2(2.9, -4.8),
        Vec2(2.9, -6.7),
        Vec2(1.7, -7.4),
        Vec2(1.7, -7.0),
        Vec2(2.6, -5.0),
      ]),
      ...elasticProps,
    });
    */
  //slingshotR.render = { stroke: obstacleColor };
}


