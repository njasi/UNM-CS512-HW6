import { MATERIAL_SEA_COMPLETE, SHADER_PROGRAM_WATER } from "./setup";

import { Scene } from "PotatoEngine";
import { generateGridObject } from "PotatoEngine/src/objects";
import { rgb } from "PotatoEngine/src/util/color";

export const OBJECT_SEA = "seaObject";

/**
 * Setup the scene
 * @param {Scene} scene
 */
export function initSceneObjects(scene) {
  scene.removeObject(OBJECT_SEA);
  let seaObject = generateGridObject(OBJECT_SEA, rgb(255, 255, 255), 200, 100);
  seaObject.materialLabel = MATERIAL_SEA_COMPLETE;
  seaObject.position = [0, 0, 0];
  scene.addObject(seaObject, SHADER_PROGRAM_WATER);
}
