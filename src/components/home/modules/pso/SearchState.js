import { getPosNeg } from 'components/home/modules/mathUtil';

const SIZE = 12;

export default class SearchState {
  constructor(bound) {
    if (!bound) { return; }
    this.vector = new Array(SIZE).fill(null).map(() => getPosNeg() * bound * Math.random());
  }

  add(searchState) {
    for (let i = 0; i < this.vector.length; i++) {
      this.vector[i] = this.vector[i] + searchState.vector[i];
    }
    return this;
  }

  sub(searchState) {
    for (let i = 0; i < this.vector.length; i++) {
      this.vector[i] = this.vector[i] - searchState.vector[i];
    }
    return this;
  }

  multiplyScalar(scalar) {
    for (let i = 0; i < this.vector.length; i++) {
      this.vector[i] = this.vector[i] * scalar;
    }
    return this;
  }

  clamp(min, max) {
    const length = Math.sqrt(this.vector.reduce((sum, ele) => sum + ele * ele, 0));
    if (length > max) {
      for (let i = 0; i < this.vector.length; i++) {
        this.vector[i] = (this.vector[i] / length) * max;
      }
    }
    return this;
  }

  distanceToSquared(vec) {
    return this.vector.reduce((sum, ele, i) => sum + Math.pow(ele - vec[i], 2), 0);
  }

  clone() {
    const clonedVector = this.vector.map(ele => ele);
    const instance = new SearchState();
    instance.vector = clonedVector;
    return instance;
  }

}
