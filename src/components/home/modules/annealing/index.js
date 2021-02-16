import { Raycaster, Scene, Vector2 } from 'three';
import React from 'react';
import { getRandomIntegerInRange } from 'components/home/modules/mathUtil';
import { loadImage, getImageData, getGreyScaleArray } from 'components/home/modules/imageUtil';
import AnnealingSolution from './annealingSolution';
import SimulatedAnnealing from './simulatedAnnealing';
import AnnealingRenderer from './AnnealingRenderer';
import ImagePreview from './ImagePreview';
import { NUM_CANDIDATES, NUM_ACTIVE_CANDIDATES, } from './AnnealingConstants';

const imagePaths = [
  // 'assets/images/sketches/bike01.jpg',
  'assets/images/sketches/bike02.jpg',
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
    .then(([imgDims, greyScaleArray]) => Promise.resolve({ imgDims, greyScaleArray, imagePath, }));
}

export default class AnnealingPhotos {
  constructor() {
    this.scene = new Scene();
    this.activeIndex = getRandomIntegerInRange(imagePaths.length);
    this.candidateQueue = new Array(NUM_CANDIDATES).fill(null).map(() => new AnnealingSolution());
    const loadImages = imagePaths.map(imagePath => loadImageTexture(imagePath));
    Promise.all(loadImages)
      .then(imageData => {
        this.imageData = imageData;
        this.startNewImage(imageData);
      });
    this.frameCount = 0;
    this.isActive = false;
    this.raycaster = new Raycaster();
    this.lastRenderTime = performance.now();
  }

  startNewImage() {
    const { imgDims, greyScaleArray, imagePath } = this.imageData[this.activeIndex];
    const displayDims = {
      width: 1,
      height: imgDims.height / imgDims.width,
    };
    const searchSpace = greyScaleArray.map((value, index) => ({ value, index, isOccupied: false }));
    this.candidateQueue.forEach(candidate => candidate.reset(searchSpace, imgDims, displayDims));
    this.simulatedAnnealing = new SimulatedAnnealing(searchSpace, this.candidateQueue, NUM_ACTIVE_CANDIDATES);
    this.annealingRenderer = new AnnealingRenderer(this.candidateQueue);
    this.scene.add(this.annealingRenderer.getMesh());
    this.imagePreview = new ImagePreview(displayDims, imagePath);
    this.scene.add(this.imagePreview.getMesh());
  }

  update(now) {
    const elapsedTime = Math.min(now - this.lastRenderTime, 100);
    this.lastRenderTime = now;
    if (!this.simulatedAnnealing) { return; }
    this.simulatedAnnealing.iterate();
    // if (this.simulatedAnnealing.iterate()) {
    //   this.activeIndex = (this.activeIndex + 1) % this.imageData.length;
    //   this.startNewImage();
    // }
    if (this.annealingRenderer && (this.frameCount++ % 3 === 0)) {
      this.annealingRenderer.update();
    }
    this.imagePreview.update(elapsedTime);
  }

  render(renderer, camera, now) {
    this.update(now);
    renderer.render(this.scene, camera);
  }

  getAboutAnimationText() {
    return (
      <p>
        This animation is an approximation of an image using &nbsp;
        <a href="https://en.wikipedia.org/wiki/Simulated_annealing">
          simulated annealing
        </a>
        .&nbsp; The image is treated as a complete graph where each pixel is a vertex. There are 500 search candidates, each represented as a pixel with an arbitrary value. When a candidate finds a solution, it is permanently painted to the image and a new candidate is generated. As the algorithm runs, the image becomes more realistic.
        &nbsp;
        <a href="https://github.com/0la0/0la0.github.io/tree/develop/src/components/home/modules/annealing">
          View Source
        </a>
      </p>
    );
  }

  start() {}

  onClick(event, camera) {
    this.imagePreview?.onClick(event, camera);
  }
}
