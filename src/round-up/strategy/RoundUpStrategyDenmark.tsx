import { AbstractRoundUpStrategy } from "../types";
import { roundUpToNearestTen } from "../roundUpLogic";

export class RoundUpStrategyDenmark extends AbstractRoundUpStrategy {
  constructor() {
    super(roundUpToNearestTen);
  }

  getCurrencySign(): string {
    return "Kr.";
  }
}
