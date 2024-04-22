import { Vec2 } from "planck";
import { globals } from "@gameConfig/globals";

export const drawParticle = function (ctx: CanvasRenderingContext2D, pos: Vec2) {

	const { scaleCanvas } = globals;

	const cx = pos.x * scaleCanvas;
	const cy = pos.y * scaleCanvas;

	//ctx.scale(ratio, ratio);

	ctx.beginPath();

	ctx.moveTo(cx, cy);
	ctx.lineTo(cx + 6, cy);
	ctx.moveTo(cx + 3, cy - 3);
	ctx.lineTo(cx + 3, cy + 3);
	ctx.lineWidth = 1; // options.lineWidth;
	ctx.strokeStyle = "white"; // options.strokeStyle;
	ctx.stroke();
	//ctx.fill();
	//ctx.strokeRect(10, 10, 100, 100);


};
