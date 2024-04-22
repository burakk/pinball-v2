import { RevoluteJoint } from "planck";
import { globals } from "@gameConfig/globals";
import flipperUrl from "../assets/images/flipper.svg";



const flipperImg = new Image();
flipperImg.src = flipperUrl;

export const drawFlipper = function (joint: RevoluteJoint, ctx: CanvasRenderingContext2D) {

    const { scaleCanvas } = globals;

    const ratio = 1;

    const { isMirrored } = joint.getUserData();
    const jointAngle = joint.getJointAngle();
    const a = joint.getBodyB().getPosition();
    const aSx = a.x * scaleCanvas;
    const aSy = a.y * scaleCanvas;
    const length = 4.0 * scaleCanvas;
    const flipperH = 0.2 * scaleCanvas;


    const [x1, y1] = rotatePoint(aSx, aSy, aSx, aSy, jointAngle);

    const [x2, y2] = rotatePoint(aSx, aSy, aSx + length, aSy, jointAngle);

    const [x3, y3] = rotatePoint(aSx, aSy, aSx + length, aSy + flipperH, jointAngle);

    const [x4, y4] = rotatePoint(aSx, aSy, aSx, aSy + flipperH, jointAngle);

    ctx.scale(ratio, ratio);
    drawRotatedImage(flipperImg, aSx, aSy, jointAngle, ctx, isMirrored);

    //flipper graphic

    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x3, y3);
    ctx.lineTo(x4, y4);

    ctx.closePath();

    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.lineWidth = 0.5;
    // ctx.strokeStyle = "red";
    ctx.stroke();
};


function rotatePoint(cx: number, cy: number, x: number, y: number, angle: number) {

    const cos = Math.cos(angle),
        sin = Math.sin(-angle),
        nx = (cos * (x - cx)) + (sin * (y - cy)) + cx,
        ny = (cos * (y - cy)) - (sin * (x - cx)) + cy;
    return [nx, ny];
}




function drawRotatedImage(image, x: number, y: number, angle: number, ctx, isMirrored: Boolean) {
    // save the current co-ordinate system 
    // before we screw with it
    ctx.save();

    // move to the middle of where we want to draw our image
    ctx.translate(x, y);

    // rotate around that point, converting our 
    // angle from degrees to radians 
    ctx.rotate(angle);

    if (isMirrored) {

        ctx.scale(-1, 1);

    }

    // draw it up and to the left by half the width
    // and height of the image 
    ctx.drawImage(image, !isMirrored ? 0 : -image.width, 0);

    // and restore the co-ords to how they were when we began
    ctx.restore();
}

