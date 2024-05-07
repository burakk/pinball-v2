import { Vec2 } from "planck";

export function translateElement(coordinates: Vec2[], moveBy: { x: number, y: number }):Vec2[]{

    for (const c of coordinates) {
        c.x += moveBy.x;
        c.y += moveBy.y;
    }

    return coordinates;
}