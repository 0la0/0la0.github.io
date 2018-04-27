import {
  Color,
  Scene,
  PlaneGeometry,
  MeshBasicMaterial,
  Mesh,
  DoubleSide,
} from 'three';
import React from 'react';
import { getPosNeg } from 'components/home/modules/mathUtil';
import { loadImage, getImageData, getGreyScaleArray } from 'components/home/modules/imageUtil';
import AnnealingSolution from './annealingSolution';
import SimulatedAnnealing from './simulatedAnnealing';

const NUM_CANDIDATES = 2000;
const NUM_ACTIVE_CANDIDATES = 100;

// https://github.com/0la0/0la0.github.io.source/blob/master/app/elements/home/simulated-annealing.html
export default class AnnealingPhotos {
  constructor() {
    this.scene = new Scene();


    this.width;
    this.height;
    loadImage('assets/images/sketches/gradient.jpg')
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
        this.simulatedAnnealing = new SimulatedAnnealing(searchSpace, candidateQueue, NUM_ACTIVE_CANDIDATES, this.width, this.height);
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
    return (
      <p>
        <span>
          This animation is an approximation of an image using
        </span>
        <a href="">
          simulated annealing.
        </a>
        <span>
        </span>
      </p>
    );
  }

  start() {}
}
