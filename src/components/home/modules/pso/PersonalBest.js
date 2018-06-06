export default class PersonalBest {
  constructor(searchState) {
    this.searchState = searchState;
    this.distance = 9999;
  }

  update(searchState, goalState) {
    const proposedDistance = searchState.distanceToSquared(goalState.vector);
    if (proposedDistance < this.distance) {
      this.searchState = searchState;
      this.distance = proposedDistance;
    }
  }

  reset() {
    this.distance = 9999;
  }

  getVector() {
    return this.searchState;
  }
}
