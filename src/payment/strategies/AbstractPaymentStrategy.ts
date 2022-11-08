import {PaymentStrategy} from "../types";
import {calculateTipFor} from "../utils";

type Algorithm = (amount: number) => number;

export abstract class AbstractPaymentStrategy implements PaymentStrategy {
  protected readonly algorithm: Algorithm;

  protected constructor(algorithm: Algorithm) {
    this.algorithm = algorithm;
  }

  getRoundUpAmount(amount: number): number {
    return this.algorithm(amount);
  }

  getTip(amount: number): number {
    return calculateTipFor(this.algorithm.bind(this))(amount);
  }

  abstract getCurrencySign(): string;

  abstract getPaymentMethods(): string[];
}