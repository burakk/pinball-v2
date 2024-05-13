import { Edge } from "planck";
import { globals } from "@gameConfig/globals";

export const drawEdge = function (ctx: CanvasRenderingContext2D, edge: Edge, color?:string) {

	const { scaleCanvas } = globals;

	const ratio = 1;

	const v1 = edge.m_vertex1;
	const v2 = edge.m_vertex2;

	ctx.scale(ratio, ratio);
	ctx.beginPath();
	ctx.moveTo(v1.x * scaleCanvas, v1.y * scaleCanvas);
	ctx.lineTo(v2.x * scaleCanvas, v2.y * scaleCanvas);



	ctx.lineCap = 'round';
	ctx.lineWidth = 1;
	ctx.strokeStyle =  color || "white";
	ctx.stroke();

};



