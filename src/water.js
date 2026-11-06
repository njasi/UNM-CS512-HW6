/**
 * Make a vec2 analogous to glsl vec2 type constructor
 * @param {float} a
 * @param {float} b
 * @returns
 */
function vec2(a, b) {
  return [a, b];
}

/**
 * Dot product between two vec2
 * @param {vec2} a
 * @param {vec2} b
 */
function dot(a, b) {
  return a[0] * b[0] + a[1] * b[1];
}

/**
 * Normalize a vec2
 * @param {vec2} a
 */
function normalize(a) {
  const mag = Math.hypot(...a);
  return [a[0] / mag, a[1] / mag];
}

/**
 * Function to determine the water level at a given time and position
 * This mirrors the calculation in the vertex shader
 *
 * @param {number[]} position three tuple position x,y,z
 * @param {number} time scene time elapsed in seconds
 */
export function waterLevel(
  position,
  time,
  { waveAmplitude = 1.5, PI = 3.14159 } = {},
) {
  const xz = [position[0], position[2]];

  let yWave = 0;
  yWave += waveAmplitude * 1 * Math.sin(2.0 * PI - time / 20);
  //   console.log("wave height1:", yWave);
  yWave +=
    waveAmplitude *
    0.3 *
    Math.sin((dot(xz, normalize(vec2(0.5, 1))) * 2.0 * PI) / 20 - time / 2);
  //   console.log("wave height2:", yWave);
  yWave +=
    waveAmplitude *
    0.2 *
    Math.sin((dot(xz, normalize(vec2(-0.4, 0.3))) * 2.0 * PI) / 15 - time);

  //   console.log("time:", time);
  //   console.log("position:", position);
  //   console.log("wave height3:", yWave);
  return yWave;
}
