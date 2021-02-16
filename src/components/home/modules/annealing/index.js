import { Raycaster, Scene, Vector2 } from 'three';
import React from 'react';
import { getRandomIntegerInRange } from 'components/home/modules/mathUtil';
import AnnealingSolution from './annealingSolution';
import SimulatedAnnealing from './simulatedAnnealing';
import AnnealingRenderer from './AnnealingRenderer';
import ImagePreview from './ImagePreview';
import { imagePaths, loadAllTextures, } from './ImageUtil';
import {
  NUM_CANDIDATES, NUM_ACTIVE_CANDIDATES,
  RENDER_WIDTH, PAUSE_TIME, DISSENTEGRATE_TIME,
} from './AnnealingConstants';

const RENDER_STATE = {
  ANNEALING: 'ANNEALING',
  PAUSED: 'PAUSED',
  DISSENTEGRATING: 'DISSENTEGRATING',
};

export default class AnnealingPhotos {
  constructor() {
    this.scene = new Scene();
    this.activeIndex = getRandomIntegerInRange(imagePaths.length);
    this.candidateQueue = new Array(NUM_CANDIDATES).fill(null).map(() => new AnnealingSolution());
    this.frameCount = 0;
    this.isActive = false;
    this.raycaster = new Raycaster();
    this.lastRenderTime = performance.now();
    this.simulatedAnnealing = new SimulatedAnnealing(this.candidateQueue, NUM_ACTIVE_CANDIDATES);
    this.annealingRenderer = new AnnealingRenderer(this.candidateQueue);
    this.imagePreview = new ImagePreview();
    this.scene.add(this.annealingRenderer.getMesh());
    this.scene.add(this.imagePreview.getMesh());
    this.renderState = RENDER_STATE.ANNEALING;
    this.pausedTimer = PAUSE_TIME;
    this.dissentegrateTimer = 0;
    
    this.renderStrategy = {
      [RENDER_STATE.ANNEALING]: this._updateAnnealing.bind(this),
      [RENDER_STATE.PAUSED]: this._updatePaused.bind(this),
      [RENDER_STATE.DISSENTEGRATING]: this._updateDissentegrating.bind(this),
    };

    loadAllTextures()
      .then(imageData => {
        this.imageData = imageData;
        this.startNewImage();
      })
      .catch(console.log);
  }

  startNewImage() {
    const { imgDims, greyScaleArray, imagePath } = this.imageData[this.activeIndex];
    const displayDims = {
      width: RENDER_WIDTH,
      height: imgDims.height / imgDims.width * RENDER_WIDTH,
    };
    const searchSpace = greyScaleArray.map((value, index) => ({ value, index, isOccupied: false }));
    this.candidateQueue.forEach(candidate => candidate.reset(searchSpace, imgDims, displayDims));
    this.simulatedAnnealing.reset(searchSpace);
    this.imagePreview.reset(displayDims, imagePath);
  }

  update(now) {
    const elapsedTime = Math.min(now - this.lastRenderTime, 100);
    this.lastRenderTime = now;
    this.renderStrategy[this.renderState](elapsedTime);
  }

  _updateAnnealing(elapsedTime) {
    if (!this.simulatedAnnealing.searchSpace) {
      return;
    }
    const isFinished = this.simulatedAnnealing.iterate();
    if (isFinished) {
      this.annealingRenderer.update();
      this.imagePreview.update(elapsedTime);
      this.pausedTimer = PAUSE_TIME;
      this.renderState = RENDER_STATE.PAUSED;
      return;
    }
    if (this.frameCount++ % 3 === 0) {
      this.annealingRenderer.update();
    }
    this.imagePreview.update(elapsedTime);
  }

  _updatePaused(elapsedTime) {
    this.pausedTimer -= elapsedTime;
    this.imagePreview.update(elapsedTime);
    if (this.pausedTimer <= 0) {
      this.renderState = RENDER_STATE.DISSENTEGRATING;
      this.imagePreview.disable();
    }
  }

  _updateDissentegrating(elapsedTime) {
    this.candidateQueue.forEach(candidate => candidate.dissentegrate(elapsedTime, this.dissentegrateTimer));
    this.annealingRenderer.update();
    this.dissentegrateTimer += elapsedTime;
    if (this.dissentegrateTimer >= DISSENTEGRATE_TIME) {
      this.dissentegrateTimer = 0;
      this.renderState = RENDER_STATE.ANNEALING;
      this.activeIndex = (this.activeIndex + 1) % this.imageData.length;
      this.startNewImage();
    }
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
