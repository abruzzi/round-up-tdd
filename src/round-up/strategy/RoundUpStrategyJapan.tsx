import { AbstractRoundUpStrategy } from "../types";
import { roundUpToNearestHundred } from "../roundUpLogic";

export class RoundUpStrategyJapan extends AbstractRoundUpStrategy {
  constructor() {
    super(roundUpToNearestHundred);
  }

  getCurrencySign(): string {
    return "¥";
  }
}
