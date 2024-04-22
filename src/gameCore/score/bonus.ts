import { holdBall, throwBall } from "@gameCore/elements/ball";
import { Body } from "planck";

//inactiveDuration = 10000, activeDuration = 7000, lockDuration = 2000

export function attachLockBonus(score = 50, inactiveDuration = 10000, activeDuration = 7000, lockDuration = 2000) {


    const rVal = { state: "inactive", lock };


    let timeoutRef: number;

    async function startStateCycle() {

        setTimeout(() => {
            rVal.state = "active";

            timeoutRef = setTimeout(() => {
                rVal.state = "inactive";
                startStateCycle();
            }, activeDuration)

        }, inactiveDuration)


    }

    async function lock(ball: Body) {
        rVal.state = "busy";
        holdBall(ball);
        clearTimeout(timeoutRef);
        setTimeout(() => {
            throwBall(ball);
            rVal.state = "inactive";
            startStateCycle();
        }, lockDuration);



    }


    startStateCycle();

    return rVal;
}



