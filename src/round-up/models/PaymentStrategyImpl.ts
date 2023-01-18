import { PaymentStrategy } from "./PaymentStrategy";
import { formatNumber } from "../utils";

export type RoundUpStrategy = (number: number) => number;

export class PaymentStrategyImpl implements PaymentStrategy {
  private readonly currencySign: string;
  private readonly strategy: RoundUpStrategy;

  public constructor(currencySign: string, roundUpAlgorithm: RoundUpStrategy) {
    this.currencySign = currencySign;
    this.strategy = roundUpAlgorithm;
  }

  private calculateTipFor =
    (calculateRoundUpFor: (amount: number) => number) => (amount: number) => {
      return formatNumber(calculateRoundUpFor(amount) - amount);
    };

  getCurrencySign(): string {
    return this.currencySign;
  }

  getRoundUpAmount(amount: number): number {
    return this.strategy(amount);
  }

  getTip(amount: number): number {
    return this.calculateTipFor(this.getRoundUpAmount.bind(this))(amount);
  }
}
