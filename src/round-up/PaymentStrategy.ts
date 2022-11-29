export interface PaymentStrategy {
  getCurrencySign(): string;

  getRoundUpAmount(amount: number): number;

  getTip(amount: number): number;
}

export class PaymentStrategyAU implements PaymentStrategy {
  getCurrencySign(): string {
    return "$";
  }

  getRoundUpAmount(amount: number): number {
    return Math.floor(amount + 1);
  }

  getTip(amount: number): number {
    return parseFloat(
      (this.getRoundUpAmount(amount) - amount).toPrecision(10)
    );
  }
}

export class PaymentStrategyJP implements PaymentStrategy {
  getCurrencySign(): string {
    return "¥";
  }

  getRoundUpAmount(amount: number) {
    return Math.floor(amount / 100 + 1) * 100;
  }

  getTip(amount: number): number {
    return parseFloat(
      (this.getRoundUpAmount(amount) - amount).toPrecision(10)
    );
  }
}

export class PaymentStrategyDK implements PaymentStrategy {
  getCurrencySign(): string {
    return "Kr.";
  }

  getRoundUpAmount(amount: number) {
    return Math.floor(amount / 10 + 1) * 10;
  }

  getTip(amount: number) {
    return parseFloat(
      (this.getRoundUpAmount(amount) - amount).toPrecision(10)
    );
  }
}