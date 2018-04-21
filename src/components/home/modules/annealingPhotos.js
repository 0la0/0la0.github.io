import {
  Color,
  Scene,
  PlaneGeometry,
  MeshBasicMaterial,
  Mesh,
} from 'three';
import { getPosNeg } from 'components/home/modules/mathUtil';
import { loadImage, getImageData, getGreyScaleArray } from 'components/home/modules/imageUtil';

const NUM_CANDIDATES = 2000;
const NUM_ACTIVE_CANDIDATES = 100;
const ACCEPTANCE_THRESHOLD = 0.01;
const TEMPERATURE_THRESHOLD = 0.1;
const TEMPERATURE_DECREASE_FACTOR = 0.93;

const imgWidth = 0.75;
const imgHeight = 0.5;
const halfWidth = imgWidth / 2;
const halfHeight = imgHeight / 2;
const precision = 100;

function getRandomMesh(greyscaleValue) {
  const scale = 0.009;
  const geometry = new PlaneGeometry(scale, scale);
  const material = new MeshBasicMaterial({ color: new Color(greyscaleValue, greyscaleValue, greyscaleValue)});
  const mesh = new Mesh(geometry, material);
  return mesh;
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

function generateNewSolution(searchSpace) {
  let proposedSolution = Math.floor(searchSpace.length * Math.random());
  while(searchSpace[proposedSolution].isOccupied) {
    proposedSolution = Math.floor(searchSpace.length * Math.random());
  }
  return proposedSolution;
}

class AnnealingSolution {
  constructor(width, height, searchSpace) {
    this.width = width;
    this.height = height;
    this.greyScaleValue = Math.random();
    this.mesh = getRandomMesh(this.greyScaleValue);
    this.mesh.visible = false;
    this.temperature = 10;
    this.currentDistance = 99999;
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

class SimulatedAnnealing {
  constructor(searchSpace, candidateQueue, width, height) {
    this.searchSpace = searchSpace;
    this.candidateQueue = candidateQueue;
    this.width = width;
    this.height = height;
    this.candidates = this.candidateQueue.splice(0, NUM_ACTIVE_CANDIDATES);
    this.candidates.forEach(candidate => candidate.setVisibility(true));
  }

  iterate() {
    const settledCandidates = this.candidates.filter(candidate => candidate.isSettled);
    this.candidates = this.candidates.filter(candidate => !candidate.isSettled);
    this.candidates.forEach((candidate) => candidate.iterate(this.searchSpace));
    const newCandidates = this.candidateQueue.splice(0, settledCandidates.length);
    newCandidates.forEach(candidate => {
      candidate.setVisibility(true)
      this.candidates.push(candidate);
    });
  }
}

// https://github.com/0la0/0la0.github.io.source/blob/master/app/elements/home/simulated-annealing.html
export default class AnnealingPhotos {
  constructor() {
    this.scene = new Scene();


    this.width;
    this.height;
    loadImage('assets/images/sketches/trees.jpg')
      .then(imageSrc => {
        this.width = imageSrc.width;
        this.height = imageSrc.height;
        return getImageData(imageSrc);
      })
      .then(imageData => getGreyScaleArray(imageData))
      .then(greyScaleArray => {
        const searchSpace = greyScaleArray.map((value, index) => ({ value, index, isOccupied: false }));
        const candidateQueue = new Array(3000).fill(null).map(() => new AnnealingSolution(this.width, this.height, searchSpace));
        candidateQueue.forEach(candidate => this.scene.add(candidate.getMesh()));
        this.simulatedAnnealing = new SimulatedAnnealing(searchSpace, candidateQueue, this.width, this.height);
      })
      .catch(error => console.log(error))
  }

  update() {
    if (!this.simulatedAnnealing) { return; }
    this.simulatedAnnealing.iterate();
  }

  render(renderer, camera) {
    this.update();
    renderer.render(this.scene, camera);
  }

  getAboutAnimationText() {
    return 'TODO: about simulated annealing';
  }
}
