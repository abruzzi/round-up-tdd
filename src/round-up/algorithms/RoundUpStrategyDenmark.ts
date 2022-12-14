import {roundUpToNearestTen} from "./roundUpLogic";
import {RoundUpStrategy} from "./RoundUpStrategy";

class RoundUpStrategyDenmark extends RoundUpStrategy {
  constructor() {
    super(roundUpToNearestTen);
  }

  getCurrencySign(): string {
    return "Kr.";
  }
}

export default RoundUpStrategyDenmark;