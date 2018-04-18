import AugmentedEffects from 'components/projects/modules/projects/augmentedEffects';
import BezierCurves from 'components/projects/modules/projects/BezierCurves';
import BrowserSampler from 'components/projects/modules/projects/BrowserSampler';
import ColorScroll from 'components/projects/modules/projects/ColorScroll';
import CubeBlaster from 'components/projects/modules/projects/CubeBlaster';
import DocumentClassification from 'components/projects/modules/projects/documentClassification';
import GaTriangles from 'components/projects/modules/projects/gaTriangles';
import GaViz from 'components/projects/modules/projects/gaViz';
import ImageWaterfall from 'components/projects/modules/projects/imageWaterfall';
import MatterOfScale from 'components/projects/modules/projects/matterOfScale';
import ParticleRemix from 'components/projects/modules/projects/particleRemix';
import PixelWalk from 'components/projects/modules/projects/pixelWalk';
import PsoViz from 'components/projects/modules/projects/psoViz';
import ShapeClassification from 'components/projects/modules/projects/shapeClassification';
import SimilarShapes from 'components/projects/modules/projects/similarShapes';
import TaylorApproximations from 'components/projects/modules/projects/taylorApproximations';
import TouchLib from 'components/projects/modules/projects/touchLib';
import TouchSynth from 'components/projects/modules/projects/touchSynth';

const projectRoutes = [
  {
    label: 'Augumented Effects',
    path: '/projects/augmentedEffects',
    component: AugmentedEffects,
    thumbnail: 'assets/images/projects/thumbs/augmentedEffects.jpg',
    description: 'Applying real-time effects to web-cam in the browser',
  },
  {
    label: 'Bezier Curves',
    path: '/projects/bezierCurves',
    component: BezierCurves,
    thumbnail: 'assets/images/projects/thumbs/bezierCurves.jpg',
    description: 'An exploration of Bezier Curves',
  },
  {
    label: 'Browser Sampler',
    path: '/projects/browserSampler',
    component: BrowserSampler,
    thumbnail: 'assets/images/projects/thumbs/browserSampler.jpg',
    description: 'An audio sampler and granular synth with Web Audio API',
  },
  {
    label: 'Color Scroll',
    path: '/projects/colorScroll',
    component: ColorScroll,
    thumbnail: 'assets/images/projects/thumbs/colorScroll.jpg',
    description: 'Scroll a web page using colors',
  },
  {
    label: 'Cube Blaster',
    path: '/projects/cubeBlaster',
    component: CubeBlaster,
    thumbnail: 'assets/images/projects/thumbs/cubeBlaster.jpg',
    description: 'Blast shapes into planes',
  },
  {
    label: 'Document Classification',
    path: '/projects/documentClassification',
    component: DocumentClassification,
    thumbnail: 'assets/images/projects/thumbs/documentClassification.jpg',
    description: 'Naive Bayes with user generated content',
  },
  {
    label: 'GA Triangles',
    path: '/projects/gaTriangles',
    component: GaTriangles,
    thumbnail: 'assets/images/projects/thumbs/gaTriangles.jpg',
    description: 'Interpreting Evolutionary Maps',
  },
  {
    label: 'GA Viz',
    path: '/projects/gaViz',
    component: GaViz,
    thumbnail: 'assets/images/projects/thumbs/gaViz.jpg',
    description: 'Visualizing genetic optimization in continuous space',
  },
  {
    label: 'Image Waterfall',
    path: '/projects/imageWaterfall',
    component: ImageWaterfall,
    thumbnail: 'assets/images/projects/thumbs/imageWaterfall.jpg',
    description: 'A program that applies a waterfall effect to images',
  },
  {
    label: 'Matter Of Scale',
    path: '/projects/matterOfScale',
    component: MatterOfScale,
    thumbnail: 'assets/images/projects/thumbs/matterOfScale.jpg',
    description: 'An interactive installation',
  },
  {
    label: 'Particle Remix',
    path: '/projects/particleRemix',
    component: ParticleRemix,
    thumbnail: 'assets/images/projects/thumbs/particleRemix.jpg',
    description: 'Real-time visual sampling',
  },
  {
    label: 'Pixel Walk',
    path: '/projects/pixelWalk',
    component: PixelWalk,
    thumbnail: 'assets/images/projects/thumbs/pixelWalk.jpg',
    description: 'Pixels go on a random walk',
  },
  {
    label: 'PSO Viz',
    path: '/projects/psoViz',
    component: PsoViz,
    thumbnail: 'assets/images/projects/thumbs/psoViz.jpg',
    description: 'Visualizing particle optimization in continuous space',
  },
  {
    label: 'Shape Classification',
    path: '/projects/shapeClassification',
    component: ShapeClassification,
    thumbnail: 'assets/images/projects/thumbs/shapeClassification.jpg',
    description: 'Predictive shape classification',
  },
  {
    label: 'Similar Shapes',
    path: '/projects/similarShapes',
    component: SimilarShapes,
    thumbnail: 'assets/images/projects/thumbs/similarShapes.jpg',
    description: 'Querying a database with guestures',
  },
  {
    label: 'Taylor Approximations',
    path: '/projects/taylorApproximations',
    component: TaylorApproximations,
    thumbnail: 'assets/images/projects/thumbs/taylorApproximations.jpg',
    description: 'Visualizing taylor approximation of a sinusoid',
  },
  {
    label: 'TouchLib',
    path: '/projects/touchLib',
    component: TouchLib,
    thumbnail: 'assets/images/projects/thumbs/touchLib.jpg',
    description: 'An intuitive and responsive UI touch library for browsers',
  },
  {
    label: 'Touch Synth',
    path: '/projects/touchSynth',
    component: TouchSynth,
    thumbnail: 'assets/images/projects/thumbs/touchSynth.jpg',
    description: 'Trigger an analog synth from a browser app',
  },
];

export default projectRoutes;
