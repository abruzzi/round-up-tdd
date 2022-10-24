import {roundUpToNearestInteger} from "./roundUpLogic";
import {RoundUpStrategy} from "./RoundUpStrategy";

class RoundUpStrategyAustralia extends RoundUpStrategy {
  constructor() {
    super(roundUpToNearestInteger);
  }

  getCurrencySign(): string {
    return "$";
  }
}

export default RoundUpStrategyAustralia;