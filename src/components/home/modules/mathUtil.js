import {
  Vector3,
} from 'three';

const TWO_PI = 2 * Math.PI;

function getPosNeg() {
  return Math.random() < 0.5 ? -1 : 1;
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function getRandomVector(magnitude) {
  return new Vector3(
    getPosNeg() * magnitude * Math.random(),
    getPosNeg() * magnitude * Math.random(),
    getPosNeg() * magnitude * Math.random()
  );
}

function getRandomNumberInRange(range = 0) {
  return Math.floor(range * Math.random());
}

// function getRandomNumberInPosNegRange(range = 0) {
//   return Math.floor(range * Math.random());
// }

export {
  clamp,
  getRandomNumberInRange,
  getRandomVector,
  getPosNeg,
  TWO_PI,
};
