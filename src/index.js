import { Scene } from "PotatoEngine";
import {
  addMaterials,
  addShaders,
  addTextures,
  colors,
  MATERIAL_SEA,
  SHADER_PROGRAM_WATER,
} from "./setup";

// potato engine imports
import { generateGridObject } from "PotatoEngine/src/objects";
import { Light } from "PotatoEngine/src/lights";
import { LIGHT_DIRECTIONAL } from "PotatoEngine/src/lights/Light";
import controls from "PotatoEngine/src/controls";
import { TexturedMaterial } from "PotatoEngine/src/materials";
import { rgb } from "PotatoEngine/src/util/color";

const scene = new Scene("glcanvas");
scene.camera.move(0, -1, 0);
scene.rotationX += Math.PI / 8;

/**
 * Add the basic lights to the scene
 */
function addLights() {
  const globalLight = new Light("globalLight", [0, 0, 0], {
    type: LIGHT_DIRECTIONAL,
    direction: [0, -1, 0],
    intensity: 1,
  });
  scene.addLight(globalLight);
}

let seaObject;

/**
 * Setup the scene
 * @param {string} shader which shader to use
 */
function initSceneObjects(shader = "phong") {
  scene.removeObject("seaObject");
  seaObject = generateGridObject("seaObject", rgb(255, 255, 255), 200, 100);
  seaObject.materialLabel = MATERIAL_SEA;
  seaObject.position = [0, 0, 0];
  scene.addObject(seaObject, SHADER_PROGRAM_WATER);
}

function attachListeners() {
  // TODO decide on interactivity with the scene
}

/**
 * Update the scene
 * @param {number} dt time change since last update in ms
 */
function updateScene(dt) {
  this.getMaterial(MATERIAL_SEA).setTextureExtraUniform(
    TexturedMaterial.TEXTURE_TYPE_DISPLACEMENT,
    "uDisplacementV",
    scene.time / 30000,
  );
}

/**
 * Main init function
 */
async function main() {
  addShaders(scene);
  addTextures(scene);
  addMaterials(scene);
  addLights();

  scene.setUpdateCB(updateScene);

  await scene.load();

  initSceneObjects();

  controls.BasicControls.setupMouseControls(scene);
  controls.BasicControls.setupKeyboardControls(scene);
  attachListeners();

  setInterval(() => {
    scene.render();
  }, 30);
}

main();
