import { Scene } from "PotatoEngine";
import {
  addMaterials,
  addShaders,
  addTextures,
  colors,
  MATERIAL_SEA_COMPLETE,
  SHADER_PROGRAM_WATER,
} from "./setup";

// potato engine imports
import { generateGridObject } from "PotatoEngine/src/objects";
import { Light } from "PotatoEngine/src/lights";
import { LIGHT_DIRECTIONAL } from "PotatoEngine/src/lights/Light";
import controls from "PotatoEngine/src/controls";
import { TexturedMaterial } from "PotatoEngine/src/materials";
import { rgb } from "PotatoEngine/src/util/color";
import { attachListeners } from "./inputs";
import { initSceneObjects } from "./objects";

const scene = new Scene("glcanvas");
scene.camera.move(0, -5, 0);
scene.camera.pitch -= Math.PI / 8;

/**
 * Add the basic lights to the scene
 */
function addLights() {
  const globalLight = new Light("globalLight", [0, 0, 0], {
    type: LIGHT_DIRECTIONAL,
    direction: [-0.5, -1, -0.5],
    intensity: 1,
  });
  scene.addLight(globalLight);
}

// setup controls & listeners
controls.FlightControls.setupMouseControls(scene);
const flightCb = controls.FlightControls.setupKeyboardControls(scene);
/**
 * Update the scene
 * @param {number} dt time change since last update in ms
 */
function updateScene(dt) {
  flightCb(dt);

  this.getMaterial(MATERIAL_SEA_COMPLETE).setTextureExtraUniform(
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

  initSceneObjects(scene);

  attachListeners(scene);

  setInterval(() => {
    scene.render();
  }, 30);
}

main();
