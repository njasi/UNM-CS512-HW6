
import { Light } from "PotatoEngine/src/lights";
import { LIGHT_DIRECTIONAL } from "PotatoEngine/src/lights/Light";


let globalLight;
/**
 * Add the basic lights to the scene
 * 
 * @param {Scene} scene 
 */
export function addLights(scene) {
  globalLight = new Light("globalLight", [0, 0, 0], {
    type: LIGHT_DIRECTIONAL,
    direction: [-0.5, -1, -0.5],
    intensity: 1,
  });
  scene.addLight(globalLight);
}

/**
 * Set the color of the global light
 * @param {*} color 
 */
export function setGlobalLight(color, intensity){
    globalLight.color = color
    globalLight.intensity = intensity
}