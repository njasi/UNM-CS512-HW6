import { Scene } from "PotatoEngine";
import {
  common,
  TextureColorRamp,
  TexturedMaterial,
} from "PotatoEngine/src/materials";
import { rgb } from "PotatoEngine/src/util/color";
import { PhongShaderProgram } from "PotatoEngine/src/shaders";

export const SHADER_PROGRAM_PHONG = "phong";
export const SHADER_PROGRAM_WATER = "phong_water";

export const TEXTURE_SEA = "sea";
export const TEXTURE_SEA_DISPLACEMENT = "sea_displacement";
export const TEXTURE_FOAM_COLOR_RAMP = "foam_color_ramp";

export const MATERIAL_SEA_COMPLETE = "sea_complete";
export const MATERIAL_SEA_RAW = "sea_raw";
export const MATERIAL_SEA_BACKGROUND = "sea_shadow";
export const MATERIAL_SEA_LAYERED = "sea_layered";
export const MATERIAL_SEA_DISPLACEMENT = "sea_displacement";

export const SEA_MATERIAL_LIST = [
  MATERIAL_SEA_COMPLETE,
  MATERIAL_SEA_RAW,
  MATERIAL_SEA_BACKGROUND,
  MATERIAL_SEA_LAYERED,
  MATERIAL_SEA_DISPLACEMENT,
];

export const colors = {
  gold: rgb(255, 222, 33),
  ground: rgb(107, 107, 107),
  steel: rgb(206, 210, 215),
  wood: rgb(218, 109, 66),
  water: rgb(1, 113, 187),
  waterDark: rgb(0, 100, 167),
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
    "./public/wave_displacement2.png",
  );
  scene.createTexture(TEXTURE_SEA, "./public/sea.png", {
    wrapS: true,
    wrapT: true,
  });

  scene.addTexture(
    TEXTURE_FOAM_COLOR_RAMP,
    new TextureColorRamp(scene.gl, colors.water, colors.waterDark),
  );

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
  const sea = new TexturedMaterial(MATERIAL_SEA_COMPLETE, {
    [TexturedMaterial.TEXTURE_TYPE_ALBEDO]: {
      textureLabel: TEXTURE_SEA,
      extraUniforms: {
        [TexturedMaterial.U_TILE]: [7, 7],
      },
    },
    [TexturedMaterial.TEXTURE_TYPE_ALBEDO2]: {
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
    [TexturedMaterial.TEXTURE_TYPE_COLOR_RAMP]: {
      textureLabel: TEXTURE_FOAM_COLOR_RAMP,
    },
  });

  const sea_raw = new TexturedMaterial(MATERIAL_SEA_RAW, {
    [TexturedMaterial.TEXTURE_TYPE_ALBEDO]: {
      textureLabel: TEXTURE_SEA,
      extraUniforms: {
        [TexturedMaterial.U_TILE]: [12, 12],
      },
    },
  });

  const sea_background = new TexturedMaterial(MATERIAL_SEA_BACKGROUND, {
    [TexturedMaterial.TEXTURE_TYPE_ALBEDO]: {
      textureLabel: TEXTURE_SEA,
      extraUniforms: {
        [TexturedMaterial.U_TILE]: [7, 7],
      },
    },
    [TexturedMaterial.TEXTURE_TYPE_COLOR_RAMP]: {
      textureLabel: TEXTURE_FOAM_COLOR_RAMP,
    },
  });

  const sea_layered = new TexturedMaterial(MATERIAL_SEA_LAYERED, {
    [TexturedMaterial.TEXTURE_TYPE_ALBEDO]: {
      textureLabel: TEXTURE_SEA,
      extraUniforms: {
        [TexturedMaterial.U_TILE]: [7, 7],
      },
    },
    [TexturedMaterial.TEXTURE_TYPE_ALBEDO2]: {
      textureLabel: TEXTURE_SEA,
      extraUniforms: {
        [TexturedMaterial.U_TILE]: [12, 12],
      },
    },
    [TexturedMaterial.TEXTURE_TYPE_COLOR_RAMP]: {
      textureLabel: TEXTURE_FOAM_COLOR_RAMP,
    },
  });

  const sea_displacement = new TexturedMaterial(MATERIAL_SEA_DISPLACEMENT, {
    [TexturedMaterial.TEXTURE_TYPE_ALBEDO]: {
      textureLabel: TEXTURE_SEA_DISPLACEMENT,
      extraUniforms: {
        uDisplacementStrength: 0.3,
        [TexturedMaterial.U_TILE]: [3, 3],
      },
    },
  });

  scene.addMaterial(sea, SHADER_PROGRAM_WATER);
  scene.addMaterial(sea_raw, SHADER_PROGRAM_WATER);
  scene.addMaterial(sea_background, SHADER_PROGRAM_WATER);
  scene.addMaterial(sea_layered, SHADER_PROGRAM_WATER);
  scene.addMaterial(sea_displacement, SHADER_PROGRAM_WATER);
}
