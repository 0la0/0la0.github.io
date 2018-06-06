import { Vector3, Color, Euler, Group } from 'three';
import { getRandomVector } from 'components/home/modules/mathUtil';
import buildTriangle from './TriangleBuilder';
import GoalState from './GoalState';
import SearchState from './SearchState';
import PersonalBest from './PersonalBest';
import GoalLine from './GoalLine';
import DIMENSIONS from './Dimensions';

const PERSONAL_COEFFICIENT = 0.75;
const GLOBAL_COEFFICIENT = 1;
const SPEED_LIMIT = 0.04;
const TWO_PI = 2 * Math.PI;
const ELAPSED_TIME_FACTOR = 0.001;

function updateTriangle(triangle, searchState) {
  triangle.position.x = searchState.vector[DIMENSIONS.POSITION_X];
  triangle.position.y = searchState.vector[DIMENSIONS.POSITION_Y];
  triangle.position.z = searchState.vector[DIMENSIONS.POSITION_Z];
  triangle.setRotationFromEuler(new Euler(
    (searchState.vector[DIMENSIONS.ROTATE_X] + 0.5) * TWO_PI,
    (searchState.vector[DIMENSIONS.ROTATE_Y] + 0.5) * TWO_PI,
    (searchState.vector[DIMENSIONS.ROTATE_Z] + 0.5) * TWO_PI,
    'XYZ'
  ));
  triangle.scale.set(
    searchState.vector[DIMENSIONS.SCALE_X] + 1,
    searchState.vector[DIMENSIONS.SCALE_Y] + 1,
    searchState.vector[DIMENSIONS.SCALE_Z] + 1
  );
  triangle.material.color = new Color(
    searchState.vector[DIMENSIONS.COLOR_R] + 0.5,
    searchState.vector[DIMENSIONS.COLOR_G] + 0.5,
    searchState.vector[DIMENSIONS.COLOR_B] + 0.5
  );
}

export default class Particle {

  constructor(searchState, goalState) {
    this.searchState = searchState;
    this.goalState = goalState;
    this.personalBest = new PersonalBest(searchState, this.goalState.getVector());
    this.velocity = new SearchState(1); // TODO: half search size??
    const position = new Vector3(
      this.searchState.vector[DIMENSIONS.POSITION_X],
      this.searchState.vector[DIMENSIONS.POSITION_Y],
      this.searchState.vector[DIMENSIONS.POSITION_Z]
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
    this.goalLine = new GoalLine(position.clone(), position.clone());
    this.group = new Group();
    this.group.add(this.triangle);
    this.group.add(this.goalLine.line);
  }

  getMesh() {
    return this.group;
  }

  reset(searchState, goalVector) {
    this.isResetting = true;
    this.resetTime = 400;
    this.personalBest.reset();
    this.velocity = new SearchState(1);
    this.goalLine.reset(goalVector);
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
    this.goalLine.update(
      this.searchState.vector[DIMENSIONS.POSITION_X],
      this.searchState.vector[DIMENSIONS.POSITION_Y],
      this.searchState.vector[DIMENSIONS.POSITION_Z]
    );
  }
}
