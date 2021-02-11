import SearchState from './SearchState';
import PersonalBest from './PersonalBest';

const PERSONAL_COEFFICIENT = 0.95;
const GLOBAL_COEFFICIENT = 1.2;
const SPEED_LIMIT = 0.05;
const ELAPSED_TIME_FACTOR = 0.001;

export default class Particle {
  constructor(searchState, goalState) {
    this.searchState = searchState;
    this.goalState = goalState;
    this.personalBest = new PersonalBest(searchState, this.goalState.getVector());
    this.velocity = new SearchState(1);
  }

  getState() {
    return this.searchState;
  }

  reset(searchState, goalVector) {
    this.isResetting = true;
    this.resetTime = 400;
    this.personalBest.reset();
    this.velocity = new SearchState(1);
  }

  update(elapsedTime) {
    if (this.isResetting) {
      this.searchState.add(this.velocity.clone().multiplyScalar(elapsedTime * ELAPSED_TIME_FACTOR));
      this.resetTime -= elapsedTime;
      if (this.resetTime <= 0) {
        this.isResetting = false;
      }
      return;
    }

    this.goalState.update(this.searchState);
    this.personalBest.update(this.searchState, this.goalState.getVector());

    const personalDifference = this.personalBest.getVector().clone()
      .sub(this.searchState)
      .multiplyScalar(PERSONAL_COEFFICIENT * Math.random());

    const globalDifference = this.goalState.getVector().clone()
      .sub(this.searchState)
      .multiplyScalar(GLOBAL_COEFFICIENT * Math.random());

    const difference = personalDifference.add(globalDifference);

    this.velocity.add(difference.multiplyScalar(elapsedTime * ELAPSED_TIME_FACTOR));
    this.velocity.clamp(-SPEED_LIMIT, SPEED_LIMIT);

    this.searchState.add(this.velocity);
  }
}
