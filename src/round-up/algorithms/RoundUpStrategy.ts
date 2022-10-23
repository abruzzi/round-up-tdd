type Algorithm = (amount: number) => number;

export abstract class RoundUpStrategy {
  protected readonly algorithm: Algorithm;

  private formatNumber = (number: number) => parseFloat(number.toPrecision(2));

  protected calculateTipFor =
    (calculateRoundUpFor: (amount: number) => number) => (amount: number) => {
      return this.formatNumber(calculateRoundUpFor(amount) - amount);
    };

  protected constructor(algorithm: Algorithm) {
    this.algorithm = algorithm
  }

  getRoundUp(amount: number): number {
    return this.algorithm(amount)
  }

  getTip(amount: number): number {
    return this.calculateTipFor(this.getRoundUp.bind(this))(amount);
  }

  abstract getDollarSign (): string;
}





