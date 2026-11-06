import {
  MATERIAL_AMBIENT_ONLY,
  MATERIAL_FLAT,
  MATERIAL_SAND,
  MATERIAL_SEA_COMPLETE,
  MATERIAL_SHINY,
  MATERIAL_SHIP,
  MATERIAL_SKY,
  MATERIAL_STONE,
  SHADER_PROGRAM_PHONG,
  SHADER_PROGRAM_WATER,
} from "./materials";

import { Scene } from "PotatoEngine";
import {
  FloatingObject,
  generateGridObject,
  generateNGonPrismObject,
  generateSphereObject,
  SceneObject,
} from "PotatoEngine/src/objects";
import { generateOBJObject, loadOBJ } from "PotatoEngine/src/objects/loaders";
import { rgb } from "PotatoEngine/src/util/color";
import { waterLevel } from "./water";

export const OBJECT_SEA = "seaObject";
export const OBJECT_STONE = "stone";
export const OBJECT_BEACH = "beach";
export const OBJECT_SKYBOX = "skybox";
export const OBJECT_SHIP = "ship";
/**
 * Setup the scene
 * @param {Scene} scene
 */
export function initSceneObjects(scene) {
  let skyBox = generateSphereObject(OBJECT_SKYBOX, rgb(255, 255, 255), 32, 60);
  skyBox.materialLabel = MATERIAL_SKY;
  skyBox.materialLabelSecondary = MATERIAL_AMBIENT_ONLY;
  skyBox.rotation[0] = Math.PI / 2;
  skyBox.rotation[1] = Math.PI;
  scene.addObject(skyBox, SHADER_PROGRAM_PHONG);

  scene.removeObject(OBJECT_SEA);
  let seaObject = generateGridObject(OBJECT_SEA, rgb(255, 255, 255), 200, 150);
  seaObject.materialLabel = MATERIAL_SEA_COMPLETE;
  seaObject.materialLabelSecondary = MATERIAL_AMBIENT_ONLY;
  seaObject.position = [0, 0, 0];
  scene.addObject(seaObject, SHADER_PROGRAM_WATER);

  for (let i = 0; i < 15; i++) {
    let stonePillar = generateNGonPrismObject(
      OBJECT_STONE + "_" + i,
      rgb(255, 255, 255),
      Math.ceil(Math.random() * 3 + 5),
      Math.random() * 4 + 1.5,
      Math.random() * 20 + 3,
    );
    stonePillar.materialLabel = MATERIAL_STONE;
    stonePillar.materialLabelSecondary = MATERIAL_SHINY;

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
  beach.materialLabelSecondary = MATERIAL_FLAT;

  scene.addObject(beach, SHADER_PROGRAM_PHONG);

  const shipPrim = loadOBJ("pirate_ship");
  shipPrim.generateColors(rgb(255, 255, 255));
  const shipParts = shipPrim.toTypedArray();

  const ship = shipPrim.toSceneObject(OBJECT_SHIP, FloatingObject, {
    waterFunction: waterLevel,
  });

  ship.materialLabel = MATERIAL_SHIP;
  ship.materialLabelSecondary = MATERIAL_FLAT;
  ship.scale = [0.006, 0.006, 0.006];
  ship.position = [0, -0.5, -30];
  ship.rotation[1] = Math.PI / 3;
  ship.snappedToWater = true;
  scene.addObject(ship, SHADER_PROGRAM_PHONG);
}
