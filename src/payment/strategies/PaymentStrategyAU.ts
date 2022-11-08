import {AbstractPaymentStrategy} from "./AbstractPaymentStrategy";
import {roundUpToNearestInteger} from "../utils";

export class PaymentStrategyAU extends AbstractPaymentStrategy {
  constructor() {
    super(roundUpToNearestInteger);
  }

  getCurrencySign(): string {
    return "$";
  }

  getPaymentMethods(): string[] {
    return ["apple"];
  }
}