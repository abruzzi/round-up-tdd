import {roundUpToNearestHundred} from "../roundUpLogic";
import {RoundUpStrategy} from "./RoundUpStrategy";

class RoundUpStrategyJapan extends RoundUpStrategy {
  constructor() {
    super(roundUpToNearestHundred);
  }

  getDollarSign(): string {
    return "¥";
  }
}

export default RoundUpStrategyJapan;