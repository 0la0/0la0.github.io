
export default class GoalState {
  constructor(searchState) {
    this.reset(searchState);
  }

  update(searchState) {
    const distance = searchState.distanceToSquared(this.searchState);
    if (distance < this.bestDistance) {
      this.bestPosition = searchState;
      this.bestDistance = distance;
    }
  }

  reset(searchState) {
    this.searchState = searchState;
    this.bestPosition = searchState;
    this.bestDistance = 9999999;
  }

  getVector() {
    return this.searchState;
  }
}
