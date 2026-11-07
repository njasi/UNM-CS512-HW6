import { Scene } from "PotatoEngine";
import {
  addMaterials,
  addShaders,
  addTextures,
  MATERIAL_SEA_COMPLETE,
} from "./materials";
import { attachListeners } from "./inputs";
import { initSceneObjects } from "./objects";
import { setEnvironmentColor } from "./timing";

// potato engine imports
import controls from "PotatoEngine/src/controls";
import { TexturedMaterial } from "PotatoEngine/src/materials";
import { cacheOBJ } from "PotatoEngine/src/objects/loaders";
import { addLights } from "./light";

const scene = new Scene("glcanvas");
scene.camera.move(0, -10, 0);
scene.camera.pitch -= Math.PI / 12;
scene.camera.doRotate = true;

// setup controls & listeners
controls.FlightControls.setupMouseControls(scene);
const flightCb = controls.FlightControls.setupKeyboardControls(scene);
/**
 * Update the scene
 * @param {number} dt time change since last update in ms
 */
function updateScene(dt) {
  flightCb(dt);

  setEnvironmentColor(scene.time / 1000);

  if (scene.camera.doRotate) {
    scene.camera.yaw += (Math.PI / 18) * dt;
  }

  this.getMaterial(MATERIAL_SEA_COMPLETE).setTextureExtraUniform(
    TexturedMaterial.TEXTURE_TYPE_DISPLACEMENT,
    "uDisplacementV",
    scene.time / 45000,
  );
}

/**
 * Main init function
 */
async function main() {
  addShaders(scene);
  addTextures(scene);
  addMaterials(scene);
  addLights(scene);

  scene.setUpdateCB(updateScene);

  await scene.load(async () => {
    await cacheOBJ("./public/pirate_ship.obj", "pirate_ship");
  });

  initSceneObjects(scene);

  attachListeners(scene);

  setInterval(() => {
    scene.render();
  }, 30);
}

main();
