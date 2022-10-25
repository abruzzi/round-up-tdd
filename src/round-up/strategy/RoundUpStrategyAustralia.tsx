import { AbstractRoundUpStrategy } from "../types";
import { roundUpToNearestInteger } from "../roundUpLogic";

export class RoundUpStrategyAustralia extends AbstractRoundUpStrategy {
  constructor() {
    super(roundUpToNearestInteger);
  }

  getCurrencySign(): string {
    return "$";
  }
}
