
export function rotatePoint(anchorX: number, anchorY: number, x: number, y: number, angle: number) {

    const cos = Math.cos(angle),
        sin = Math.sin(-angle),
        nx = (cos * (x - anchorX)) + (sin * (y - anchorY)) + anchorX,
        ny = (cos * (y - anchorY)) - (sin * (x - anchorX)) + anchorY;
    return [nx, ny];
}