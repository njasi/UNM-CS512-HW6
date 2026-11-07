import {
  colors,
  MATERIAL_AMBIENT_ONLY,
  MATERIAL_BUOY,
  MATERIAL_FLAT,
  MATERIAL_METAL,
  MATERIAL_SAND,
  MATERIAL_SEA_COMPLETE,
  MATERIAL_SHINY,
  MATERIAL_SHIP,
  MATERIAL_SKY,
  MATERIAL_STONE,
  MATERIAL_WOOD,
  SHADER_PROGRAM_PHONG,
  SHADER_PROGRAM_WATER,
} from "./materials";

import { Scene } from "PotatoEngine";
import {
  FloatingObject,
  generateConeObject,
  generateCube,
  generateCubeObject,
  generateCylinder,
  generateCylinderObject,
  generateGridObject,
  generateNGonPrismObject,
  generateSphereObject,
  generateTorus,
  SceneObject,
} from "PotatoEngine/src/objects";
import { generateOBJObject, loadOBJ } from "PotatoEngine/src/objects/loaders";
import { rgb } from "PotatoEngine/src/util/color";
import { waterLevel } from "./water";
import {
  mat4Identity,
  mat4RotateZ,
  transformVertices,
} from "PotatoEngine/src/util/transformations";

export const OBJECT_SEA = "seaObject";
export const OBJECT_STONE = "stone";
export const OBJECT_BEACH = "beach";
export const OBJECT_SKYBOX = "skybox";
export const OBJECT_SHIP = "ship";
export const OBJECT_BARREL = "barrel";
export const OBJECT_BUOY = "buoy";
export const OBJECT_LOOKOUT = "lookout";

/**
 * Setup the scene
 * @param {Scene} scene
 */
