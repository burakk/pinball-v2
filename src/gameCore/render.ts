import { drawFlipper } from "@gameCore/graphics/drawFlipper";
import { drawParticle } from "@gameCore/graphics/drawParticle";
import { globals } from "@gameConfig/globals";
import { Edge, Polygon, RevoluteJoint } from "planck";
import { FF, GameElementUserData } from "@gameCore/types";
import { drawChain } from "./graphics/drawChain";
import { drawCircle } from "./graphics/drawCircle";
import { drawEdge } from "./graphics/drawEdge";

// ---  RENDER WORLD  ---
export const render = function (ctx: CanvasRenderingContext2D) {
  ctx.clearRect(0, 0, 600, 1000);

  //Render Body
  for (let b = globals.world.getBodyList(); b; b = b.getNext()) {
    for (let f: FF | null = b.getFixtureList(); f; f = f.getNext()) {
      const shape = f.getShape();
      const fixtureColor = f.getUserData()?.color;

      const { gameElementType, bonus, fillColor, fxGif } =
        (f.getUserData() as GameElementUserData) || ({} as GameElementUserData);

      if (f.type === "particle") {
        drawParticle(ctx, b.getPosition());
        continue;
      }

      switch (gameElementType) {
        case "CIRCLE-BUMPER":
        case "BALL":
          drawCircle(shape, ctx, b.getPosition(), fillColor);
          break;
        case "CHAIN-LANE":
        case "CHAIN-BUMPER":
        case "GROUND":
        case "SCOOP":
        case "TUBE-WALL":
          drawChain(ctx, shape as Polygon);
          break;
        case "LANE":
        case "EDGE-SENSOR":
        case "TUBE-SENSOR-OUT":
        case "TUBE-SENSOR-IN":
          drawEdge(ctx, shape as Edge, fixtureColor);
          break;
        case "CENTRAL-SENSOR":
        case "SCOOP-SENSOR":
          if (bonus?.state !== "inactive") {

            fxGif.style.display = "block";

          } else {
            fxGif.style.display = "none";
          }
          drawCircle(
            shape,
            ctx,
            shape.m_p,
            bonus?.state !== "inactive" ? "rgba(227, 188, 226, 0.4)" : undefined,
            fixtureColor,
          );
          break;
      }
    }
  }

  //Render Joint
  for (let j = globals.world.getJointList(); j; j = j.getNext()) {
    drawFlipper(j as RevoluteJoint, ctx);
  }
};
