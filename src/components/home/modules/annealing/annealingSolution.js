import { Vector3 } from 'three';
import {
  ACCEPTANCE_THRESHOLD,
  TEMPERATURE_THRESHOLD,
  TEMPERATURE_DECREASE_FACTOR,
  RENDER_PRECISION,
} from './AnnealingConstants';

const imgWidth = 0.75;
const imgHeight = 0.5;
const halfWidth = imgWidth / 2;
const halfHeight = imgHeight / 2;

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
    x: Math.round(xPos * RENDER_PRECISION) / RENDER_PRECISION,
    y: Math.round(yPos * RENDER_PRECISION) / RENDER_PRECISION
  };
}

export default class AnnealingSolution {
  constructor(width, height, searchSpace) {
    this.greyScaleValue = Math.random();
    this.isVisible = false;
    this.position = new Vector3(0, 0, this.greyScaleValue * -0.0125);
  }

  reset(searchSpace, width, height) {
    this.width = width;
    this.height = height;
    this.isVisible = false;
    this.temperature = 10;
    this.currentDistance = 99999;
    this.isSettled = false;
    this.currentSolution = generateNewSolution(searchSpace);
    searchSpace[this.currentSolution].isOccupied = true;
  }

  setVisibility(isVisible) {
    this.isVisible = isVisible;
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
    this.position.x = position.x;
    this.position.y = position.y;
  }

  getPosition() {
    return this.position;
  }

  getCurrentSolution() {
    return this.currentSolution;
  }
}
