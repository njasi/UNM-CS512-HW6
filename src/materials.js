import { Scene } from "PotatoEngine";
import {
  common,
  TextureColorRamp,
  TexturedMaterial,
} from "PotatoEngine/src/materials";
import { rgb } from "PotatoEngine/src/util/color";
import { PhongShaderProgram } from "PotatoEngine/src/shaders";
import {
  ambientOnly,
  metallic,
  vertColor,
  wood,
} from "PotatoEngine/src/materials/common";

export const SHADER_PROGRAM_PHONG = "phong";
export const SHADER_PROGRAM_WATER = "phong_water";

export const TEXTURE_SHIP = "ship";
export const TEXTURE_BUOY = "buoy";
export const TEXTURE_STONE = "stone";
export const TEXTURE_STONE_NORMAL = "stone_normal";
export const TEXTURE_SAND = "sand";
export const TEXTURE_SAND_NORMAL = "sand_normal";
export const TEXTURE_WOOD = "wood";
export const TEXTURE_WOOD_BUMP = "wood_bump";
export const TEXTURE_METAL_BUMP = "metal_bump";
export const TEXTURE_SEA = "sea";
export const TEXTURE_SEA_DISPLACEMENT = "sea_displacement";
export const TEXTURE_FOAM_COLOR_RAMP = "foam_color_ramp";
export const TEXTURE_FOAM_COLOR_RAMP2 = "foam_color_ramp2";

export const TEXTURE_SKY = "sky";

export const MATERIAL_AMBIENT_ONLY = "ambient";
export const MATERIAL_FLAT = "flat";
export const MATERIAL_SHINY = "shiny";

export const MATERIAL_METAL = "metal";
export const MATERIAL_SHIP = "ship";
export const MATERIAL_BUOY = "buoy";
export const MATERIAL_STONE = "stone";
export const MATERIAL_SAND = "sand";
export const MATERIAL_WOOD = "wood";
export const MATERIAL_SEA_COMPLETE = "sea_complete";
export const MATERIAL_SEA_RAW = "sea_raw";
export const MATERIAL_SEA_BACKGROUND = "sea_shadow";
export const MATERIAL_SEA_LAYERED = "sea_layered";
export const MATERIAL_SEA_DISPLACEMENT = "sea_displacement";

export const MATERIAL_SKY = "sky";

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
  waterFoam: rgb(255, 255, 255),
  waterNight: rgb(1, 91, 130),
  waterNightDark: rgb(2, 64, 105),
  waterFoamNight: rgb(1, 111, 160),
  globalLightDay: rgb(244, 233, 155),
  globalLightNight: rgb(255, 248, 222),
};

let colorRampTexture;
let colorRampFoamTexture;

/**
 * Add the shader programs to the scene
 * @param {Scene} scene
 */
export function addShaders(scene) {
  scene.createProgram(
    SHADER_PROGRAM_PHONG,
    "./PotatoEngine/src/shaders/vertex/phongTextured.vert",
    "./PotatoEngine/src/shaders/fragment/phongTextured.frag",
    PhongShaderProgram,
  );

  scene.createProgram(
    SHADER_PROGRAM_WATER,
    "./src/waterPhongTextured.vert",
    "./PotatoEngine/src/shaders/fragment/phongTextured.frag",
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
    "./public/textures/wave_displacement2.png",
  );
  scene.createTexture(TEXTURE_SEA, "./public/textures/sea.png", {
    wrapS: true,
    wrapT: true,
    blackMipmaps: 4,
  });
  scene.createTexture(TEXTURE_STONE, "./public/textures/stone.png");
  scene.createTexture(
    TEXTURE_STONE_NORMAL,
    "./public/textures/stone_normal.png",
  );
  scene.createTexture(TEXTURE_SAND, "./public/textures/sand.jpg");
  scene.createTexture(
    TEXTURE_SAND_NORMAL,
    "./public/textures/sand_normalmap.jpg",
  );
  scene.createTexture(TEXTURE_WOOD, "./public/textures/wood.png");
  scene.createTexture(TEXTURE_WOOD_BUMP, "./public/textures/wood_bump.png");
  scene.createTexture(TEXTURE_METAL_BUMP, "./public/textures/metal_bump.png");
  scene.createTexture(TEXTURE_BUOY, "./public/textures/buoy.png");
  scene.createTexture(TEXTURE_SHIP, "./public/textures/pirate-ship.png");
  scene.createTexture(
    TEXTURE_SKY,
    document.getElementById("sky-video-texture"),
    {
      upload: true,
      animated: true,
    },
  );
  colorRampTexture = new TextureColorRamp(
    scene.gl,
    colors.water,
    colors.waterDark,
    { label: "color ramp1" },
  );
  scene.addTexture(TEXTURE_FOAM_COLOR_RAMP, colorRampTexture);
  colorRampFoamTexture = new TextureColorRamp(
    scene.gl,
    rgb(0, 0, 0),
    colors.waterFoam,
    { label: "color ramp2" },
  );
  scene.addTexture(TEXTURE_FOAM_COLOR_RAMP2, colorRampFoamTexture);
}

