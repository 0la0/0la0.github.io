import { getPosNeg } from 'components/home/modules/mathUtil';

const SIZE = 12;

export default class SearchState {
  constructor(bound = 0, vector) {
    this.vector = vector || new Array(SIZE).fill(null).map(() => getPosNeg() * bound * Math.random());
  }

  add(searchState) {
    this.vector = this.vector.map((ele, i) => ele + searchState.vector[i]);
    return this;
  }

  sub(searchState) {
    this.vector = this.vector.map((ele, i) => ele - searchState.vector[i]);
    return this;
  }

  multiplyScalar(scalar) {
    this.vector = this.vector.map(ele => ele * scalar);
    return this;
  }

  clamp(min, max) {
    const length = Math.sqrt(this.vector.reduce((sum, ele) => sum + ele * ele, 0));
    if (length > max) {
      this.vector = this.vector.map(ele => ele / length * max);
    }
    return this;
  }

  distanceToSquared(vec) {
    return this.vector.reduce((sum, ele, i) => sum + Math.pow(ele - vec[i], 2), 0);
  }

  clone() {
    const clonedVector = this.vector.map(ele => ele);
    const instance = new SearchState(0, clonedVector);
    return instance;
  }
}
