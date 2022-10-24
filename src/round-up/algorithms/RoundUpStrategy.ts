type Algorithm = (amount: number) => number;

interface Strategy {
  getRoundUp: (amount: number) => number;
  getTip: (amount: number) => number;
  getCurrencySign: () => string;
}

export abstract class RoundUpStrategy implements Strategy {
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

  abstract getCurrencySign (): string;
}





