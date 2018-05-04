import {
  Color,
  PlaneGeometry,
  MeshBasicMaterial,
  Mesh,
  DoubleSide,
} from 'three';

const ACCEPTANCE_THRESHOLD = 0.01;
const TEMPERATURE_THRESHOLD = 0.1;
const TEMPERATURE_DECREASE_FACTOR = 0.93;
const imgWidth = 0.75;
const imgHeight = 0.5;
const halfWidth = imgWidth / 2;
const halfHeight = imgHeight / 2;
const precision = 100;

function getRandomMesh(greyscaleValue) {
  const scale = 0.01;
  const geometry = new PlaneGeometry(scale, scale);
  const material = new MeshBasicMaterial({
    color: new Color(greyscaleValue, greyscaleValue, greyscaleValue),
    side: DoubleSide
  });
  const mesh = new Mesh(geometry, material);
  return mesh;
}

function generateNewSolution(searchSpace) {
  let proposedSolution = Math.floor(searchSpace.length * Math.random());
  while(searchSpace[proposedSolution].isOccupied) {
    proposedSolution = Math.floor(searchSpace.length * Math.random());
  }
  return proposedSolution;
}

function getPositionFromSearchSpace(searchSpace, index, width, height) {
  const x = ((index) % width) / width;
  const y = (Math.floor(index / width)) / height;
  const xPos = (x * imgWidth) - halfWidth;
  const yPos = (-y * imgHeight) + halfHeight;
  return {
    x: Math.round(xPos * precision) / precision,
    y: Math.round(yPos * precision) / precision
  };
}

export default class AnnealingSolution {
  constructor(width, height, searchSpace) {
    this.greyScaleValue = Math.random();
    this.mesh = getRandomMesh(this.greyScaleValue);
    this.mesh.position.z = this.greyScaleValue * 0.05
  }

  reset(searchSpace, width, height) {
    this.width = width;
    this.height = height;
    this.mesh.visible = false;
    this.temperature = 10;
    this.currentDistance = 99999;
    this.isSettled = false;
    this.currentSolution = generateNewSolution(searchSpace);
    searchSpace[this.currentSolution].isOccupied = true;
  }

  setVisibility(isVisible) {
    this.mesh.visible = isVisible;
  }

  // annealing schedule
  iterate(searchSpace) {
    const proposedSolution = generateNewSolution(searchSpace);
    const proposedDistance = Math.abs(this.greyScaleValue - searchSpace[proposedSolution].value);

    // if proposed solution is better, take it
    if (proposedDistance < this.currentDistance) {
      this.setNewPosition(proposedSolution, proposedDistance, searchSpace);
    }
    // take worse solution based on acceptance probability
    else {
      const normalizedDistance = -(proposedDistance - this.currentDistance) / this.temperature;
      const probabilityOfAcceptance = Math.exp(normalizedDistance);
      if (Math.random() < probabilityOfAcceptance) {
        this.setNewPosition(proposedSolution, proposedDistance, searchSpace);
      }
    }

    if (this.temperature <= TEMPERATURE_THRESHOLD || proposedDistance < ACCEPTANCE_THRESHOLD) {
      this.isSettled = true;
    }
    else {
      this.temperature *= TEMPERATURE_DECREASE_FACTOR;
    }
  }

  setNewPosition(proposedSolution, proposedDistance, searchSpace) {
    searchSpace[this.currentSolution].isOccupied = false;
    searchSpace[proposedSolution].isOccupied = true;
    this.currentSolution = proposedSolution;
    this.currentDistance = proposedDistance;
    const position = getPositionFromSearchSpace(searchSpace, searchSpace[this.currentSolution].index, this.width, this.height);
    this.mesh.position.x = position.x;
    this.mesh.position.y = position.y;
  }

  getMesh() {
    return this.mesh;
  }

  getCurrentSolution() {
    return this.currentSolution;
  }
}
