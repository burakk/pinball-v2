import { levels } from "@gameConfig/globals";
import { plunge } from "@gameCore/elements/ball";
import { Body } from "planck";

let level = 0;

export function manageLevels(currentScore: number, balls: Body[]) {
    if (currentScore > levels[1].requiredScore && level !== 1) {
        //two balls
        level = 1;
        plunge(balls[2])();
       
    }

    if (currentScore > levels[2].requiredScore && level !== 2 ) {
        //three balls
        level = 2;
        balls[1].setActive(true);
        balls[2].setActive(true);
      
    }
}


export function checkEndOfGame(balls: Body[]){
    return balls.every((ball)=>!ball.isActive());
}