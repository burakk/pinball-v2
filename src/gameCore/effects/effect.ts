import { Vec2 } from "planck";
import { globals } from "@gameConfig/globals";
import { Circle } from "planck";
import { FF } from "@gameCore/types";




export function createParticleFx(position: Vec2, countMax = 1) {


  for (let p = 0; p < countMax; p++) {
    position.x = position.x + Math.random();
    position.y = position.y + Math.random();
    const particleBody = globals.world.createBody({
      type: "dynamic",
      position,

    });
    particleBody.setUserData({ decayY: position.y + 2 })
    const pF: FF = particleBody.createFixture(Circle(0.1), 1.0);

    pF.type = "particle";
    pF.setFilterCategoryBits(0);

    particleBody.applyLinearImpulse(
      Vec2(0.04, -0.07),
      Vec2(0, 0)
    );

    globals.willBeRemovedParticles.push(particleBody);

  }


}

export function loadGifFxImages(gifFxList: { path: string, x: string, y: string }[]): HTMLImageElement[] {


  const pinballTableEl = document.querySelector("body");

  return gifFxList.map((gif) => {
    const img = new Image();
    img.src = gif.path;
    img.style.position = "absolute";
    img.style.top = gif.y;
    img.style.left = gif.x;
    img.style.display = "none";
    pinballTableEl?.append(img);
    return img;
  })


}