export function initSceneObjects(scene) {
  scene.removeLight(OBJECT_SKYBOX);
  let skyBox = generateSphereObject(OBJECT_SKYBOX, rgb(255, 255, 255), 32, 60);
  skyBox.materialLabel = MATERIAL_SKY;
  skyBox.materialLabelSecondary = MATERIAL_AMBIENT_ONLY;
  skyBox.rotation[0] = Math.PI / 2;
  skyBox.rotation[1] = Math.PI;
  scene.addObject(skyBox, SHADER_PROGRAM_PHONG);

  if (!scene.getObject(OBJECT_SEA)) {
    let seaObject = generateGridObject(
      OBJECT_SEA,
      rgb(255, 255, 255),
      200,
      150,
    );
    seaObject.materialLabel = MATERIAL_SEA_COMPLETE;
    seaObject.materialLabelSecondary = MATERIAL_AMBIENT_ONLY;
    seaObject.position = [0, 0, 0];
    scene.addObject(seaObject, SHADER_PROGRAM_WATER);
  }

  for (let i = 0; i < 5; i++) {
    scene.removeObject(OBJECT_STONE + "_" + i);
    scene.removeObject(OBJECT_STONE + "_back_" + i);
    let pillar = makePillar(OBJECT_STONE + "_" + i);
    let pillar2 = makePillar(OBJECT_STONE + "_back_" + i, 80);
    scene.addObject(pillar, SHADER_PROGRAM_PHONG);
    scene.addObject(pillar2, SHADER_PROGRAM_PHONG);
  }

  for (let i = 0; i < 128; i++) {
    scene.removeObject(OBJECT_STONE + "_circle_" + i);
    let pillar = makePillar(OBJECT_STONE + "_circle_" + i);
    pillar.position[0] =
      50 * Math.sin((2 * Math.PI * i) / 64) + Math.random() * 2 - 1;
    pillar.position[2] =
      50 * Math.cos((2 * Math.PI * i) / 64) + Math.random() * 2 - 1;
    scene.addObject(pillar, SHADER_PROGRAM_PHONG);
  }

  let beach = generateSphereObject(OBJECT_BEACH, rgb(255, 255, 255), 64, 50);
  beach.position[0] = 40;
  beach.position[1] = -33;
  beach.position[2] = -10;
  beach.scale[1] = 0.7;
  beach.materialLabel = MATERIAL_SAND;
  beach.materialLabelSecondary = MATERIAL_FLAT;

  let beach2 = generateSphereObject(
    OBJECT_BEACH + "1",
    rgb(255, 255, 255),
    64,
    50,
  );
  beach2.position[0] = 45;
  beach2.position[1] = -34.5;
  beach2.position[2] = 10;
  beach2.scale[1] = 0.7;
  beach2.materialLabel = MATERIAL_SAND;
  beach2.materialLabelSecondary = MATERIAL_FLAT;

  scene.removeObject(OBJECT_BEACH);
  scene.removeObject(OBJECT_BEACH + "1");
  scene.addObject(beach, SHADER_PROGRAM_PHONG);
  scene.addObject(beach2, SHADER_PROGRAM_PHONG);

  const shipPrim = loadOBJ("pirate_ship");
  shipPrim.generateColors(rgb(255, 255, 255));

  const ship = shipPrim.toSceneObject(OBJECT_SHIP, FloatingObject, {
    waterFunction: waterLevel,
  });

  ship.materialLabel = MATERIAL_SHIP;
  ship.materialLabelSecondary = MATERIAL_FLAT;
  ship.scale = [0.006, 0.006, 0.006];
  ship.position = [0, -0.5, -30];
  ship.rotation[1] = Math.PI / 3;
  ship.snappedToWater = true;

  scene.removeObject(OBJECT_SHIP);
  scene.addObject(ship, SHADER_PROGRAM_PHONG);

  for (let i = 0; i < 15; i++) {
    scene.removeObject(OBJECT_BARREL + "_" + i, { removeChildren: true });
    scene.removeObject(OBJECT_BUOY + "_" + i);
    const barrel = makeBarrel(OBJECT_BARREL + "_" + i);
    const bouy = makeBuoy(OBJECT_BUOY + "_" + i);
    scene.addObject(barrel, SHADER_PROGRAM_PHONG, undefined, {
      addChildren: true,
    });
    scene.addObject(bouy, SHADER_PROGRAM_PHONG);
  }

  scene.removeObject(OBJECT_LOOKOUT, { removeChildren: true });
  const lookout = makeLookout(OBJECT_LOOKOUT)
  lookout.position[0] = -20;
  lookout.position[2] = 2;
  scene.addObject(
    lookout,
    SHADER_PROGRAM_PHONG,
    undefined,
    {
      addChildren: true,
    },
  );
}

/**
 * Generale a rock spire
 * @param {string} label
 */
function makePillar(label, shift = 0) {
  let stonePillar;

  if (Math.random() > 0.5) {
    stonePillar = generateNGonPrismObject(
      label,
      rgb(255, 255, 255),
      Math.ceil(Math.random() * 3 + 5),
      Math.random() * 4 + 1.5,
      Math.random() * 20 + 5,
    );
  } else {
    stonePillar = generateCylinderObject(
      label,
      rgb(255, 255, 255),
      32,
      Math.random() * 4 + 1.5,
      Math.random() * 20 + 5,
    );
  }
  stonePillar.materialLabel = MATERIAL_STONE;
  stonePillar.materialLabelSecondary = MATERIAL_SHINY;

  stonePillar.rotation[0] = -Math.PI / 2;
  stonePillar.rotation[2] = (Math.PI * (Math.random() - 0.5)) / 10;
  stonePillar.rotation[1] = 2 * Math.PI * Math.random();
  stonePillar.position = [
    (Math.random() > 0.5 ? -1 : 1) * (20 * Math.random() + 10),
    2,
    shift + Math.random() * -20 - 10,
  ];

  return stonePillar;
}

/**
 * Generate a simple floating barrel
 * @param {string} label
 * @returns
 */
