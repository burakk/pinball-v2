import { Polygon } from "planck";
import { globals } from "@gameConfig/globals";

export const drawChain = function (ctx: CanvasRenderingContext2D, shape: Polygon, styles?:{strokeColor?:string, fillColor?:string}) {

	const { scaleCanvas } = globals
	const lw = 1;
	const ratio = 1;

	const vertices = shape.m_vertices;

	if (!vertices.length) {
		return;
	}

	ctx.scale(ratio, ratio);
	ctx.beginPath();

	for (let i = 0; i < vertices.length; ++i) {
		const v = vertices[i];
		const x = v.x * scaleCanvas + lw;
		const y = v.y * scaleCanvas + lw;
		if (i === 0) ctx.moveTo(x, y);
		else ctx.lineTo(x, y);
	}



	ctx.lineCap = 'round';
	ctx.lineWidth = 1;
	ctx.strokeStyle = "#fff";
	ctx.stroke();
	
	if(styles?.fillColor){
		ctx.fillStyle = styles.fillColor;
		ctx.fill();
	}
};