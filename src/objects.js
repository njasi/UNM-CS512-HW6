import {
  MATERIAL_SAND,
  MATERIAL_SEA_COMPLETE,
  MATERIAL_SHIP,
  MATERIAL_STONE,
  SHADER_PROGRAM_PHONG,
  SHADER_PROGRAM_WATER,
} from "./setup";

import { Scene } from "PotatoEngine";
import {
  generateGridObject,
  generateNGonPrismObject,
  generateSphereObject,
} from "PotatoEngine/src/objects";
import { generateOBJObject } from "PotatoEngine/src/objects/loaders";
import { rgb } from "PotatoEngine/src/util/color";

export const OBJECT_SEA = "seaObject";
export const OBJECT_STONE = "stone";
export const OBJECT_BEACH = "beach";
/**
 * Setup the scene
 * @param {Scene} scene
 */
export function initSceneObjects(scene) {
  scene.removeObject(OBJECT_SEA);
  let seaObject = generateGridObject(OBJECT_SEA, rgb(255, 255, 255), 200, 100);
  seaObject.materialLabel = MATERIAL_SEA_COMPLETE;
  seaObject.position = [0, 0, -30];
  scene.addObject(seaObject, SHADER_PROGRAM_WATER);

  for (let i = 0; i < 10; i++) {
    let stonePillar = generateNGonPrismObject(
      OBJECT_STONE + "_" + i,
      rgb(255, 255, 255),
      Math.ceil(Math.random() * 3 + 5),
      Math.random() * 4 + 1.5,
      Math.random() * 20 + 3,
    );
    stonePillar.materialLabel = MATERIAL_STONE;
    stonePillar.rotation[0] = -Math.PI / 2;
    stonePillar.rotation[2] = (Math.PI * (Math.random() - 0.5)) / 10;
    stonePillar.rotation[1] = 2 * Math.PI * Math.random();
    stonePillar.position = [
      (Math.random() > 0.5 ? -1 : 1) * (30 * Math.random() + 10),
      2,
      Math.random() * -60 - 10,
    ];
    scene.addObject(stonePillar, SHADER_PROGRAM_PHONG);
  }

  let beach = generateSphereObject(OBJECT_BEACH, rgb(255, 255, 255), 64, 50);
  beach.position[0] = 25;
  beach.position[1] = -34.2;
  beach.position[2] = -10;
  beach.scale[1] = 0.7;
  beach.materialLabel = MATERIAL_SAND;
  scene.addObject(beach, SHADER_PROGRAM_PHONG);

  let ship = generateOBJObject("ship", rgb(255, 255, 255), "pirate_ship");
  ship.materialLabel = MATERIAL_SHIP;
  scene.addObject(ship, SHADER_PROGRAM_PHONG);
  ship.scale = [0.006, 0.006, 0.006];
  ship.position = [0, -0.5, -30];
  ship.rotation[1] = Math.PI / 3;
  console.log(ship);
}
