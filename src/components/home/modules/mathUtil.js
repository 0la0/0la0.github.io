import {
  Vector3,
} from 'three';

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

export {
  getPosNeg,
  getRandomVector
};
