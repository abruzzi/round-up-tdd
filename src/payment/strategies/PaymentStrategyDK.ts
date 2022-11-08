import {AbstractPaymentStrategy} from "./AbstractPaymentStrategy";
import {roundUpToNearestTen} from "../utils";

export class PaymentStrategyDK extends AbstractPaymentStrategy {
  constructor() {
    super(roundUpToNearestTen);
  }

  getCurrencySign(): string {
    return "Kr.";
  }

  getPaymentMethods(): string[] {
    return [];
  }
}