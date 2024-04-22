import { World, Vec2, Polygon, Edge, Chain } from "planck";

const elasticProps = {
  restitution: 0.9,
  friction: 0,
  damping: 0,
};

export function createKickers(world: World) {
    const barriers = world.createBody();
  
    //kicker 1
    barriers.createFixture({
      shape: Polygon([
        Vec2(-2.8, 10.1),
        Vec2(-2.8, 8.0),
        Vec2(-1.4, 9.3),
        Vec2(-1.0, 8.7),
        Vec2(-2.2, 10.2),
      ]),
      restitution: 0.0,
      friction: 5.0,
    });
    //kicker 1 elastic
    barriers.createFixture({
      shape: Edge(Vec2(-2.8, 7.9), Vec2(-1.0, 8.6)),
      ...elasticProps,
    });
  
    //kicker 2a
    barriers.createFixture(
      Chain(
        [
          Vec2(-4.6, 5.95),
          Vec2(-4.8, 5.8),
          Vec2(-3.6, 3.0),
          Vec2(-2.6, 2.0),
          Vec2(-1.4, 2.65),
        ],
        false
      ),
      0.0
    );
  
    //kicker 2b
    barriers.createFixture({
      shape: Chain(
        [
          //Vec2(-2.90, 1.95),
          //Vec2(-2.40, 2.00),
  
          Vec2(-1.4, 2.65),
          //Vec2(-2.5, 3.2),
          Vec2(-3.5, 4.6),
          Vec2(-3.85, 4.9),
          Vec2(-4.3, 5.4),
          Vec2(-4.55, 5.94),
        ],
        false
      ),
      ...elasticProps,
    });
  }