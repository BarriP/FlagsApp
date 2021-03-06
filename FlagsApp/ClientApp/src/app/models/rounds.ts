export class Test {
  //round
  sessionId: number;
  roundName: string;
  roundNumber: number;
  roundType: string;
  startTime: number;
  answerTime: number;
  endTime: number;

  //test
  testType: string;
  testItems: string;
  testCorrectItems: string;
  testFailedItems: string;
  testCorrectNumber: number;
  testFailedNumber: number;
}

export class Round {
  sessionId: number;
  roundName: string;
  roundNumber: number;
  roundType: string;
  startTime: number;
  answerTime: number;
  endTime: number;
  phases: Array<Phase>;
}

export class Phase {
  item: string;
  isCorrect: number;
  startTime: number;
  answerTime: number;
  endTime: number;
}
