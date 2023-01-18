export interface PaymentStrategy {
  getCurrencySign(): string;

  getRoundUpAmount(amount: number): number;

  getTip(amount: number): number;
}