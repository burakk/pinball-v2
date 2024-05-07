
import { rotatePoint } from "./rotatePoint";
import { Vec2 } from "planck";


type Point = { x: number, y: number };

export function segmentedBezier(start: Point, cp1: Point, cp2: Point, end: Point, segments: number) {
    const points = [];

    for (let i = 0; i <= segments; i++) {
        const t = i / segments;
        const x = Math.pow(1 - t, 3) * start.x + 3 * Math.pow(1 - t, 2) * t * cp1.x + 3 * (1 - t) * Math.pow(t, 2) * cp2.x + Math.pow(t, 3) * end.x;
        const y = Math.pow(1 - t, 3) * start.y + 3 * Math.pow(1 - t, 2) * t * cp1.y + 3 * (1 - t) * Math.pow(t, 2) * cp2.y + Math.pow(t, 3) * end.y;
        points.push(Vec2(x, y));
    }
    return points;
}



export function rotatePoints(bezierPoints: Point[], rotateAngle: number) {

    const { x: anchorX, y: anchorY } = bezierPoints[0];

    return bezierPoints.map(({ x, y }) => {
        const [rX, rY] = rotatePoint(anchorX, anchorY, x, y, rotateAngle);
        return Vec2(rX, rY);
    }
    );


}


