type Algorithm = (amount: number) => number

export class Calculator {
  private readonly algorithm: Algorithm;

  private formatNumber = (number: number) => parseFloat(number.toPrecision(2));

  private calculateTipFor =
    (calculateRoundUpFor: (amount: number) => number) => (amount: number) => {
      return this.formatNumber(calculateRoundUpFor(amount) - amount);
    };

  constructor(algorithm: Algorithm) {
    this.algorithm = algorithm
  }

  getRoundUp(amount: number): number {
    return this.algorithm(amount)
  }

  getTip(amount: number): number {
    return this.calculateTipFor(this.getRoundUp.bind(this))(amount);
  }
}