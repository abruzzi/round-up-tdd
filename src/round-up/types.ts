export interface RoundUpStrategy {
  getCurrencySign: () => string;
  getRoundUp: (amount: number) => number;
  getTip: (amount: number) => number;
}

type RoundUpAlgorithm = (number: number) => number;

export abstract class AbstractRoundUpStrategy implements RoundUpStrategy {
  protected algorithm: RoundUpAlgorithm;

  protected constructor(algorithm: RoundUpAlgorithm) {
    this.algorithm = algorithm;
  }

  private formatNumber = (number: number) => parseFloat(number.toPrecision(2));

  private calculateTipFor =
    (calculateRoundUpFor: (amount: number) => number) => (amount: number) => {
      return this.formatNumber(calculateRoundUpFor(amount) - amount);
    };


  abstract getCurrencySign (): string;

  getRoundUp(amount: number): number {
    return this.algorithm(amount);
  }

  getTip(amount: number): number {
    return this.calculateTipFor(this.getRoundUp.bind(this))(amount);
  }
}

abstract class PaymentViewModel {
  protected strategy: RoundUpStrategy;

  protected constructor(strategy: RoundUpStrategy) {
    this.strategy = strategy;
  }

  abstract getDonationLabel (): string;
  abstract getPaymentButtonLabel (): string;
}