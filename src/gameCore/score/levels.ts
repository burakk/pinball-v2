import { levels } from "@gameConfig/globals";
import { plungeSimple } from "@gameCore/elements/ball";
import { Body } from "planck";

let level = 0;


export function manageLevels(currentScore: number, balls: Body[]) {
    if (currentScore > levels[1].requiredScore && level === 0  ) {
        //two balls
        level = 1;
       plungeSimple(balls[2]);
    }

    if (currentScore > levels[2].requiredScore && level === 1 ) {
        //three balls
        level = 2;
        plungeSimple(balls[1]);
        plungeSimple(balls[2]);
      
    }
}


export function checkEndOfGame(balls: Body[]){
    return balls.every((ball)=>!ball.isActive());
}