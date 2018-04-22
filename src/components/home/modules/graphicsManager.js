import 'three/OrbitControls';
import { WebGLRenderer, PerspectiveCamera } from 'three';
import { OrbitControls } from 'three';
import TestScene from './TestScene';
import TestScene2 from './TestScene2';
import Annealing from './annealing';
import Pso from './pso';

class GraphicsManager {
  constructor() {
    this.isInRenderLoop = false;
    this.animationRequest;
    this.activeScene;
    this.scenes = [];
  }

  init(canvas) {
    this.renderer = new WebGLRenderer({canvas,  antialias: true});
  	this.renderer.setClearColor(0x282c34, 1); // TODO: background color
    this.camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 200);
  	this.camera.position.z = 1;
    this.orbitControls = new OrbitControls(this.camera, canvas);
    this.orbitControls.enabled = false;
    this.orbitControls.minDistance = 0.25;
    this.orbitControls.maxDistance = 3;
    this.scenes = [
      new TestScene(canvas),
      // new TestScene2(canvas),
      new Annealing(canvas),
      new Pso(canvas),
    ];
    // this.activeScene = this.scenes[ Math.floor(this.scenes.length * Math.random()) ];
    this.activeScene = this.scenes[2];
    this.onResize();
    return this;
  }

  getRandomSceneIndex() {
    return Math.floor(this.scenes.length * Math.random());
  }

  startAnimation() {
    if (this.isInRenderLoop) { return; }
    this.isInRenderLoop = true;
    this.orbitControls.enabled = true;
    this.animate();
  }

  stopAnimation() {
    this.isInRenderLoop = false;
    this.orbitControls.enabled = false;
    console.log(this.orbitControls.enabled)
    cancelAnimationFrame(this.animationRequest);
  }

  animate() {
    this.orbitControls.update();
    this.activeScene.render(this.renderer, this.camera);
    if (this.isInRenderLoop) {
      this.animationRequest = requestAnimationFrame(this.animate.bind(this));
    }
  }

  shuffleAnimations() {
    let nextScene = this.activeScene;
    while (nextScene === this.activeScene) {
      const index = Math.floor(this.scenes.length * Math.random());
      nextScene = this.scenes[index];
    }
    this.activeScene = nextScene;
  }

  onResize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    this.camera.aspect = width / height;
		this.camera.updateProjectionMatrix();
		this.renderer.setSize(width, height);
    if (!this.isInRenderLoop) {
      this.animate();
    }
  }

  getAboutAnimationText() {
    return this.activeScene && this.activeScene.getAboutAnimationText();
  }
}

const graphicsManager = new GraphicsManager();
export default graphicsManager;
