import { Chain, Vec2, World } from "planck";



export function createGround(world: World, groundAnchors: Vec2[]) {
  const ground = world.createBody();

  const f = ground.createFixture(Chain(groundAnchors, true), 0.0);

  f.setUserData({ gameElementType: "GROUND" });

  // ground.createFixture({
  //   shape: Edge(Vec2(0, 1), Vec2(0.2, 2)),
  //   ...elasticProps,
  // });

  return ground;
}