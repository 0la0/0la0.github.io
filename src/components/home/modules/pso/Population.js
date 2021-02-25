import Particle from './Particle';
import GoalState from './GoalState';
import SearchState from './SearchState';
import DIMENSIONS from './Dimensions';
import { getRandomIntegerInRange, } from '../mathUtil';

const BASE_TTL = 2000;
const TTL_RANGE = 9000;
const SEARCH_SPACE_SIZE = 1;
const HALF_SEARCH_SPACE_SIZE = SEARCH_SPACE_SIZE / 2;

export default class Population {
  constructor(size) {
    this.size = size;
    this.goalState = new GoalState(new SearchState(0.1));
    this.particles = new Array(size).fill(null).map(() => {
      const searchState = new SearchState(0);
      return new Particle(searchState, this.goalState);
    });
    this.reset();
  }

  getParticles() {
    return this.particles;
  }

  reset() {
    this.ttl = BASE_TTL + getRandomIntegerInRange(TTL_RANGE);
    this.goalState.reset(new SearchState(HALF_SEARCH_SPACE_SIZE));
    this.particles.forEach(particle => {
      particle.reset(new SearchState(HALF_SEARCH_SPACE_SIZE), this.goalState.getVector().vector);
    });
  }

  resetToPosition(position) {
    const goal = new SearchState(HALF_SEARCH_SPACE_SIZE);
    goal.vector[DIMENSIONS.POSITION_X] = position.x;
    goal.vector[DIMENSIONS.POSITION_Y] = position.y;
    goal.vector[DIMENSIONS.POSITION_Z] = position.z;
    this.ttl = BASE_TTL + getRandomIntegerInRange(TTL_RANGE);
    this.goalState.reset(goal);
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
