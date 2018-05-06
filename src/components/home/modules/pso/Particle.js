import { Vector3, Color, Euler } from 'three';
import { getRandomVector } from 'components/home/modules/mathUtil';
import buildTriangle from './TriangleBuilder';
import GoalState from './GoalState';
import SearchState from './SearchState';

const PERSONAL_COEFFICIENT = 0.75;
const GLOBAL_COEFFICIENT = 1;
const SPEED_LIMIT = 0.04;
const TWO_PI = 2 * Math.PI;
const ELAPSED_TIME_FACTOR = 0.001;

class PersonalBest {
  constructor(searchState) {
    this.searchState = searchState;
    this.distance = 9999;
  }

  update(searchState, goalState) {
    const proposedDistance = searchState.distanceToSquared(goalState);
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

function updateTriangle(triangle, searchState) {
  triangle.position.x = searchState.vector[0];
  triangle.position.y = searchState.vector[1];
  triangle.position.z = searchState.vector[2];
  triangle.setRotationFromEuler(new Euler(
    (searchState.vector[3] + 0.5) * TWO_PI,
    (searchState.vector[4] + 0.5) * TWO_PI,
    (searchState.vector[5] + 0.5) * TWO_PI,
    'XYZ'
  ));
  triangle.scale.set(
    searchState.vector[6] + 1,
    searchState.vector[7] + 1,
    searchState.vector[8] + 1
  );
  triangle.material.color = new Color(
    searchState.vector[9] + 0.5,
    searchState.vector[10] + 0.5,
    searchState.vector[11] + 0.5
  );
}

export default class Particle {

  constructor(searchState, goalState) {
    this.searchState = searchState;
    this.goalState = goalState;
    this.personalBest = new PersonalBest(searchState, this.goalState.getVector());
    this.velocity = new SearchState(1); // TODO: half search size??
    const position = new Vector3(
      this.searchState.vector[0],
      this.searchState.vector[1],
      this.searchState.vector[2]
    );
    const scale = 0.1;
    const greyScaleValue = Math.random();
    const color = new Color(
      greyScaleValue,
      greyScaleValue,
      greyScaleValue
    );
    this.triangle = buildTriangle(position, scale, color);
    updateTriangle(this.triangle, this.searchState);
  }

  getMesh() {
    return this.triangle;
  }

  reset(searchState) {
    this.isResetting = true;
    this.resetTime = 400;
    this.personalBest.reset();
    this.velocity = new SearchState(1);
  }

  update(elapsedTime) {
    if (this.isResetting) {
      this.searchState.add(this.velocity.clone().multiplyScalar(elapsedTime * ELAPSED_TIME_FACTOR));
      updateTriangle(this.triangle, this.searchState);
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
    updateTriangle(this.triangle, this.searchState);
  }
}
