export function translateElement(coordinates: { x: number, y: number }[], moveBy: { x: number, y: number }) {

    for (let c of coordinates) {
        c.x += moveBy.x;
        c.y += moveBy.y;
    }

    return coordinates;
}