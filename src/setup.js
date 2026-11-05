import { Scene } from "PotatoEngine";
import { common, TexturedMaterial } from "PotatoEngine/src/materials";
import { rgb } from "PotatoEngine/src/util/color";
import { PhongShaderProgram } from "PotatoEngine/src/shaders";

export const SHADER_PROGRAM_PHONG = "phong";
export const SHADER_PROGRAM_WATER = "phong_water";

export const TEXTURE_SEA = "sea";
export const TEXTURE_SEA_DISPLACEMENT = "sea_displacement";

export const MATERIAL_SEA = "sea";

export const colors = {
  gold: rgb(255, 222, 33),
  ground: rgb(107, 107, 107),
  steel: rgb(206, 210, 215),
  wood: rgb(218, 109, 66),
  water: rgb(1, 113, 187),
};

/**
 * Add the shader programs to the scene
 * @param {Scene} scene
 */
export function addShaders(scene) {
  scene.createProgram(
    SHADER_PROGRAM_PHONG,
    "../PotatoEngine/src/shaders/vertex/phongTextured.vert",
    "../PotatoEngine/src/shaders/fragment/phongTextured.frag",
    PhongShaderProgram,
  );

  scene.createProgram(
    SHADER_PROGRAM_WATER,
    "./src/waterPhongTextured.vert",
    "../PotatoEngine/src/shaders/fragment/phongTextured.frag",
    PhongShaderProgram,
  );
}

/**
 * Add the texture structs to the scene
 * @param {Scene} scene
 */
export function addTextures(scene) {
  scene.createTexture(
    TEXTURE_SEA_DISPLACEMENT,
    "./public/wave_displacement.png",
  );
  scene.createTexture(TEXTURE_SEA, "./public/sea.png", {
    wrapS: true,
    wrapT: true,
  });

  // if (window.location.host == "localhost:8080") {
  //   document.getElementById("test-video-texture").src =
  //     "./assets/hw4-preview.mp4";
  // }
  // scene.createTexture("video", document.getElementById("test-video-texture"), {
  //   upload: true,
  //   animated: true,
  // });
}

/**
 * Add all the needed materials to the scene
 * @param {Scene} scene
 */
export function addMaterials(scene) {
  const sea = new TexturedMaterial("sea", {
    [TexturedMaterial.TEXTURE_TYPE_ALBEDO]: {
      textureLabel: TEXTURE_SEA,
      extraUniforms: {
        [TexturedMaterial.U_TILE]: [12, 12],
      },
    },
    [TexturedMaterial.TEXTURE_TYPE_DISPLACEMENT]: {
      textureLabel: TEXTURE_SEA_DISPLACEMENT,
      extraUniforms: {
        uDisplacementStrength: 0.1,
        [TexturedMaterial.U_TILE]: [3, 3],
      },
    },
  });

  scene.addMaterial(sea, SHADER_PROGRAM_WATER);
}
