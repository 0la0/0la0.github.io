import { WebGLRenderer, PerspectiveCamera } from 'three';
import Stats from 'stats.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// import Annealing from './annealing';
import Pso from './pso';
import ConnectedGraph from './connectedGraph';

const STATS_ENABLED = false;

let stats;
if (STATS_ENABLED) {
  stats = new Stats();
  stats.showPanel(0);
  document.body.appendChild( stats.dom );
}

class GraphicsManager {
  constructor() {
    this.isInRenderLoop = false;
    this.animationRequest;
    this.activeScene;
    this.scenes = [];
  }

  init(canvas) {
    this.renderer = new WebGLRenderer({canvas,  antialias: true , alpha: true});
  	this.renderer.setClearColor(0x282c34, 1);
    this.camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.05, 7);
  	this.camera.position.z = 1;
    this.orbitControls = new OrbitControls(this.camera, canvas);
    this.orbitControls.enabled = false;
    this.orbitControls.minDistance = 0.25;
    this.orbitControls.maxDistance = 3;
    this.scenes = [
      // new Annealing(canvas),
      // new Pso(canvas) ,
      new ConnectedGraph(canvas),
    ];
    this.activeIndex = this.getRandomSceneIndex();
    this.activeScene = this.scenes[this.activeIndex];
    this.onResize();
    return this;
  }

  getRandomSceneIndex() {
    return Math.floor(this.scenes.length * Math.random());
  }

  startAnimation() {
    if (this.isInRenderLoop) { return; }
    if (!this.activeScene) { return; }
    this.isInRenderLoop = true;
    this.orbitControls.enabled = true;
    this.activeScene.start();
    this.animate();
  }

  stopAnimation() {
    this.isInRenderLoop = false;
    this.orbitControls.enabled = false;
    cancelAnimationFrame(this.animationRequest);
  }

  animate() {
    stats && stats.begin();
    this.orbitControls.update();
    this.activeScene.render(this.renderer, this.camera, performance.now());
    stats && stats.end();
    if (this.isInRenderLoop) {
      this.animationRequest = requestAnimationFrame(this.animate.bind(this));
    }
  }

  shuffleAnimations() {
    this.activeIndex = (this.activeIndex + 1) % this.scenes.length;
    this.activeScene = this.scenes[this.activeIndex];
    if (!this.activeScene) {
      return;
    }
    this.activeScene.start();
    this.orbitControls.reset();
  }

  onResize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    this.camera.aspect = width / height;
		this.camera.updateProjectionMatrix();
		this.renderer.setSize(width, height);
    if (!this.isInRenderLoop && this.activeScene) {
      this.animate();
    }
  }

  getAboutAnimationText() {
    return this.activeScene && this.activeScene.getAboutAnimationText();
  }
}

const graphicsManager = new GraphicsManager();
export default graphicsManager;
