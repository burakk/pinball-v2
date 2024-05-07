import { globals } from "@gameConfig/globals";
import { Body, Circle, Vec2 } from "planck";
import { FF } from "@gameCore/types";


export function createBalls() {
  const { balls } = globals.gameElements;

  return balls.map(({ initPosition }: { initPosition: Vec2 }) => {
    const ball = globals.world.createBody({
      type: "dynamic",
      bullet: true,
      active: false,
    });
    const f: FF = ball.createFixture(Circle(0.32), 1.0);
    f.setUserData({ gameElementType: "BALL", fillColor: "white", initPosition });
    ball.setPosition(initPosition);
    return ball;
  });

}

export function plungeSimple(ball: Body) {
    ball.setActive(true);
    ball.applyLinearImpulse(Vec2(0.8, -40), ball.getWorldCenter());
  
}

export function plunge(ball: Body) {
  return () => {
    ball.setActive(true);
    ball.applyLinearImpulse(Vec2(0.8, -40), ball.getWorldCenter());
  }
}

export function holdBall(ball: Body, holdPosition?: Vec2, callAfterHold?: () => void) {



  setTimeout(() => ball.setActive(false), 1);



  if (holdPosition) {
    setTimeout(() => {
      ball.setPosition(holdPosition);
      callAfterHold && callAfterHold();
    }, 10);

  }


}

export function throwBall(ball: Body, impulse = Vec2(-0.5, 3.0)) {
  ball.setActive(true);
  ball.applyLinearImpulse(impulse, Vec2(0, 0));
}









