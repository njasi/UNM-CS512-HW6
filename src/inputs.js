import { Scene } from "PotatoEngine";
import { SEA_MATERIAL_LIST } from "./materials";
import { initSceneObjects, OBJECT_SEA } from "./objects";

/**
 * Attach all the event listeners & populate inputs
 * @param {Scene} scene
 */
export function attachListeners(scene) {
  // TODO decide on interactivity with the scene
  attachSeaMaterialSelector(scene);
  attachRegenScene(scene);
  attachRotateCam(scene);
}

/**
 * Attach and populate the event listener for sea mat selector
 * @param {Scene} scene
 */
function attachSeaMaterialSelector(scene) {
  const seaObject = scene.getObject(OBJECT_SEA);
  const seaMat = document.getElementById("sea-material-selector");

  seaMat.innerHTML = "";
  for (const material of SEA_MATERIAL_LIST) {
    const cleanName = material
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
    seaMat.innerHTML += `<option value=${material}>${cleanName}</option>`;
  }

  seaMat.addEventListener("input", (event) => {
    seaObject.materialLabel = event.target.value;
  });
}

function attachRegenScene(scene) {
  document.getElementById("regen-scene").addEventListener("click", () => {
    initSceneObjects(scene);
  });
}

function attachRotateCam(scene) {
  document.getElementById("rotate-cam").addEventListener("input", (event) => {
    scene.camera.doRotate = event.target.checked;
  });
}
