import {AbstractPaymentStrategy} from "./AbstractPaymentStrategy";
import {roundUpToNearestHundred} from "../utils";

export class PaymentStrategyJP extends AbstractPaymentStrategy {
  constructor() {
    super(roundUpToNearestHundred);
  }

  getCurrencySign(): string {
    return "¥";
  }

  getPaymentMethods(): string[] {
    return [];
  }
}