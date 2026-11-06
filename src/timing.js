import { setGlobalLight } from "./light";
import { colors, setWaterColorRamp } from "./materials";

const colorTimeMapping = [
  {
    time: 8,
    back: colors.water,
    shadow: colors.waterDark,
    foam: colors.waterFoam,
    global: colors.globalLightDay,
    globalIntensity: 1,
  },
  {
    time: 9,
    back: colors.waterNight,
    shadow: colors.waterNightDark,
    foam: colors.waterFoamNight,
    global: colors.globalLightNight,
    globalIntensity: 0.3,
  },
  {
    time: 18,
    back: colors.waterNight,
    shadow: colors.waterNightDark,
    foam: colors.waterFoamNight,
    global: colors.globalLightNight,
    globalIntensity: 0.3,
  },
  {
    time: 20,
    back: colors.water,
    shadow: colors.waterDark,
    foam: colors.waterFoam,
    global: colors.globalLightDay,
    globalIntensity: 1,
  },
];

/**
 * Interpolate colors between two frames
 * (taken from the bvh loader maybe i make this a helper?)
 *
 * @param {number[]} colors two tuple of the prev position and the next position
 * @param {number} ratio the ratio between the two points
 * @returns {number}
 */
function interpolateColor(colors, ratio) {
  return [0, 1, 2].map(
    (i) => (1 - ratio) * colors[0][i] + ratio * colors[1][i],
  );
}

/**
 * Duh
 * @param {*} vals
 * @param {*} ratio
 * @returns
 */
function interpolateNumber(vals, ratio) {
  return (1 - ratio) * vals[0] + ratio * vals[1];
}

/**
 * Set the color of the water according to the time of the scene
 * which is hopefully in sync with the video
 * @param {number} time scene time in seconds
 */
export function setEnvironmentColor(time) {
  const loopedTime = ((time % 30) + 30) % 30;

  let prev = colorTimeMapping[0];
  let next = { ...colorTimeMapping[0], time: 30 };
  for (let i = 0; i < colorTimeMapping.length; i++) {
    const frame = colorTimeMapping[i];
    const following = colorTimeMapping[i + 1] ?? {
      ...colorTimeMapping[0],
      time: 30,
    };
    if (loopedTime >= frame.time && loopedTime < following.time) {
      prev = frame;
      next = following;
      break;
    }
  }

  const ratio = (loopedTime - prev.time) / (next.time - prev.time);

  setGlobalLight(
    interpolateColor([prev.global, next.global], ratio),
    interpolateNumber([prev.globalIntensity, next.globalIntensity], ratio),
  );

  setWaterColorRamp(
    interpolateColor([prev.shadow, next.shadow], ratio),
    interpolateColor([prev.back, next.back], ratio),
    interpolateColor([prev.foam, next.foam], ratio),
  );
}
