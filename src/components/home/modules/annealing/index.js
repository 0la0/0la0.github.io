import { Scene } from 'three';
import React from 'react';
import { getPosNeg } from 'components/home/modules/mathUtil';
import { loadImage, getImageData, getGreyScaleArray } from 'components/home/modules/imageUtil';
import AnnealingSolution from './annealingSolution';
import SimulatedAnnealing from './simulatedAnnealing';

const NUM_CANDIDATES = 3000;
const NUM_ACTIVE_CANDIDATES = 100;


const imagePaths = [
  'assets/images/sketches/gradient.jpg',
  'assets/images/sketches/trees.jpg'
];

function loadImageTexture(imagePath) {
  return loadImage(imagePath)
    .then((imgSrc) => Promise.all([
      Promise.resolve({ width: imgSrc.width, height: imgSrc.height }),
      getImageData(imgSrc)
    ]))
    .then(([ imgDims, imageData ]) => Promise.all([
      Promise.resolve(imgDims),
      getGreyScaleArray(imageData)
    ]))
    .then(([imgDims, greyScaleArray]) => Promise.resolve({ imgDims, greyScaleArray }));
}

export default class AnnealingPhotos {
  constructor() {
    this.scene = new Scene();
    this.activeIndex = 1;

    // TODO: instantiate candidates, add reset method
    
    const loadImages = imagePaths.map(imagePath => loadImageTexture(imagePath));
    Promise.all(loadImages)
      .then(imageData => {
        this.imageData = imageData;
        this.startNewImage();
      });
  }

  startNewImage() {
    const { imgDims, greyScaleArray } = this.imageData[this.activeIndex];
    const searchSpace = greyScaleArray.map((value, index) => ({ value, index, isOccupied: false }));
    const candidateQueue = new Array(NUM_CANDIDATES).fill(null).map(() => new AnnealingSolution(imgDims.width, imgDims.height, searchSpace));
    candidateQueue.forEach(candidate => this.scene.add(candidate.getMesh()));
    this.simulatedAnnealing = new SimulatedAnnealing(searchSpace, candidateQueue, NUM_ACTIVE_CANDIDATES, imgDims.width, imgDims.height);
  }

  update() {
    if (!this.simulatedAnnealing) { return; }
    if (this.simulatedAnnealing.iterate()) {
      console.log('startOver')
      this.activeIndex = (this.activeIndex + 1) % this.imageData.length;
      this.startNewImage();
    }
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
