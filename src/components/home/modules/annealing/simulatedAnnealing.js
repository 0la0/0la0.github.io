export default class SimulatedAnnealing {
  constructor(searchSpace, candidateQueue, numActiveCandidates, width, height) {
    this.searchSpace = searchSpace;
    this.candidateQueue = candidateQueue;
    this.searchSize = this.candidateQueue.length;
    // console.log('initialSize', this.searchSize);
    this.numSettledCandidates = 0;
    this.width = width;
    this.height = height;
    this.candidates = this.candidateQueue.splice(0, numActiveCandidates);
    this.candidates.forEach(candidate => candidate.setVisibility(true));
  }

  iterate() {
    // TODO: make more memory efficient
    const settledCandidates = this.candidates.filter(candidate => candidate.isSettled);
    this.candidates = this.candidates.filter(candidate => !candidate.isSettled);
    this.candidates.forEach((candidate) => candidate.iterate(this.searchSpace));
    const newCandidates = this.candidateQueue.splice(0, settledCandidates.length);
    newCandidates.forEach(candidate => {
      candidate.setVisibility(true)
      this.candidates.push(candidate);
    });
    this.numSettledCandidates += settledCandidates.length;
    return this.numSettledCandidates === this.searchSize;
  }

  // reset() {
  // }
}