function makeBarrel(label) {
  const barrelPrim = generateCylinder(8, 0.75, 2, {
    bulge: 0.25,
    segments_h: 8,
    prism: true,
  });
  barrelPrim.generateColors(rgb(255, 255, 255));

  const floatingBarrel = barrelPrim.toSceneObject(
    OBJECT_BARREL,
    FloatingObject,
    {
      waterFunction: waterLevel,
    },
  );

  floatingBarrel.materialLabel = MATERIAL_WOOD;
  floatingBarrel.materialLabelSecondary = MATERIAL_FLAT;
  // floatingBarrel.snappedToWater = true;
  floatingBarrel.label = label;

  floatingBarrel.position = [
    Math.random() * 60 - 40,
    Math.random() * -20,
    (Math.random() - 0.5) * 60,
  ];
  floatingBarrel.rotation = [
    Math.random() * 2 * Math.PI,
    Math.random() * 2 * Math.PI,
    Math.random() * 2 * Math.PI,
  ];

  const strap = generateCylinderObject(
    label + "_strap1",
    colors.steel,
    32,
    0.9,
    0.2,
  );
  strap.materialLabel = MATERIAL_METAL;
  strap.materialLabelSecondary = MATERIAL_SHINY;
  strap.position[2] = 0.7;

  const strap2 = generateCylinderObject(
    label + "_strap2",
    colors.steel,
    32,
    0.9,
    0.2,
  );
  strap2.materialLabel = MATERIAL_METAL;
  strap2.materialLabelSecondary = MATERIAL_SHINY;
  strap2.position[2] = -0.7;

  floatingBarrel.lightingCenter = undefined;
  strap.lightingCenter = undefined;
  strap2.lightingCenter = undefined;

  floatingBarrel.addChild(strap);
  floatingBarrel.addChild(strap2);

  return floatingBarrel;
}

/**
 * Make a buoy
 * @param {*} label
 * @returns
 */
function makeBuoy(label) {
  const buoyPrim = generateTorus(32, 1, 0.4);
  buoyPrim.generateColors(rgb(255, 255, 255));

  const floatingBuoy = buoyPrim.toSceneObject(OBJECT_BARREL, FloatingObject, {
    waterFunction: waterLevel,
  });

  floatingBuoy.materialLabel = MATERIAL_BUOY;
  floatingBuoy.materialLabelSecondary = MATERIAL_SHINY;
  floatingBuoy.label = label;

  floatingBuoy.position = [
    Math.random() * 80 - 40,
    Math.random() * -20,
    (Math.random() - 0.5) * 60,
  ];
  floatingBuoy.rotation = [
    Math.random() * 2 * Math.PI,
    Math.random() * 2 * Math.PI,
    Math.random() * 2 * Math.PI,
  ];
  floatingBuoy.rotVelocity = [Math.random(), Math.random(), Math.random()];

  return floatingBuoy;
}

function makeLookout(label) {
  const pillar = generateCylinderObject(label, rgb(255, 255, 255), 32, 1, 10, {
    segments_h: 2,
  });
  pillar.materialLabel = MATERIAL_WOOD;
  pillar.materialLabelSecondary = MATERIAL_FLAT;
  pillar.rotation[0] = Math.PI / 2;

  const platform = generateCubeObject(label + "_platform", rgb(255, 255, 255));
  platform.scale = [3, 3, 0.25];
  platform.position = [0, 0, -5];
  platform.materialLabel = MATERIAL_WOOD;
  platform.materialLabelSecondary = MATERIAL_FLAT;
  pillar.addChild(platform);

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      let color = colors.greenRupee;
      if(i == 1 && j ==1){
        color = colors.blueRupee
      }
      const rupee = makeRupee(label + "_rupee", color);
      rupee.position = [(i-1) * 1.5, (j-1) * 1.5, -6];
      pillar.addChild(rupee);
    }
  }

  return pillar;
}

function makeRupee(label, color = colors.greenRupee) {
  const rupee = generateNGonPrismObject(label, color, 6, 0.5, 0.35, {
    bulge: 0.5,
  });
  rupee.vertices = new Float32Array(
    transformVertices(rupee.vertices, mat4RotateZ(mat4Identity(), Math.PI / 6)),
  );
  rupee.materialLabel = MATERIAL_SHINY;
  rupee.rotation[0] = Math.PI / 2;
  rupee.scale[0] = 0.5;

  rupee.setUpdateCB(function (dt) {
    this.rotation[2] += (dt * Math.PI) / 3;
  });

  return rupee;
}
