import { holdBall, throwBall } from "@gameCore/elements/ball";
import { Body } from "planck";

//inactiveDuration = 10000, activeDuration = 7000, lockDuration = 2000

export function attachLockBonus(activeDuration = 7000, lockDuration = 2000) {
  const rVal = { state: "inactive", lock };

  let timeoutRef: number;

  async function startLifeCycle() {
    const inactiveDuration = Math.random() * 8000 + 14000;

    setTimeout(() => {
      rVal.state = "active";

      timeoutRef = setTimeout(() => {
        rVal.state = "inactive";
        startLifeCycle();
      }, activeDuration);
    }, inactiveDuration);
  }

  async function lock(ball: Body) {
    rVal.state = "busy";
    holdBall(ball);
    clearTimeout(timeoutRef);
    setTimeout(() => {
      throwBall(ball);
      rVal.state = "inactive";
      startLifeCycle();
    }, lockDuration);
  }

  startLifeCycle();

  return rVal;
}