/**
 * Add all the needed materials to the scene
 * @param {Scene} scene
 */
export function addMaterials(scene) {
  // phong mats
  scene.addMaterial(ambientOnly(MATERIAL_AMBIENT_ONLY), SHADER_PROGRAM_PHONG);
  scene.addMaterial(ambientOnly(MATERIAL_AMBIENT_ONLY), SHADER_PROGRAM_WATER);
  scene.addMaterial(
    wood(MATERIAL_FLAT, rgb(255, 255, 255)),
    SHADER_PROGRAM_PHONG,
  );
  scene.addMaterial(
    metallic(MATERIAL_SHINY, rgb(255, 255, 255)),
    SHADER_PROGRAM_PHONG,
  );

  // texture mats
  const sea = new TexturedMaterial(MATERIAL_SEA_COMPLETE, {
    [TexturedMaterial.TEXTURE_TYPE_ALBEDO]: {
      textureLabel: TEXTURE_SEA,
      extraUniforms: {
        [TexturedMaterial.U_TILE]: [7 * 1.5, 7 * 1.5],
      },
    },
    [TexturedMaterial.TEXTURE_TYPE_ALBEDO2]: {
      textureLabel: TEXTURE_SEA,
      extraUniforms: {
        [TexturedMaterial.U_TILE]: [12 * 1.5, 12 * 1.5],
      },
    },
    [TexturedMaterial.TEXTURE_TYPE_DISPLACEMENT]: {
      textureLabel: TEXTURE_SEA_DISPLACEMENT,
      extraUniforms: {
        uDisplacementStrength: 0.1,
        [TexturedMaterial.U_TILE]: [3 * 1.5, 3 * 1.5 * 1.5],
      },
    },
    [TexturedMaterial.TEXTURE_TYPE_COLOR_RAMP]: {
      textureLabel: TEXTURE_FOAM_COLOR_RAMP,
    },
    [TexturedMaterial.TEXTURE_TYPE_COLOR_RAMP2]: {
      textureLabel: TEXTURE_FOAM_COLOR_RAMP2,
    },
  });

  const sea_raw = new TexturedMaterial(MATERIAL_SEA_RAW, {
    [TexturedMaterial.TEXTURE_TYPE_ALBEDO]: {
      textureLabel: TEXTURE_SEA,
      extraUniforms: {
        [TexturedMaterial.U_TILE]: [12 * 1.5, 12 * 1.5],
      },
    },
  });

  const sea_background = new TexturedMaterial(MATERIAL_SEA_BACKGROUND, {
    [TexturedMaterial.TEXTURE_TYPE_ALBEDO]: {
      textureLabel: TEXTURE_SEA,
      extraUniforms: {
        [TexturedMaterial.U_TILE]: [7 * 1.5, 7 * 1.5],
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
        [TexturedMaterial.U_TILE]: [7 * 1.5, 7 * 1.5],
      },
    },
    [TexturedMaterial.TEXTURE_TYPE_ALBEDO2]: {
      textureLabel: TEXTURE_SEA,
      extraUniforms: {
        [TexturedMaterial.U_TILE]: [12 * 1.5, 12 * 1.5],
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
        uDisplacementStrength: 0.1,
        [TexturedMaterial.U_TILE]: [3 * 1.5, 3 * 1.5],
      },
    },
  });

  const stone = new TexturedMaterial(MATERIAL_STONE, {
    [TexturedMaterial.TEXTURE_TYPE_ALBEDO]: {
      textureLabel: TEXTURE_STONE,
      extraUniforms: {
        [TexturedMaterial.U_TILE]: [3 * 1.5, 3 * 1.5],
      },
    },
    [TexturedMaterial.TEXTURE_TYPE_NORMAL]: {
      textureLabel: TEXTURE_STONE_NORMAL,
      extraUniforms: {
        [TexturedMaterial.U_NORMAL_SCALE]: -0.5,
        [TexturedMaterial.U_TILE]: [3 * 1.5, 3 * 1.5],
      },
    },
  });

  const sand = new TexturedMaterial(MATERIAL_SAND, {
    [TexturedMaterial.TEXTURE_TYPE_ALBEDO]: {
      textureLabel: TEXTURE_SAND,
      extraUniforms: {
        [TexturedMaterial.U_TILE]: [16, 16],
      },
    },
    [TexturedMaterial.TEXTURE_TYPE_NORMAL]: {
      textureLabel: TEXTURE_SAND_NORMAL,
      extraUniforms: {
        [TexturedMaterial.U_NORMAL_SCALE]: 1,
        [TexturedMaterial.U_TILE]: [16, 16],
      },
    },
  });

  const woodMaterial = new TexturedMaterial(MATERIAL_WOOD, {
    [TexturedMaterial.TEXTURE_TYPE_ALBEDO]: {
      textureLabel: TEXTURE_WOOD,
      extraUniforms: {
        [TexturedMaterial.U_TILE]: [3, 3],
      },
    },
    [TexturedMaterial.TEXTURE_TYPE_BUMP]: {
      textureLabel: TEXTURE_WOOD_BUMP,
      extraUniforms: {
        [TexturedMaterial.U_BUMP_SCALE]: 5,
        [TexturedMaterial.U_TILE]: [3, 3],
      },
    },
  });

  const metalMaterial = new TexturedMaterial(MATERIAL_METAL, {
    [TexturedMaterial.TEXTURE_TYPE_BUMP]: {
      textureLabel: TEXTURE_METAL_BUMP,
      extraUniforms: {
        [TexturedMaterial.U_BUMP_SCALE]: 5,
        [TexturedMaterial.U_TILE]: [3, 1],
      },
    },
  });

  const ship = new TexturedMaterial(MATERIAL_SHIP, {
    [TexturedMaterial.TEXTURE_TYPE_ALBEDO]: {
      textureLabel: TEXTURE_SHIP,
    },
  });

  const buoy = new TexturedMaterial(MATERIAL_BUOY, {
    [TexturedMaterial.TEXTURE_TYPE_ALBEDO]: {
      textureLabel: TEXTURE_BUOY,
      extraUniforms: {
        [TexturedMaterial.U_TILE]: [2, 1],
      },
    },
  });

  const sky = new TexturedMaterial(MATERIAL_SKY, {
    [TexturedMaterial.TEXTURE_TYPE_ALBEDO]: {
      textureLabel: TEXTURE_SKY,
    },
  });

  scene.addMaterial(sea, SHADER_PROGRAM_WATER);
  scene.addMaterial(sea_raw, SHADER_PROGRAM_WATER);
  scene.addMaterial(sea_background, SHADER_PROGRAM_WATER);
  scene.addMaterial(sea_layered, SHADER_PROGRAM_WATER);
  scene.addMaterial(sea_displacement, SHADER_PROGRAM_WATER);

  scene.addMaterial(stone, SHADER_PROGRAM_PHONG);
  scene.addMaterial(sand, SHADER_PROGRAM_PHONG);
  scene.addMaterial(woodMaterial, SHADER_PROGRAM_PHONG);
  scene.addMaterial(metalMaterial, SHADER_PROGRAM_PHONG);
  scene.addMaterial(buoy, SHADER_PROGRAM_PHONG);
  scene.addMaterial(ship, SHADER_PROGRAM_PHONG);
  scene.addMaterial(sky, SHADER_PROGRAM_PHONG);
}

/**
 * Update the color ramp texture with new start and end
 * @param {rgb} colorShadow
 * @param {rgb} colorBackground
 * @param {TextureColorRamp} [ramp=colorRampTexture]
 * @param {TextureColorRamp} [foamRamp=colorRampFoamTexture]
 */
export function setWaterColorRamp(
  colorShadow,
  colorBackground,
  colorFoam,
  ramp = colorRampTexture,
  foamRamp = colorRampFoamTexture,
) {
  ramp.setColors(colorBackground, colorShadow);
  foamRamp.setColors(rgb(0, 0, 0), colorFoam);
}
