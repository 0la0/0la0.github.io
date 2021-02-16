function copyToArray(copyTo, copyFrom, startIndex, numElements) {
  const min = Math.min(startIndex + numElements, copyFrom.length)
  for (let i = startIndex; i < min; i++) {
    copyFrom[i].setVisibility(true);
    copyTo.push(copyFrom[i]);
  }
}

export default class SimulatedAnnealing {
  constructor(candidateQueue, numActiveCandidates) {
    this.searchSpace;
    this.candidateQueue = candidateQueue;
    this.searchSize = this.candidateQueue.length;
    this.numActiveCandidates = numActiveCandidates;
    this.numSettledCandidates = 0;
    this.candidates = [];
    this.reset();
  }

  reset(searchSpace) {
    this.searchSpace = searchSpace;
    this.numSettledCandidates = 0;
    this.candidates = [];
    copyToArray(this.candidates, this.candidateQueue, this.numSettledCandidates, this.numActiveCandidates);
  }

  iterate() {
    let numSettled = 0;
    for (let i = this.candidates.length - 1; i >= 0; i--) {
      if (this.candidates[i].isSettled) {
        numSettled++;
        this.candidates.splice(i, 1);
      } else {
        this.candidates[i].iterate(this.searchSpace);
      }
    }

    copyToArray(this.candidates, this.candidateQueue, this.numSettledCandidates, numSettled);
    this.numSettledCandidates += numSettled;
    return this.numSettledCandidates >= this.searchSize;
  }
}
