import { Vector3 } from 'three';
import {
  ACCEPTANCE_THRESHOLD,
  TEMPERATURE_THRESHOLD,
  TEMPERATURE_DECREASE_FACTOR,
  RENDER_PRECISION,
} from './AnnealingConstants';

const zPositionScale = -0.00125;

function generateNewSolution(searchSpace) {
  let proposedSolution = Math.floor(searchSpace.length * Math.random());
  while(searchSpace[proposedSolution].isOccupied) {
    proposedSolution = Math.floor(searchSpace.length * Math.random());
  }
  return proposedSolution;
}

function getPositionFromSearchSpace(index, imgDims, displayDims) {
  const x = (index % imgDims.width) / imgDims.width;
  const y = (Math.floor(index / imgDims.width)) / imgDims.height;
  const xPos = (x * displayDims.width) - (displayDims.width / 2);
  const yPos = (-y * displayDims.height) + (displayDims.height / 2);
  return {
    x: Math.round(xPos * RENDER_PRECISION) / RENDER_PRECISION,
    y: Math.round(yPos * RENDER_PRECISION) / RENDER_PRECISION
  };
}

export default class AnnealingSolution {
  constructor() {
    this.greyScaleValue = Math.random();
    this.isVisible = false;
    this.position = new Vector3(0, 0, this.greyScaleValue * zPositionScale);
  }

  reset(searchSpace, imgDims, displayDims) {
    this.imgDims = imgDims;
    this.displayDims = displayDims;
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
    const position = getPositionFromSearchSpace(searchSpace[this.currentSolution].index, this.imgDims, this.displayDims);
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
