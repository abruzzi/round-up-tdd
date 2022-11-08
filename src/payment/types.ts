export type PaymentMethodType = { provider: string; label: string };

export interface PaymentStrategy {
  getCurrencySign(): string;

  getRoundUpAmount(amount: number): number;

  getTip(amount: number): number;

  getPaymentMethods(): string[];
}