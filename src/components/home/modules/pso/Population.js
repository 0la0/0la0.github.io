// import {
//   Vector3,
//   Color,
// } from 'three';
import Particle from './Particle';
import GoalState from './GoalState';
import SearchState from './SearchState';
// import { getPosNeg, getRandomVector } from 'components/home/modules/mathUtil';
// import PsoRenderer from './PsoRenderer';

const TTL = 7000;
const SEARCH_SPACE_SIZE = 1;
const HALF_SEARCH_SPACE_SIZE = SEARCH_SPACE_SIZE / 2;

// function generateRandomPosition() {
//   return new Vector3(
//     getPosNeg() * 2 * Math.random(),
//     getPosNeg() * 2 * Math.random(),
//     getPosNeg() * 2 * Math.random()
//   );
// }

export default class Population {
  constructor(size) {
    this.size = size;
    this.goalState = new GoalState(new SearchState(0.1));
    this.particles = new Array(size).fill(null).map(() => {
      const searchState = new SearchState(HALF_SEARCH_SPACE_SIZE);
      return new Particle(searchState, this.goalState);
    });
    // this.psoRenderer = new PsoRenderer(this.particles);
    this.reset();
  }

  getParticles() {
    return this.particles;
  }

  getMesh() {
    // return this.particles.map(particle => particle.getMesh());
    return [];
  }

  reset() {
    this.ttl = 2000 + TTL * Math.random();
    this.goalState.reset(new SearchState(HALF_SEARCH_SPACE_SIZE));
    this.particles.forEach(particle => {
      particle.reset(new SearchState(HALF_SEARCH_SPACE_SIZE), this.goalState.getVector().vector);
    });
  }

  update(elapsedTime) {
    this.ttl -= elapsedTime;
    if (this.ttl <= 0) {
      this.reset();
    }
    this.particles.forEach(particle => particle.update(elapsedTime));
  }

}
