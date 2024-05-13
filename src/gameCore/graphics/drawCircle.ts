import { Shape, Vec2 } from "planck";
import { globals } from "@gameConfig/globals";


export const drawCircle = function (shape: Shape, ctx: CanvasRenderingContext2D, pos: Vec2, fillColor?: string, color?:string) {

    const { scaleCanvas } = globals;

    const lW = 1;
    const r = (shape.m_radius * scaleCanvas) - lW * 0.5;
    const cx = pos.x * scaleCanvas;
    const cy = pos.y * scaleCanvas;

    //ctx.scale(ratio, ratio);

    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, 2 * Math.PI);

    //ctx.lineTo(cx, cy);
    ctx.lineWidth = lW; // options.lineWidth;
    if (fillColor) {
        ctx.fillStyle = fillColor
        ctx.fill();
    }

    ctx.strokeStyle = color || "#fff";
    //ctx.strokeStyle = "red"; // options.strokeStyle;
    ctx.stroke();

    //ctx.strokeRect(10, 10, 100, 100);

};






